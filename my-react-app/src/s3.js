import AWS from 'aws-sdk';
import { queryItems } from './DynamoDB.js';
var imageDimensions = {};

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadToS3 = (file, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file,
  };

  // grabbing the uploaded image's size to send to labelDetection.js
  const image = new Image();
  // image.src = URL.createObjectURL(file);
  image.onload = () => {
    imageDimensions['width'] = image.naturalWidth;
    imageDimensions['height'] = image.naturalHeight;
  };

  return s3.upload(params).promise();
};

const downloadFromS3 = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.getObject(params).promise()
    .then(data => {
      // If the response contains a Body field, it will be a Buffer object
      // containing the data of the object (image in this case)
      return data.Body;
    })
    .catch(err => {
      console.error('Error downloading from S3:', err);
      throw err;
    });
};

const downloadAllImagesFromS3 = async (bucketName) => {
  try {
    const params = {
      Bucket: bucketName,
    };

    const data = await s3.listObjectsV2(params).promise();
    const imagePromises = data.Contents.map(async (object) => {
      const imageKey = object.Key;
      const imageData = await downloadFromS3(bucketName, imageKey);
      return { key: imageKey, data: imageData };
    });
    //console.log('imagePromises:', imagePromises);
    const images = await Promise.all(imagePromises);
    //console.log('images:', images);
    return images;
  } catch (err) {
    console.error('Error downloading images from S3:', err);
    throw err;
  }
};

const deleteImageFromS3 = (key) => {
  const params = {
    Bucket: 'cse-498-capstone-submit-for-review-images',
    Key: key,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error('Error deleting image from S3:', err);
    } else {
      console.log('Image deleted successfully:', data);
    }
  });
};

const enrichImagesWithUserEmail = async (bucketName) => {
  try {
    const images = await downloadAllImagesFromS3(bucketName);
    const enrichedImagesPromises = images.map(async (image) => {
      const queryParams = {
        KeyConditionExpression: "image_id = :image_id",
        ExpressionAttributeValues: { ":image_id": image.key },
      };
      const dynamoData = await queryItems('reviewImages', queryParams);
      const user_email = dynamoData?.Items?.[0]?.user_email || 'No email found';
      return { ...image, user_email: dynamoData.user_email };
    });

    // Wait for all Promises to resolve
    return await Promise.all(enrichedImagesPromises);
  } catch (err) {
    console.error('Error enriching images:', err);
    throw err;
  }
};

export { uploadToS3, downloadAllImagesFromS3, deleteImageFromS3, enrichImagesWithUserEmail, imageDimensions };