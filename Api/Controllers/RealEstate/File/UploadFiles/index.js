import s3 from "../Aws/config.js";



// Handle file upload
export const UploadFiles =async (req, res) => {
  try {
    const userId = req.params.userId;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const uploadPromises = files.map(async (file) => {
      const params = {
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: `${userId}/${file.originalname}`, // Organize files into user-specific folders
        Body: file.buffer,
      };

      await s3.putObject(params).promise();
      
    });

    await Promise.all(uploadPromises);

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}