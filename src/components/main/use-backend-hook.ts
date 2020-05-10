import { useState } from 'react';
import { requestCommentsLoading, fetchResults, MostCommon } from '../../utils/back-end-calls';

type BackendHook = () => {
    url: string;
    isLoading: boolean;
    data: MostCommon[];
    error: string;
    progress: number;
    onUrlChange: (value: string) => void;
    onLoadData: () => void;
}

const useBackend: BackendHook = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<MostCommon[]>([]);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const onUrlChange = (value: string) => {
        setUrl(value);
        setError('');
        setProgress(0);
    };

    const showError = (error: string): void => {
        setError(error);
        setLoading(false);
        setProgress(0);
    };

    const updateProgress = (progress: string): void => {
        setProgress(parseFloat(progress) * 100);
    };

    const onLoadData = () => {
        setLoading(true);

        let videoId: string | null = '';

        try {
            const urlObject = new URL(url);

            videoId = urlObject.searchParams.get('v');
        }
        catch (error) {
            showError(error.message);
            return;
        }

        if (videoId) {
            requestCommentsLoading(videoId)
                .then(jobId => fetchResults(jobId, 50, updateProgress))
                .then(data => {
                    setData(data.mostCommon);
                    setLoading(false);
                    setProgress(0);
                });
        }
        else
            showError('Mailformed URL: youtube video ourl should contain "v" parameter.');
    }

    return { url, isLoading, data, error, progress, onUrlChange, onLoadData };
};

export default useBackend;
