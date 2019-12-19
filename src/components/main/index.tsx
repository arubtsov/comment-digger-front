import React, { useState } from 'react';

const MainInput: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <input type="text"
            placeholder='Enter YouTube video URL'
            className='col-sm-6 form-control' {...props}/>
    )
};

const Main: React.FC = () => {
    const [state, setState] = useState({ url: '', isLoading: false, data: null });
    const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => setState(prev =>({ ...prev, url: event.target.value }));
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isLoading: true }));

        const urlObject = new URL(state.url);
        const videoId = urlObject.searchParams.get('v');

        fetch(`http://comment-digger-back.herokuapp.com/?videoId=${videoId}`)
            .then(response => response.text())
            .then(jobId => {
                const interval = setInterval(() => {
                    fetch(`http://comment-digger-back.herokuapp.com/results/${jobId}?number=${50}`)
                        .then(response => {
                            if (response.status === 200) {
                                clearInterval(interval);

                                response.json().then(data => setState(prev => ({ ...prev, data, isLoading: false })))
                            }
                        })
                }, 5000);
            });
    };

    return (
        <main className='container-md'>
            <form className='row justify-content-around' onSubmit={onSubmit}>
                <MainInput value={state.url} onChange={onUrlChange}/>
                <button className='col-sm-2 btn btn-primary' disabled={!state.url || state.isLoading}>Dig!</button>
            </form>         
        </main>
    );
};

export default Main;