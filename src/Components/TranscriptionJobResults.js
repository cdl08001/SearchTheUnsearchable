import React from 'react';
import PropTypes from 'prop-types';

function TranscriptionJobResults(props) {
  const { transcribeJobResults } = props;
  let view = null;

  if (transcribeJobResults === '') {
    const { transcribeJobData, checkTranscribeJobStatus } = props;
    const { TranscriptionJob } = transcribeJobData;
    const {
      CreationTime,
      LanguageCode,
      MediaFormat,
      TranscriptionJobName,
      TranscriptionJobStatus,
    } = TranscriptionJob;

    view = (
      <div>
        <h2>Transcribe Job Submitted</h2>
        <ul>
          <li>{`Job Name: ${TranscriptionJobName}`}</li>
          <li>{`Job Status: ${TranscriptionJobStatus}`}</li>
          <li>{`Job Submission Time: ${new Date(CreationTime)}`}</li>
          <li>{`Media Format: ${MediaFormat}`}</li>
          <li>{`Language Code: ${LanguageCode}`}</li>
        </ul>
        <h3>
          {checkTranscribeJobStatus()}
        The operation is currently running.
        The system will automatically check for data every 30 seconds.
        </h3>
      </div>
    );
  }

  if (transcribeJobResults !== '') {
    const { TranscriptionJob } = transcribeJobResults;
    const { Transcript } = TranscriptionJob;
    const { TranscriptFileUri } = Transcript;
    const {
      CompletionTime,
      CreationTime,
      LanguageCode,
      MediaFormat,
      MediaSampleRateHertz,
      TranscriptionJobName,
      TranscriptionJobStatus,
    } = TranscriptionJob;

    view = (
      <div>
        <h2>Transcribe Job Complete</h2>
        <ul>
          <li>{`Job Name: ${TranscriptionJobName}`}</li>
          <li>{`Job Status: ${TranscriptionJobStatus}`}</li>
          <li>{`Job Submission Time: ${new Date(CreationTime)}`}</li>
          <li>{`Job Completion Time: ${new Date(CompletionTime)}`}</li>
          <li>{`Media Format: ${MediaFormat}`}</li>
          <li>{`Language Code: ${LanguageCode}`}</li>
          <li>{`Media Sample Rate Herz: ${MediaSampleRateHertz}`}</li>
          <li>{`Transcript Location: ${TranscriptFileUri}`}</li>
        </ul>
        <h3>
          The transcription results are ready for download.
        </h3>
      </div>
    );
  }

  return view;
}

TranscriptionJobResults.propTypes = {
  checkTranscribeJobStatus: PropTypes.func.isRequired,
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
  transcribeJobResults: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      TranscriptionJob: PropTypes.shape({
        CompletionTime: PropTypes.string.isRequired,
        CreationTime: PropTypes.string.isRequired,
        LanguageCode: PropTypes.string.isRequired,
        Media: PropTypes.shape({
          MediaFileUri: PropTypes.string.isRequired,
        }).isRequired,
        MediaFormat: PropTypes.string.isRequired,
        MediaSampleRateHertz: PropTypes.number.isRequired,
        Settings: PropTypes.shape({
          ChannelIdentification: PropTypes.bool.isRequired,
        }).isRequired,
        Transcript: PropTypes.shape({
          TranscriptFileUri: PropTypes.string.isRequired,
        }).isRequired,
        TranscriptionJobName: PropTypes.string.isRequired,
        TranscriptionJobStatus: PropTypes.string.isRequired,
      }),
    }),
  ]),
};

export default TranscriptionJobResults;
