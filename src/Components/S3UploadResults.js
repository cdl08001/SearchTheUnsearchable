import React from 'react';
import PropTypes from 'prop-types';

function s3UploadResults(props) {
  const {
    s3UploadData,
    handleBack,
    handleTranscribeSubmit,
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
      <button type="submit" className="btn btn-primary" onClick={handleBack}>Back</button>
      <button type="submit" className="btn btn-primary" onClick={handleTranscribeSubmit}>Do Something</button>
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
  handleBack: PropTypes.func.isRequired,
  handleTranscribeSubmit: PropTypes.func.isRequired,
};

export default s3UploadResults;
