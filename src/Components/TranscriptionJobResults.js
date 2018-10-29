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
        <table className="table" id="transcriptionJobSubmitTable">
          <tbody>
            <tr>
              <th scope="row">Job Name:</th>
              <td>{TranscriptionJobName}</td>
            </tr>
            <tr>
              <th scope="row">Job Status:</th>
              <td>{TranscriptionJobStatus}</td>
            </tr>
            <tr>
              <th scope="row">Job Submission Time:</th>
              <td>{`${new Date(CreationTime)}`}</td>
            </tr>
            <tr>
              <th scope="row">Media Format:</th>
              <td>{MediaFormat}</td>
            </tr>
            <tr>
              <th scope="row">Language Code</th>
              <td>{LanguageCode}</td>
            </tr>
          </tbody>
        </table>
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
    const { handleTranscriptionDownload } = props;
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
        <table className="table" id="transcriptionJobCompleteTable">
          <tbody>
            <tr>
              <th scope="row">Job Name:</th>
              <td>{TranscriptionJobName}</td>
            </tr>
            <tr>
              <th scope="row">Job Status:</th>
              <td>{TranscriptionJobStatus}</td>
            </tr>
            <tr>
              <th scope="row">Job Submission Time:</th>
              <td>{`${new Date(CreationTime)}`}</td>
            </tr>
            <tr>
              <th scope="row">Job Completion Time:</th>
              <td>{`${new Date(CompletionTime)}`}</td>
            </tr>
            <tr>
              <th scope="row">Media Format:</th>
              <td>{MediaFormat}</td>
            </tr>
            <tr>
              <th scope="row">Language Code</th>
              <td>{LanguageCode}</td>
            </tr>
            <tr>
              <th scope="row">Media Sample Rate Hertz</th>
              <td>{MediaSampleRateHertz}</td>
            </tr>
            <tr>
              <th scope="row">Language Code</th>
              <td>{TranscriptFileUri}</td>
            </tr>
          </tbody>
        </table>
        <h3>
          The transcription results are ready for download.
        </h3>
        <button type="submit" className="btn btn-primary" id="handleTranscriptionDownloadBtn" onClick={handleTranscriptionDownload}>Download</button>
      </div>
    );
  }

  return view;
}

TranscriptionJobResults.propTypes = {
  checkTranscribeJobStatus: PropTypes.func.isRequired,
  handleTranscriptionDownload: PropTypes.func,
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
