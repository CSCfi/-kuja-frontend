import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Footer from './Footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
});

it('renders a snapshot', () => {
    const tree = renderer.create(<Footer/>).toJSON();
    expect(tree).toMatchSnapshot();
  });