import React, { useState } from 'react';

import BubbleChart from '../bubble-chart';
import { requestCommentsLoading, fetchResults, MostCommon } from '../../utils/back-end-calls';

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
        <main className='container'>
            <form className='form' onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-sm'>
                        <input type="text" className="form-control mb-2" placeholder="Enter YouTube video URL" onChange={onUrlChange}/>
                    </div>
                    <div className='col-sm-2'>
                        <button className='form-control btn btn-primary mb-2' disabled={!state.url || state.isLoading}>
                        {
                            state.isLoading ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : 'Dig!'
                        }
                        </button>
                    </div>
                </div>
            </form>
            <BubbleChart data={state.data}/>
        </main>
    );
};

export default Main;