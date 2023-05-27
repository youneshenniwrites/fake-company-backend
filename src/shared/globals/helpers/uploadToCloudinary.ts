import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

/*

THE BELOW CODE IS USED LIKE THIS

uploadToCloudinary('path/to/file.jpg', 'my_public_id', true, true)
  .then((response) => {
    console.log('Upload successful:', response);
  })
  .catch((error) => {
    console.error('Error uploading file:', error);
  });

*/

export function uploadToCloudinary(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, { public_id, overwrite, invalidate }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
