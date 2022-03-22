import axios from 'axios';

export default class Api {
    get(url: string) {
        return axios.get(url);
    }

    post(url: string, data: any) {
        return axios.post(url, data);
    }

    searchWords(word: string) {
        return this.get(`/find?searchString=${word.toLowerCase()}`)
    }

    like(wordUuid: string) {
        return this.post(`/${wordUuid}/like`, {});
    }

    unlike(wordUuid: string) {
        return this.post(`/${wordUuid}/unlike`, {});
    }
}