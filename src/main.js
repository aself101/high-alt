import React from 'react';
import { render } from 'react-dom';
import App from './app.js';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Links } from './components/data';


var main = (() => {

  render(<Navbar logo={'Test'} app={'App'} />, document.getElementById('navbar'));
  render(<App />, document.getElementById('root'));
  render(<Footer list={Links} />, document.getElementById('foot'));
});

main();
