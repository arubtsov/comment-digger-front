const BASE_URL = 'https://comment-digger-back.herokuapp.com/';

export function requestCommentsLoading(videoId: string): Promise<string> {
    return fetch(`${BASE_URL}?videoId=${videoId}`)
        .then(response => response.text());
}
