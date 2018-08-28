import React from 'react';
import PropTypes from 'prop-types';

function FileMetadata(props) {
  const {
    serverData,
  } = props;
  const {
    hashcode,
    lastModifiedDate,
    name,
    path,
    size,
    type,
  } = serverData;

  return (
    <div>
      <h2>Metadata</h2>
      <ul>
        <li>{`File Name: ${name}`}</li>
        <li>{`File Path: ${path}` }</li>
        <li>{`File Size: ${size}`}</li>
        <li>{`File Type: ${type}`}</li>
        <li>{`Last Modified Date: ${new Date(lastModifiedDate)}`}</li>
        <li>{`Hashcode: ${hashcode}`}</li>
      </ul>
    </div>
  );
}

FileMetadata.propTypes = {
  serverData: PropTypes.shape({
    hashcode: PropTypes.string.isRequired,
    lastModifiedDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default FileMetadata;
