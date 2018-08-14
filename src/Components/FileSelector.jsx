import React from 'react';
import PropTypes from 'prop-types';

function FileSelector(props) {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputFile">
          Select an Audio File
          <input type="file" id="fileSelector" accept="audio/*" />
        </label>
      </div>
      <button type="submit" className="defaultButton">Submit</button>
    </form>
  );
}

FileSelector.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default FileSelector;
