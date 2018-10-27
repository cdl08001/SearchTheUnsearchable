import React from 'react';
import PropTypes from 'prop-types';

function s3UploadResults(props) {
  const {
    s3UploadData,
    handleBack,
    handleTranscribeJobSubmit,
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
      <table className="table" id="s3UploadDataTable">
        <tbody>
          <tr>
            <th scope="row">Bucket:</th>
            <td>{Bucket}</td>
          </tr>
          <tr>
            <th scope="row">ETag:</th>
            <td>{ETag}</td>
          </tr>
          <tr>
            <th scope="row">File Name:</th>
            <td>{Key}</td>
          </tr>
          <tr>
            <th scope="row">AWS Location:</th>
            <td>{Location}</td>
          </tr>
          <tr>
            <th scope="row">Server Side Encryption</th>
            <td>{ServerSideEncryption}</td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="btn btn-primary" id="s3UploadResultsBackBtn" onClick={handleBack}>Back</button>
      <button type="submit" className="btn btn-primary" id="handleTranscribeJobBtn" onClick={handleTranscribeJobSubmit}>Submit Transcription Job</button>
    </div>
  );
}

s3UploadResults.propTypes = {
  s3UploadData: PropTypes.shape({
    Bucket: PropTypes.string.isRequired,
    ETag: PropTypes.string.isRequired,
    Key: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    ServerSideEncryption: PropTypes.string.isRequired,
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleTranscribeJobSubmit: PropTypes.func.isRequired,
};

export default s3UploadResults;
