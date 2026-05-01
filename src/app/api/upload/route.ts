import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload via stream — works reliably for both images and PDFs
function uploadToCloudinary(
  buffer: Buffer,
  options: Record<string, unknown>
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error || !result) return reject(error ?? new Error('No result from Cloudinary'));
      resolve({ secure_url: result.secure_url, public_id: result.public_id });
    });
    stream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'portfolio/projects';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = file.type === 'application/pdf';
    const isProfile = folder.includes('profile');

    const options: Record<string, unknown> = {
      folder,
      resource_type: isPdf ? 'raw' : 'image',
    };

    // Add image transformations (not for PDFs)
    if (!isPdf) {
      options.transformation = isProfile
        ? [{ width: 500, height: 500, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' }]
        : [{ width: 800, height: 500, crop: 'fill', quality: 'auto', fetch_format: 'auto' }];
    }

    const result = await uploadToCloudinary(buffer, options);
    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Cloudinary upload error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
