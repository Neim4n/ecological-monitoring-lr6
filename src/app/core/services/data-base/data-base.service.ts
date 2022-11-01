import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const API_URL: string = 'https://ecological-monitoring-lab.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor(private http: HttpClient) {
    }

    getAreas() {
        return this.http.get(API_URL + '/areas');
    }

    addNewArea(body: any) {
        return this.http.post(API_URL + '/areas', body)
    }

    deleteArea(id: number) {
        return this.http.delete(API_URL + '/areas/' + id)
    }

    saveResults(id: number, body: any) {
        return this.http.put(API_URL + '/areas/' + id, body)
    }
}


