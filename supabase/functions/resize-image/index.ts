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

    // Create different sizes using ImageMagick
    const sizes = {
      thumbnail: 150,
      medium: 800,
      large: 1920
    }

    const resizedImages = await Promise.all(
      Object.entries(sizes).map(async ([size, width]) => {
        const p = new Deno.Command('magick', {
          args: [
            'convert',
            '-',  // Read from stdin
            '-resize', `${width}x`,  // Resize width, maintain aspect ratio
            '-quality', '85',
            '-',  // Output to stdout
          ],
          stdin: 'piped',
          stdout: 'piped',
        });

        // Start the process
        const process = p.spawn();
        
        // Write the original image data to stdin
        const writer = process.stdin.getWriter();
        await writer.write(new Uint8Array(await fileData.arrayBuffer()));
        await writer.close();

        // Get the resized image data
        const { stdout } = await process.output();
        const resizedBlob = new Blob([stdout], { type: fileData.type });

        // Upload the resized image
        const fileName = `${image.id}_${size}.${image.original_url.split('.').pop()}`
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, resizedBlob, {
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

    console.log('Successfully resized image:', imageId)

    return new Response(
      JSON.stringify({ 
        message: 'Image resized successfully', 
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
    console.error('Error resizing image:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to resize image', 
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