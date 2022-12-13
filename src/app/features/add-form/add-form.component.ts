import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
    @ViewChild('f') formControl: NgForm;

    form: any = {
        name: null,
        sources: null,
        losses: {
            type: null,
        },
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
    }

    onChangeTypeSelect() {
        this.form.losses.type = +this.form.losses.type;
        delete this.form.losses.Nr;
        delete this.form.losses.Svtrr;
        delete this.form.losses.MlN;
        delete this.form.losses.MtN;
        delete this.form.losses.Mi;
        delete this.form.losses.MzN;
        delete this.form.losses.Svdp;
        delete this.form.losses.Nz;
        delete this.form.losses.Svvth;
        delete this.form.losses.Vd;

        delete this.form.losses.mr
        delete this.form.losses.fv;
        delete this.form.losses.fg;
        delete this.form.losses.pr;
        delete this.form.losses.prs;
        delete this.form.losses.sn;
        delete this.form.losses.mdg;

        delete this.form.losses.rsg
        delete this.form.losses.rsg1;
        delete this.form.losses.rsg2;
        delete this.form.losses['1_k'];

        delete this.form.losses.n;
        delete this.form.losses.p;

        delete this.form.losses.k;
        delete this.form.losses.rlg
        delete this.form.losses.rlg1;
        delete this.form.losses.rlg2;
        delete this.form.losses.rlg3;
        delete this.form.losses.N1;
        delete this.form.losses.N2;
        delete this.form.losses['1_k'];

        switch (this.form.losses.type) {
            case (1):
                this.form.losses.Nr = null;
                this.form.losses.Svtrr = null;
                this.form.losses.MlN = null;
                this.form.losses.MtN = null;
                this.form.losses.Mi = null;
                this.form.losses.MzN = null;
                this.form.losses.Svdp = null;
                this.form.losses.Nz = null;
                this.form.losses.Svvth = null;
                this.form.losses.Vd = null;
                break
            case (2):
                this.form.losses.mr = null;
                this.form.losses.fv = null;
                this.form.losses.fg = null;
                this.form.losses.pr = null;
                this.form.losses.prs = null;
                this.form.losses.sn = null;
                this.form.losses.mdg = null;
                break;
            case (4):
                this.form.losses.rsg = null;
                this.form.losses.rsg1 = null;
                this.form.losses.rsg2 = null;
                this.form.losses['1_k'] = 0;
                this.form.losses.n = null;
                this.form.losses.p = null;
                break;
            case (6):
                this.form.losses.rlg = null;
                this.form.losses.rlg1 = null;
                this.form.losses.rlg2 = null;
                this.form.losses.rlg3 = null;
                this.form.losses['1_k'] = 0;
                this.form.losses.n = null;
                this.form.losses.p = null;
                this.form.losses.N1 = null;
                this.form.losses.N2 = null;
                break;
            default:
                break;
        }

    }

    onSubmit(): void {
        if (this.formControl.form.valid) {
            this.form.losses = [this.form.losses];

            this.dataBaseService.addNewObject(this.form)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err),
                    () => {
                        this.formControl.form.reset();
                        this.form = {
                            name: null,
                            sources: null,
                            losses: {
                                type: null,
                            },
                        }
                    });
        }
    }
}
