const BASE_URL = 'https://comment-digger-back.herokuapp.com/';

async function requestCommentsLoading(videoId: string): Promise<string> {
    const response = await fetch(`${BASE_URL}?videoId=${videoId}`);

    return await response.text();
}

function delay (timeout: number = 1000): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

interface Comment {
    author: string;
    is: string;
    likeCount: number;
    publishedAt: string;
    text: string;
}

export type MostCommon = [string | [string, string], number];

interface Results {
    count: Number;
    comments: Comment[];
    mostCommon: MostCommon[]
}

async function fetchResults (jobId: string, top: number, updateCallback: (progress: number) => void): Promise<Results> {
    await delay();

    const response = await fetch(`${BASE_URL}results/${jobId}?number=${top}`);

    if (response.status === 202) {
        response.text().then(progress => updateCallback(parseFloat(progress) * 100));

        return fetchResults(jobId, top, updateCallback);
    }
    else if (response.status === 200)
        return response.json() as Promise<Results>;

    throw new Error(`Server responded with "${response.status}": "${response.text}"`);
}

export { requestCommentsLoading, fetchResults };
