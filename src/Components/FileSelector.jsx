import React from 'react';
import PropTypes from 'prop-types';

function FileSelector(props) {
  const { handleFileSelectionSubmit } = props;
  return (
    <form onSubmit={handleFileSelectionSubmit}>
      <div className="form-group">
        <label htmlFor="inputFile" id="fileSelectorLabel">Select an Audio File to Begin Transcription Process.</label>
        <input type="file" className="form-control-file" id="fileSelector" accept="audio/*" multiple={false} />
        <button type="submit" id="fileSelectorBtn">Submit</button>
      </div>
    </form>
  );
}

FileSelector.propTypes = {
  handleFileSelectionSubmit: PropTypes.func.isRequired,
};

export default FileSelector;
