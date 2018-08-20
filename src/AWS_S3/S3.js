const AWS = require('aws-sdk');

const uuidv4 = require('uuid/v4');

// Bucket names must be unique across all S3 users

const myBucket = `stu-bucket-${uuidv4()}`;
const myKey = 'hello_world.txt';
const params = {
  Bucket: myBucket,
  ACL: 'private',
  CreateBucketConfiguration: {
    LocationConstraint: 'us-west-1',
  },
};

const bucketPromise = new AWS.S3().createBucket(params).promise();

bucketPromise.then((data) => {
  const objectParams = { Bucket: myBucket, Key: myKey, Body: 'Hello World!' };
  const uploadPromise = new AWS.S3().putObject(objectParams).promise();
  uploadPromise.then((data) => {
    console.log(`Successfully uploaded data to ${myBucket}/${myKey}`);
  });
}).catch(err => console.log(err, err.stack));
