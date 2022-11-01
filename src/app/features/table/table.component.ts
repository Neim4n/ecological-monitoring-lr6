import { Component, OnInit } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { delay, finalize } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    areas: any[];
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
        this.loadAreas();
    }

    loadAreas() {
        this.loading = true;

        this.dataBaseService.getAreas()
            .pipe(
                delay(300),
                finalize(() => this.loading = false)
            )
            .subscribe((res: any) => {
                this.areas = res;
            });
    }

    calculateRisks() {
        this.areas.forEach((object: any) => {
            const {POP} = object;
            let newHI = 0;

            object.emissions_info.forEach((info: any) => {
                const {Tout, Vout, Tin, Vin, BW, AT, EF, ED, Ca, Ch, AC, RfC, SF} = info
                info.LADD = ((Ca * Tout * Vout) + (Ch * Tin * Vin)) * EF * ED / (BW * AT * 365);
                info.HQ = AC / RfC;
                info.CR = info.LADD * SF;
                info.PCR = info.CR * POP;
                newHI += info.HQ;
            })

            object.HI = newHI;
        })
    }

    toggleObjectEdit(index: number) {
        this.areas[index].isEditing = !this.areas[index].isEditing;
    }

    saveEditObject(index: number) {
        const editGeoObject = this.areas[index];
        delete editGeoObject.isEditing;
        this.dataBaseService.saveResults(editGeoObject.id, editGeoObject).subscribe((res) => console.log(res));
    }

    onDelete(id: number) {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            this.areas = this.areas.filter((object: any) => object.id !== id);
            this.dataBaseService.deleteArea(id)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }
}
