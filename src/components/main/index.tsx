import React, { useState } from 'react';

import ProgressBar from './progress-bar';
import BubbleChart from '../bubble-chart';
import { requestCommentsLoading, fetchResults, MostCommon } from '../../utils/back-end-calls';

const Main: React.FC = () => {
    const [state, setState] = useState({ url: '', isLoading: false, data: [] as MostCommon[], error: '', progress: 0 });

    const onUrlChange = function (event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setState(function (prev)  {
            return { ...prev, url: value, error: '', progress: 0 };
        });
    };

    const showError = (error: string) => setState(prev => ({ ...prev, error, isLoading: false, progress: 0 }));

    const updateProgress = (progress: string) => {
        setState(function (prev) {
            return { ...prev, progress: parseFloat(progress) * 100 };
        });
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState(prev => ({ ...prev, isLoading: true }));

        let videoId = null;

        try {
            const urlObject = new URL(state.url);

            videoId = urlObject.searchParams.get('v');
        }
        catch (error) {
            showError(error.message);
            return;
        }

        if (!videoId) {
            showError('Mailformed URL: youtube video ourl should contain "v" parameter.');
            return;
        }

        requestCommentsLoading(videoId)
            .then(jobId => fetchResults(jobId, 50, updateProgress))
            .then(data => setState(prev => ({ ...prev, data: data.mostCommon, isLoading: false })));
    };

    return (
        <React.Fragment>
            <ProgressBar progress={state.progress}/>
            <main className='container'>
                <form className='form' onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='col-sm'>
                            <input type="text" className="form-control mb-2" placeholder="Enter YouTube video URL" onChange={onUrlChange}/>
                        </div>
                        <div className='col-sm-2'>
                            <button className='form-control btn btn-primary mb-2 d-flex align-items-center justify-content-center' disabled={!state.url || state.isLoading}>
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
                {
                    state.error && <div className="alert alert-danger" role="alert">{state.error}</div>
                }
                <BubbleChart data={state.data}/>
            </main>
        </React.Fragment>
    );
};

export default Main;