import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const API_URL: string = 'https://ecological-monitoring-lab.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor(private http: HttpClient) {
    }

    getGeoObjects() {
        return this.http.get(API_URL + '/geo_objects');
    }

}
