import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import FileSelector from '../Components/FileSelector';

const nock = require('nock');

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
      expect(initialLoad.handleFileSelectionSubmit instanceof Function).toBe(true);
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

  describe('Application Rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders title banner and header elements', () => {
      const wrapper = shallow(<App />);
      const header = (
        <div id="titleBanner">
          <div className="container" id="title">
            <h1>
              <u>Search The Unsearchable</u>
            </h1>
          </div>
        </div>
      );
      expect(wrapper.contains(header)).toBe(true);
    });

    it('calls "updateView" during render', () => {
      const spy = jest.spyOn(App.prototype, 'updateView');
      const wrapper = shallow(<App />);
      wrapper.instance().render();
      expect(spy).toHaveBeenCalled();
    });

    it('renders one <FileSelector /> component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(FileSelector).length).toEqual(1);
    });

    it('passes a "handleFileSelectionSubmit" function as props to <FileSelector />', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(FileSelector).props().handleFileSelectionSubmit).toBeDefined();
    });
  });
});

describe('Application audio file submission', () => {
  describe('Files that have not been previously transcribed', () => {
    it('Should expect a 500 status error if no audioFile was submitted', () => {
      const hashServer = nock('http://localhost:3001')
        .post('/hash')
        .reply('200');
      const wrapper = shallow(<App />);
      const inst = wrapper.instance();
      const fakeEvent = {
        preventDefault: () => true,
      };
      // inst.handleFileSelectionSubmit(fakeEvent);
      expect(1).toEqual(1);
    });
    it('Should store hashcodeResults as class property', () => {

    });
    it('Should change state to hashcodeGenerated', () => {

    });
  });

  describe('Files that have been previously transcribed', () => {
    it('Should store hashcodeResults as class property', () => {

    });

    it('Should store transcriptionData as a class property', () => {

    });

    it('Should change state to transcriptionDownloadComplete', () => {

    });
  });
});

describe('Application upload to S3', () => {

});

describe('Application submit transcription job', () => {

});

describe('Application check transcription job status', () => {

});

describe('Application handle transcription download', () => {

});

describe('Application save to local drive', () => {

});
