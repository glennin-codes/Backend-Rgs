import archiver from "archiver";
import s3 from "../config.js";

export const DownLoadFiles= async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const files = await s3.listObjectsV2({
        Bucket: BUCKET_NAME,
        Prefix: `${userId}/`,
      }).promise();
  
      if (!files.Contents || files.Contents.length === 0) {
        return res.status(404).send('No files found for the user.');
      }
  
      const archive = archiver('zip');
      archive.on('error', (err) => {
        throw err;
      });
  
      files.Contents.forEach((file) => {
        const params = {
          Bucket: process.env.CYCLIC_BUCKET_NAME,
          Key: file.Key,
        };
  
        archive.append(s3.getObject(params).createReadStream(), { name: file.Key });
      });
  
      res.attachment('files.zip');
      archive.pipe(res);
      archive.finalize();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };