import React from 'react';
import PropTypes from 'prop-types';

function TranscriptionJobResults(props) {
  const { transcribeJobData } = props;
  const { TranscriptionJob } = transcribeJobData;
  const {
    CreationTime,
    LanguageCode,
    MediaFormat,
    TranscriptionJobName,
    TranscriptionJobStatus,
  } = TranscriptionJob;
  return (
    <div>
      <h2>Transcribe Job Submitted</h2>
      <ul>
        <li>{`Job Name: ${TranscriptionJobName}`}</li>
        <li>{`Job Status: ${TranscriptionJobStatus}`}</li>
        <li>{`Job Submission Time: ${new Date(CreationTime)}`}</li>
        <li>{`Media Format: ${MediaFormat}`}</li>
        <li>{`Language Code: ${LanguageCode}`}</li>
      </ul>
    </div>
  );
}

export default TranscriptionJobResults;

TranscriptionJobResults.propTypes = {
  transcribeJobData: PropTypes.shape({
    TranscriptionJob: PropTypes.shape({
      CreationTime: PropTypes.string.isRequired,
      LanguageCode: PropTypes.string.isRequired,
      Media: PropTypes.shape({
        MediaFileUri: PropTypes.string.isRequired,
      }).isRequired,
      MediaFormat: PropTypes.string.isRequired,
      TranscriptionJobName: PropTypes.string.isRequired,
      TranscriptionJobStatus: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
