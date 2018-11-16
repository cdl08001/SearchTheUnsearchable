import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('Application Initial Load', () => {
  const initialLoad = new App();

  describe('Application State', () => {
    it('contains a null currentPhase state', () => {
      expect(initialLoad.state.currentPhase).toBeNull();
    });
  });

  describe('Application Properties', () => {
    it('contains hashcodeResults property (empty string)', () => {
      expect(initialLoad.hashcodeResults).toBe('');
    });

    it('contains s3UploadData property (empty string)', () => {
      expect(initialLoad.s3UploadData).toBe('');
    });

    it('contains transcribeJobData property (empty string)', () => {
      expect(initialLoad.transcribeJobData).toBe('');
    });

    it('contains transcribeJobResults property (empty string)', () => {
      expect(initialLoad.transcribeJobResults).toBe('');
    });

    it('contains transcriptionData property (empty string)', () => {
      expect(initialLoad.transcriptionData).toBe('');
    });
  });

  describe('Application Methods', () => {
    it('contains updateView method', () => {
      expect(initialLoad.updateView instanceof Function).toBe(true);
    });

    it('contains handleFileSelectionSubmit method', () => {
      expect(initialLoad.handleFileSelectionSubmit instanceof Function ).toBe(true);
    });

    it('contains handleBack method', () => {
      expect(initialLoad.handleBack instanceof Function).toBe(true);
    });

    it('contains handleS3UploadSubmit method', () => {
      expect(initialLoad.handleS3UploadSubmit instanceof Function).toBe(true);
    });

    it('contains handleTranscribeJobSubmit method', () => {
      expect(initialLoad.handleTranscribeJobSubmit instanceof Function).toBe(true);
    });

    it('contains checkTranscribeJobStatus method', () => {
      expect(initialLoad.checkTranscribeJobStatus instanceof Function).toBe(true);
    });

    it('contains handleTranscriptionDownload method', () => {
      expect(initialLoad.handleTranscriptionDownload instanceof Function).toBe(true);
    });

    it('contains handleSave method', () => {
      expect(initialLoad.handleSave instanceof Function).toBe(true);
    });

    it('contains handleHome method', () => {
      expect(initialLoad.handleHome instanceof Function).toBe(true);
    });
  });
});
