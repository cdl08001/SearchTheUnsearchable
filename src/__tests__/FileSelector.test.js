import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import FileSelector from '../Components/FileSelector';

describe('FileSelector Rendering', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileSelector />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
