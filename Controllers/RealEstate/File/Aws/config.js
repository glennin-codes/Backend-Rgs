// aws-config.js
import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: "ASIAUYFMFXO63VHUHLFE" ,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
//   region: process.env.AWS_REGION ,
// });
const s3 = new AWS.S3();

export default s3;
