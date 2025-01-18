import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Sharp from 'https://esm.sh/sharp@0.32.6'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the image data
    const { data: image } = await supabase
      .from('images')
      .select('*')
      .eq('id', imageId)
      .single()

    if (!image) {
      throw new Error('Image not found')
    }

    // Download the original image
    const { data: fileData } = await supabase.storage
      .from('images')
      .download(image.original_url.split('/').pop()!)

    if (!fileData) {
      throw new Error('Could not download image')
    }

    const buffer = await fileData.arrayBuffer()

    // Create different sizes
    const sizes = {
      thumbnail: 150,
      medium: 800,
      large: 1920
    }

    const resizedImages = await Promise.all(
      Object.entries(sizes).map(async ([size, width]) => {
        const resized = await Sharp(buffer)
          .resize(width, null, { fit: 'inside' })
          .toBuffer()

        const fileName = `${image.id}_${size}.${image.original_url.split('.').pop()}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, resized, {
            contentType: 'image/jpeg',
            upsert: true
          })

        if (uploadError) {
          throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName)

        return { size, url: publicUrl }
      })
    )

    // Update the image record with new URLs
    const updates = resizedImages.reduce((acc, { size, url }) => ({
      ...acc,
      [`${size}_url`]: url
    }), {})

    const { error: updateError } = await supabase
      .from('images')
      .update(updates)
      .eq('id', imageId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ message: 'Image resized successfully', urls: updates }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})