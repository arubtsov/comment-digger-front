const BASE_URL = 'https://comment-digger-back.herokuapp.com/';

export function requestCommentsLoading(videoId: string): Promise<string> {
    return fetch(`${BASE_URL}?videoId=${videoId}`)
        .then(response => response.text());
}

function delay (timeout: number = 3000): Promise<void> {
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

export function fetchResults (jobId: string, top: number): Promise<Results> {
    return delay()
        .then(() => fetch(`${BASE_URL}results/${jobId}?number=${top}`))
        .then(response => {
            if (response.status === 202)
                return fetchResults(jobId, top);
            else if (response.status === 200)
                return response.json() as Promise<Results>;
            
            throw new Error(`Server responded with "${response.status}": "${response.text}"`);
        });
}
