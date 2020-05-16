const BASE_URL = 'https://comment-digger-back.herokuapp.com/';

const COMMENTS_URL = `${BASE_URL}comments/`;

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

interface Progress {
    progress: number;
}

interface Results {
    count: Number;
    comments: Comment[];
    mostCommon: MostCommon[]
}

interface UpdateCallback {
    (progress: number): void
}

async function fetchResults (videoId: string, top: number, updateCallback: UpdateCallback): Promise<Results> {
    const response = await fetch(`${COMMENTS_URL}${videoId}?number=${top}`);

    if (response.status === 202) {
        response.json().then(({ progress }: Progress) => updateCallback(progress * 100));
        await delay();

        return fetchResults(videoId, top, updateCallback);
    }
    else if (response.status === 200)
        return response.json() as Promise<Results>;

    throw new Error(`Server responded with "${response.status}": "${await response.text()}"`);
}

export { fetchResults };
