import React from 'react';

import './App.css';
import Header from '../header';
import Footer from '../footer';

const App: React.FC = () => {
  return (
    <div className="App d-flex flex-column">
        <Header/>
        <main className='container-md'>
            <form className='row justify-content-around'>
                <input type="text" placeholder='Enter YouTube video URL' className='col-sm-6 form-control'/>
                <button className='col-sm-2 btn btn-primary'>Dig!</button>
            </form>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
