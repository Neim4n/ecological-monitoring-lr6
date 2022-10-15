import { Component, OnInit } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { delay, finalize } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    geoObjects: any[];
    information: any;
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
        this.loadGeoObjects();
        this.loadInformation();
    }

    loadGeoObjects() {
        this.loading = true;

        this.dataBaseService.getGeoObjects()
            .pipe(
                delay(300),
                finalize(() => this.loading = false)
            )
            .subscribe((res: any) => {
                this.geoObjects = res;
            });
    }

    loadInformation() {
        this.dataBaseService.getInformation()
            .subscribe((res: any) => {
                this.information = res;
            });
    }

    compareEmissions() {
        this.isChecked = !this.isChecked;
        this.geoObjects.forEach((object: any) => {
            const newEmissions = object.emissions * 1000 / (365 * 24);
            object.status = newEmissions >= object['gdv_standards']['mass_consumption'];
            object.overrun = (newEmissions / object['gdv_standards']['mass_consumption'] * 100).toFixed(2);
        })

        const newGeoObjects = this.geoObjects.map((object: any) => JSON.parse(JSON.stringify(object)));

        newGeoObjects.forEach((object: any) => {
            delete object.status;
        })

        this.geoObjects.forEach((object: any) => {
            const newObject = {...object};
            delete  newObject.status;

            this.dataBaseService.saveResults(newObject.id, newObject).subscribe((res) => console.log(res));
        })

    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    onDelete(id: number) {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            this.geoObjects = this.geoObjects.filter((object: any) => object.id !== id);
            this.dataBaseService.deleteGeoObject(id)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }
}
