import React from 'react';

function FileSelector() {
  return (
    <div>
      <h1 className="text-center"><u>Search The Unsearchable!</u></h1>
      <form>
        <div className="form-group">
          <label htmlFor="inputFile">
            Select an Audio File
            <input type="file" id="fileSelector" />
          </label>
        </div>
        <button type="submit" className="defaultButton">Submit</button>
      </form>
    </div>
  );
}

export default FileSelector;
