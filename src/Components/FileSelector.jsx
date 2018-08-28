import React from 'react';
import PropTypes from 'prop-types';

function FileSelector(props) {
  const { handleFileSelectionSubmit } = props;
  return (
    <form onSubmit={handleFileSelectionSubmit}>
      <div className="form-group">
        <label htmlFor="inputFile">
          Select an Audio File
          <input type="file" id="fileSelector" accept="audio/*" multiple="true" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

FileSelector.propTypes = {
  handleFileSelectionSubmit: PropTypes.func.isRequired,
};

export default FileSelector;
