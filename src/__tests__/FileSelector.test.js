import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import FileSelector from '../Components/FileSelector';

describe('FileSelector Rendering', () => {
  const handleFileSelectionSubmit = () => {
    return true;
  };

  const form = (
    <form onSubmit={handleFileSelectionSubmit}>
      <div className="form-group">
        <label htmlFor="inputFile" id="fileSelectorLabel">Select an Audio File to Begin Transcription Process.</label>
        <input type="file" className="form-control-file" id="fileSelector" accept="audio/*" multiple={false} />
        <button type="submit" id="fileSelectorBtn">Submit</button>
      </div>
    </form>
  );

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileSelector handleFileSelectionSubmit={handleFileSelectionSubmit} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns the correct form structure', () => {
    const wrapper = shallow(<FileSelector handleFileSelectionSubmit={handleFileSelectionSubmit} />);
    expect(wrapper.contains(form)).toBe(true);
  });
});
