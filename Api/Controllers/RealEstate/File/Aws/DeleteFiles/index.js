import s3 from "../config.js";

export const deleteFilesForUser = async (req,res) => {
    const userId=req.params.userId;

  try {
    const files = await s3.listObjectsV2({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Prefix: `${userId}/`,
    }).promise();

    if (files.Contents && files.Contents.length > 0) {
      const objectsToDelete = files.Contents.map((file) => ({
        Key: file.Key,
      }));


      await s3.deleteObjects({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Delete: {
          Objects: objectsToDelete,
          Quiet: false, // Set to true if you don't want detailed information in the response
        },
      }).promise();

      console.log(`Files for user ${userId} deleted successfully.`);
      res.status(200).json({ message: `Files for user ${userId} deleted successfully.` });
    } else {
      console.log(`No files found for the user ${userId}.`);
        res.status(404).json({ error: `No files found for the user ${userId}.` });
    }
  } catch (error) {
    console.error(`Error deleting files for user ${userId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
};
