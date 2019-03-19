import axios, {AxiosPromise} from 'axios';
import {ApiUrlConstants} from '../utilities/ApiUrlConstants';

export class VueApiServices {
// tslint:disable-next-line: no-empty
    constructor() {
    }
public  getMovieDetails(params: string): AxiosPromise<any> {
    return axios.get(ApiUrlConstants.moviedb.getMovieDetails() + params);
}
}
