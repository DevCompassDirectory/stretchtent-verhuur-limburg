import { Handler } from "@netlify/functions";
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fetch from 'node-fetch';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const handler: Handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const { imageId } = JSON.parse(event.body || '{}');

    if (!imageId) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Image ID is required' }),
      };
    }

    // Get image data from database
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .eq('id', imageId)
      .single();

    if (fetchError || !image) {
      throw new Error('Image not found');
    }

    // Download the original image
    const response = await fetch(image.original_url);
    if (!response.ok) {
      throw new Error('Could not download image');
    }
    const fileData = await response.buffer();

    // Create different sizes
    const sizes = {
      thumbnail: 150,
      medium: 800,
      large: 1920
    };

    const resizedImages = await Promise.all(
      Object.entries(sizes).map(async ([size, width]) => {
        const resizedBuffer = await sharp(fileData)
          .resize(width, null, { fit: 'inside' })
          .toBuffer();

        const fileName = `${image.id}_${size}.${image.filename.split('.').pop()}`;
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, resizedBuffer, {
            contentType: response.headers.get('content-type') || 'image/jpeg',
            upsert: true
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        return { [size]: publicUrl };
      })
    );

    // Update database with new URLs
    const updates = Object.assign({}, ...resizedImages);
    const { error: updateError } = await supabase
      .from('images')
      .update({
        thumbnail_url: updates.thumbnail,
        medium_url: updates.medium,
        large_url: updates.large,
      })
      .eq('id', imageId);

    if (updateError) {
      throw updateError;
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: 'Image processed successfully',
        urls: updates
      }),
    };
  } catch (error) {
    console.error('Error processing image:', error);
    
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Failed to process image',
        details: error.message
      }),
    };
  }
};

export { handler };