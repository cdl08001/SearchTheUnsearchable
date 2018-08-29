import React from 'react';
import PropTypes from 'prop-types';

function FileMetadataResults(props) {
  const {
    hashcodeResults,
    handleBack,
    handleS3UploadSubmit,
  } = props;
  const {
    hashcode,
    lastModifiedDate,
    name,
    path,
    size,
    type,
  } = hashcodeResults;

  return (
    <div>
      <h2>Metadata</h2>
      <ul>
        <li>{`File Name: ${name}`}</li>
        <li>{`File Path: ${path}` }</li>
        <li>{`File Size: ${size}`}</li>
        <li>{`File Type: ${type}`}</li>
        <li>{`Last Modified Date: ${new Date(lastModifiedDate)}`}</li>
        <li>{`Hashcode: ${hashcode}`}</li>
      </ul>
      <button type="submit" className="btn btn-primary" onClick={handleBack}>Back</button>
      <button type="submit" className="btn btn-primary" onClick={handleS3UploadSubmit}>Upload to S3</button>
    </div>
  );
}

FileMetadataResults.propTypes = {
  hashcodeResults: PropTypes.shape({
    hashcode: PropTypes.string.isRequired,
    lastModifiedDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleS3UploadSubmit: PropTypes.func.isRequired,
};

export default FileMetadataResults;
