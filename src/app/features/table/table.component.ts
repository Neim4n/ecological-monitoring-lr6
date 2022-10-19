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
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;

    emissionTypes: any = {
        1: 'Викиди в атмосферне повітря забруднюючих',
        2: 'Cкиди забруднюючих речовин у водні обєкти',
        3: 'Розміщення відходів',
        4: 'Утворення радіоактивних відходів',
        5: 'Зберігання радіоактивних відходів',
    }

    emissionDmensionalUnits: any = {
        1: ' т ',
        2: ' т ',
        3: ' т ',
        4: ' м^3 ',
        5: ' м^3 ',
    }

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
                finalize(() => this.loading = false)
            )
            .subscribe((res: any) => {
                this.geoObjects = res;
            });
    }

    calculateTaxAmount() {
        this.geoObjects.forEach((object: any) => {
            let tax_amount = 0;

            object.emissions_info.forEach((info: any) => {
                switch (+info.emissions_type) {
                    case (1):
                        tax_amount += info.emissions * info.tax_rates;
                        break;
                    case (2):
                        tax_amount += info.emissions * info.tax_rates * info.water_rate;
                        break;
                    case (3):
                        tax_amount += info.emissions * info.tax_rates * info.position_rate * info.water_atmosphere_rate;
                        break;
                    case (4):
                        tax_amount += info.On * info.tax_rates + (info.rns_rate * info.c1ns * info.V1ns + info.rv_rate * info.c1v * info.V1v) + 1 / 32 * (info.rns_rate * info.c2ns * info.V2ns + info.rv_rate * info.c2v * info.V2v);
                        break;
                    case (5):
                        tax_amount += info.emissions * info.tax_rates * info.number_of_quarters;
                        break;
                    default:
                        break;
                }
            })

            object.emissions_info.tax_amount = tax_amount.toFixed(2);
        })
    }

    toggleObjectEdit(index: number) {
        this.geoObjects[index].isEditing = !this.geoObjects[index].isEditing;
    }

    saveEditObject(index: number) {
        const editGeoObject = this.geoObjects[index];
        delete editGeoObject.isEditing;
        this.dataBaseService.saveResults(editGeoObject.id, editGeoObject).subscribe((res) => console.log(res));
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
