import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App d-flex flex-column">
        <header>
            <img src={logo} alt='logo' className='App-logo'/>
        </header>
        <main className='container-md'>
            <form className='row justify-content-around'>
                <input type="text" placeholder='Enter YouTube video URL' className='col-sm-6 form-control'/>
                <button className='col-sm-2 btn btn-primary'>Dig!</button>
            </form>
        </main>
        <footer className='container-md align-self-end mt-auto'>            
            <address>
                <a href="mailto: arseniy.rubtsov@gmail.com">Arseniy Rubtsov</a>
            </address>            
        </footer>
    </div>
  );
}

export default App;
