import React, { useState, ChangeEventHandler } from 'react';

import ProgressBar from './progress-bar';
import BubbleChart from '../bubble-chart';
import PrimaryButton from '../primary-button';
import { requestCommentsLoading, fetchResults, MostCommon } from '../../utils/back-end-calls';

const Main: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<MostCommon[]>([]);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const onUrlChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { value } = event.target;

        setUrl(value);
        setError('');
        setProgress(0);
    };

    const showError = (error: string) => {
        setError(error);
        setLoading(false);
        setProgress(0);
    };

    const updateProgress = (progress: string) => {
        setProgress(parseFloat(progress) * 100);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        let videoId = null;

        try {
            const urlObject = new URL(url);

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
            .then(data => {
                setData(data.mostCommon);
                setLoading(false);
                setProgress(0);
            });
    };

    return (
        <React.Fragment>
            <ProgressBar progress={progress}/>
            <main className='container'>
                <form className='form' onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='col-sm'>
                            <input type="text" className="form-control mb-2"
                                   placeholder="Enter YouTube video URL"
                                   onChange={onUrlChange}/>
                        </div>
                        <div className='col-sm-2'>
                            <PrimaryButton className="form-control" disabled={!url || isLoading}>
                            {
                                isLoading ? (
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : 'Dig!'
                            }
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
                {
                    error &&
                    <div className="alert alert-danger" role="alert">{error}</div>
                }
                <BubbleChart data={data}/>
            </main>
        </React.Fragment>
    );
};

export default Main;
