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
    filteredObjects: any[];
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;
    selectedLossesType: number = 1;

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
                this.filteredObjects = this.objects?.filter((e: any) => e.losses.some((l: any) => l.type === +this.selectedLossesType));
            });
    }

    filterObjects(): void {
        this.filteredObjects = this.objects?.filter((e: any) => e.losses.some((l: any) => l.type === +this.selectedLossesType));
    }

    calculateLosses() {
        this.objects.forEach((object: any) => {
            object.losses.forEach((info: any) => {
                if (info.type === 1) {
                    const {MlN, MtN, Mi, MzN, Nz, Vd} = info
                    info.Svtrr = MlN + MtN + Mi + MzN;
                    info.Svdp = 12 * 0.15 * 1000 * Nz;
                    info.Svvth = 12 * 0.037 * 1000 * (18 - Vd);
                    info.Nr = info.Svtrr + info.Svdp + info.Svvth;
                    object.zbytky += info.Nr;
                } else if (info.type === 2) {
                    const {fv, fg, pr, prs, sn, mdg} = info
                    info.mr = fv + fg + pr + prs + sn + mdg;
                    object.zbytky += info.mr;
                } else if (info.type === 4) {
                    const {n, p} = info
                    info.rsg1 = n * p;
                    info.rsg2 = info['1_k'] * n * p;
                    info.rsg = info.rsg1 + info.rsg2;
                    object.zbytky += info.rsg;
                } else if (info.type === 6) {
                    const {n, k, p, N1, N2} = info
                    info.rlg1 = n * p * k;
                    info.rlg2 = (1 - k) * k * p;
                    info.rlg3 = (N1 - N2) * k * p;
                    info.rlg = info.rlg1 + info.rlg2 + info.rlg3;
                    object.zbytky += info.rlg;
                }
            })
        })
    }

    toggleObjectEdit(index: number) {
        this.filteredObjects[index].isEditing = !this.filteredObjects[index].isEditing;
    }

    saveEditObject(index: number) {
        const editGeoObject = this.filteredObjects[index];
        delete editGeoObject.isEditing;

        const body = JSON.parse(JSON.stringify(editGeoObject));

        body.losses.forEach((e: any) => {
            if (e.type === 1) {
                e.Svtrr = null;
                e.Svdp = null;
                e.Svvth = null;
                e.Nr = null;
            } else if (e.type === 2) {
                e.mr = null;
            } else if (e.type === 4) {
                e.rsg1 = null;
                e.rsg2 = null;
                e.rsg = null;
            } else if (e.type === 6) {
                e.rlg1 = null;
                e.rlg2 = null;
                e.rlg3 = null;
                e.rlg = null;
            }
        })

        this.dataBaseService.saveResults(editGeoObject.id, body).subscribe((res) => this.calculateLosses());
    }

    onDelete(id: number) {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            this.filteredObjects = this.filteredObjects.filter((object: any) => object.id !== id);
            this.dataBaseService.deleteObject(id)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }
}
