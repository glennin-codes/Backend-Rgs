import s3 from "../Aws/config.js";

// Handle file upload
export const UploadFiles = async (req, res) => {
  try {
    const userId = req.params.userId;
    const files = req.files;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing." });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }
    // Validate if files are buffers
    if (!files.every((file) => Buffer.isBuffer(file.buffer))) {
      return res.status(400).json({ error: "Invalid files provided." });
    }

    const uploadPromises = files.map(async (file) => {
      const params = {
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: `${userId}/${file.originalname}`, // Organize files into user-specific folders
        Body: file.buffer,
      };

      await s3.putObject(params).promise();
      return file.originalname;
    });

    const uploadedFileNames = await Promise.all(uploadPromises);
    console.log("files", uploadedFileNames);
    res
      .status(200)
      .json({
        message: "Files uploaded successfully",
        uploadedFiles: uploadedFileNames,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
