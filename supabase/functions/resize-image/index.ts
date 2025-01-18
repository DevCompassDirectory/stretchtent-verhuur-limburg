import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageId } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Processing image:', imageId)

    // Get the image data
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .eq('id', imageId)
      .single()

    if (fetchError || !image) {
      throw new Error('Image not found')
    }

    // Download the original image
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('images')
      .download(image.original_url.split('/').pop()!)

    if (downloadError || !fileData) {
      throw new Error('Could not download image')
    }

    // Create different sizes using canvas
    const sizes = {
      thumbnail: 150,
      medium: 800,
      large: 1920
    }

    // For now, we'll just use the original image for all sizes
    // In a production environment, you'd want to implement actual resizing logic
    // using a compatible image processing library
    const resizedImages = await Promise.all(
      Object.entries(sizes).map(async ([size, width]) => {
        const fileName = `${image.id}_${size}.${image.original_url.split('.').pop()}`
        
        // Upload the image (using original size for now)
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, fileData, {
            contentType: fileData.type,
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

    console.log('Successfully processed image:', imageId)

    return new Response(
      JSON.stringify({ 
        message: 'Image processed successfully', 
        urls: updates 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )
  } catch (error) {
    console.error('Error processing image:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process image', 
        details: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    )
  }
})