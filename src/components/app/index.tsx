import React from 'react';

import './App.css';
import Header from '../header';
import Footer from '../footer';
import Main from '../main';

const App: React.FC = () => {
  return (
    <div className="App d-flex flex-column">
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
