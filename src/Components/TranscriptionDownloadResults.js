import React from 'react';
import PropTypes from 'prop-types';

function TranscriptionDownloadResults(props) {
  const { transcriptionData, hashcodeResults } = props;
  const { transcript } = transcriptionData[0];
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
      <h2>Transcription Results</h2>
      <table className="table" id="transcriptionDownloadResultsTable">
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
            <th scope="row">Hashcode</th>
            <td>{hashcode}</td>
          </tr>
          <tr>
            <th scope="row">Results</th>
            <td>{transcript}</td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="btn btn-primary">Do Something</button>
    </div>
  );
}

TranscriptionDownloadResults.propTypes = {
  transcriptionData: PropTypes.arrayOf(PropTypes.shape({
    transcript: PropTypes.string.isRequired,
  })).isRequired,
  hashcodeResults: PropTypes.shape({
    hashcode: PropTypes.string.isRequired,
    lastModifiedDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default TranscriptionDownloadResults;
