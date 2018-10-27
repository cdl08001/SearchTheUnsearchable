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
      <table className="table" id="hashcodeMetadataTable">
        <tbody>
          <tr>
            <th scope="row">File Name:</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th scope="row">File Path:</th>
            <td>{path}</td>
          </tr>
          <tr>
            <th scope="row">File Size:</th>
            <td>{size}</td>
          </tr>
          <tr>
            <th scope="row">File Type:</th>
            <td>{type}</td>
          </tr>
          <tr>
            <th scope="row">Last Modified Date:</th>
            <td>{`${new Date(lastModifiedDate)}`}</td>
          </tr>
          <tr>
            <th scope="row">Hashcode:</th>
            <td>{hashcode}</td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="btn btn-primary" id="metadataResultsBackBtn" onClick={handleBack}>Back</button>
      <button type="submit" className="btn btn-primary" id="uploadToS3Btn" onClick={handleS3UploadSubmit}>Upload to S3</button>
    </div>
  );
}

FileMetadataResults.propTypes = {
  hashcodeResults: PropTypes.shape({
    hashcode: PropTypes.string.isRequired,
    lastModifiedDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleS3UploadSubmit: PropTypes.func.isRequired,
};

export default FileMetadataResults;
