import React from 'react';
import PropTypes from 'prop-types';

function s3UploadResults(props) {
  const {
    s3UploadData,
  } = props;
  const {
    Bucket,
    ETag,
    Key,
    Location,
    ServerSideEncryption,
  } = s3UploadData;

  return (
    <div>
      <h2>S3 Upload Complete</h2>
      <ul>
        <li>{`Bucket: ${Bucket}`}</li>
        <li>{`ETag: ${ETag}` }</li>
        <li>{`File Name: ${Key}`}</li>
        <li>{`AWS Location: ${Location}`}</li>
        <li>{`Server Side Encryption: ${ServerSideEncryption}`}</li>
      </ul>
    </div>
  );
}

s3UploadResults.propTypes = {
  s3UploadData: PropTypes.shape({
    Bucket: PropTypes.string.isRequired,
    ETag: PropTypes.string.isRequired,
    Key: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    ServerSideEncryption: PropTypes.number.isRequired,
  }).isRequired,
};

export default s3UploadResults;

/*
s3UploadResults:
{…}
Bucket:
"stu-bucket-02"
ETag:
"\"7cdadd00a55a2a92384caaec5329d408\""
Key:
"BOSpeechTrimmed.mp3"
Location:
"https://stu-bucket-02.s3.amazonaws.com/BOSpeechTrimmed.mp3"
ServerSideEncryption:
"AES256"
key:
"BOSpeechTrimmed.mp3"
*/