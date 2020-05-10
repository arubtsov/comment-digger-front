import React, { ChangeEventHandler, FormEventHandler } from 'react';

import ProgressBar from './progress-bar';
import BubbleChart from '../bubble-chart';
import PrimaryButton from '../primary-button';
import useBackend from './use-backend-hook';

const Main: React.FC = () => {
    const { url, isLoading, data, error, progress, onUrlChange, onLoadData } = useBackend();

    const onInputChange: ChangeEventHandler<HTMLInputElement> =
        event => onUrlChange(event.target.value);

    const onSubmit: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        onLoadData();
    };

    return (
        <React.Fragment>
            <ProgressBar progress={progress} />
            <main className='container'>
                <form className='form' onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='col-sm'>
                            <input type="text" className="form-control mb-2"
                                placeholder="Enter YouTube video URL"
                                onChange={onInputChange} />
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
                <BubbleChart data={data} />
            </main>
        </React.Fragment>
    );
};

export default Main;
