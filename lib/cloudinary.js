// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Reusable upload function
export async function uploadImage(fileBuffer, mimetype, folder , transformations = [{ width: 500, height: 500, crop: 'fill', quality: 'auto' }]) {
  try {
    const fileUri = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(fileUri, {
      folder,
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      transformation: transformations,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}


export async function deleteImage(imageUrl) {
  try {
    if (!imageUrl) return;
    const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public_id
    await cloudinary.uploader.destroy(`${folder}/${publicId}`);
  } catch (error) {
    console.error('Cloudinary delete error:', error);

  }
}

