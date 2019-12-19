import React from 'react';

const Main: React.FC = () => {
    return (
        <main className='container-md'>
            <form className='row justify-content-around'>
                <input type="text" placeholder='Enter YouTube video URL' className='col-sm-6 form-control'/>
                <button className='col-sm-2 btn btn-primary'>Dig!</button>
            </form>
        </main>
    );
};

export default Main;