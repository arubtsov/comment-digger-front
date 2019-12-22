import React, { useState } from 'react';

import BubbleChart from '../bubble-chart';
import { requestCommentsLoading, fetchResults, MostCommon } from '../../utils/back-end-calls';

const MainInput: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <input type="text"
            placeholder='Enter YouTube video URL'
            className='col-sm-6 form-control' {...props}/>
    )
};

const Main: React.FC = () => {
    const [state, setState] = useState({ url: '', isLoading: false, data: [] as MostCommon[] });
    const onUrlChange = function (event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setState(function (prev)  {
            return { ...prev, url: value };
        });
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isLoading: true }));

        const urlObject = new URL(state.url);
        const videoId = urlObject.searchParams.get('v');

        if (!videoId)
            throw new Error('Mailformed URL');

        requestCommentsLoading(videoId)
            .then(jobId => fetchResults(jobId, 50))
            .then(data => setState(prev => ({ ...prev, data: data.mostCommon, isLoading: false })));
    };

    return (
        <main className='container-md'>
            <form className='row justify-content-around' onSubmit={onSubmit}>                
                <MainInput value={state.url} onChange={onUrlChange}/>
                <button className='col-sm-2 btn btn-primary' disabled={!state.url || state.isLoading}>
                {
                    state.isLoading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : 'Dig!'
                }
                </button>
            </form>
            <BubbleChart data={state.data}/>
        </main>
    );
};

export default Main;