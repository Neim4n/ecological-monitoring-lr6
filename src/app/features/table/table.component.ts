import { Component, OnInit } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { delay, finalize } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    objects: any[];
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
        this.loadObjects();
    }

    loadObjects() {
        this.loading = true;

        this.dataBaseService.getObjects()
            .pipe(
                delay(300),
                finalize(() => this.loading = false)
            )
            .subscribe((res: any) => {
                this.objects = res;
            });
    }

    calculateLosses() {
        this.objects.forEach((object: any) => {
            object.losses.forEach((info: any) => {
                const {qm, qnorm, T, P, GDK, Knas, Kf} = info
                info.A = 1 / GDK;
                info.Kt = Knas * Kf;
                info.m = 3.6 * Math.pow(10, -3) * (qm - qnorm) * T;
                info.Z = qm >= qnorm ? info.m * 1.1 * P * info.A * info.Kt * info.Kz : 0;
            })
        })
    }

    toggleObjectEdit(index: number) {
        this.objects[index].isEditing = !this.objects[index].isEditing;
    }

    saveEditObject(index: number) {
        const editGeoObject = this.objects[index];
        delete editGeoObject.isEditing;

        const body = JSON.parse(JSON.stringify(editGeoObject));

        body.losses.forEach((e: any) => {
            e.A = null;
            e.Kt = null;
            e.m = null;
            e.Z = null;
        })

        this.dataBaseService.saveResults(editGeoObject.id, body).subscribe((res) => this.calculateLosses());
    }

    onDelete(id: number) {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            this.objects = this.objects.filter((object: any) => object.id !== id);
            this.dataBaseService.deleteObject(id)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }
}
