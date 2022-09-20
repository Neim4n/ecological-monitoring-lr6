import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../core/services/data-base/data-base.service";
import { delay, finalize } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    geoObjects: any[];
    loading: boolean = false

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
       this.loadGeoObjects();
    }

    loadGeoObjects() {
        this.loading = true;

        this.dataBaseService.getGeoObjects()
            .pipe(
                delay(300),
                finalize(()=> this.loading = false)
            )
            .subscribe((res: any) => {
                this.geoObjects = res;
            });
    }

    compareEmissions() {

    }
}
