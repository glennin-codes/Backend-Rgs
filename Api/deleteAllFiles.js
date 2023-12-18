import s3 from "./Controllers/RealEstate/File/Aws/config.js";

export const DeleteAllFiles = async (req, res) => {
    try {
      
      const bucketName = process.env.CYCLIC_BUCKET_NAME; 
  
      // List all objects in the bucket
      const objects = await s3.listObjectsV2({ Bucket: bucketName }).promise();
  
      // Delete each object
      const deletePromises = objects.Contents.map(async (object) => {
        await s3.deleteObject({ Bucket: bucketName, Key: object.Key }).promise();
      });
  
      // Wait for all delete operations to complete
      await Promise.all(deletePromises);
  
      res.status(200).json({ message: 'All files deleted successfully.' });
    } catch (error) {
      console.error('Error deleting files:', error);
  
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  