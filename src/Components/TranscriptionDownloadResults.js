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
      <ul>
        <li>{`File Name: ${name}`}</li>
        <li>{`File Path: ${path}` }</li>
        <li>{`File Size: ${size}`}</li>
        <li>{`File Type: ${type}`}</li>
        <li>{`Last Modified Date: ${new Date(lastModifiedDate)}`}</li>
        <li>{`Hashcode: ${hashcode}`}</li>
      </ul>
      <div>
        Results:
        <p>{transcript}</p>
      </div>
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
