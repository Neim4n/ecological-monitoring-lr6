import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const API_URL: string = 'https://lime-wholesale-bite.glitch.me';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor(private http: HttpClient) {
    }

    getObjects() {
        return this.http.get(API_URL + '/objects');
    }

    addNewObject(body: any) {
        return this.http.post(API_URL + '/objects', body)
    }

    deleteObject(id: number) {
        return this.http.delete(API_URL + '/objects/' + id)
    }

    saveResults(id: number, body: any) {
        return this.http.put(API_URL + '/objects/' + id, body)
    }
}


