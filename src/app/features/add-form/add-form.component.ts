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
            type: 1,
            name: null,
            qm: null,
            qnorm: null,
            T: null,
            Z: null,
            m: null,
            P: null,
            A: null,
            GDK: null,
            Kt: null,
            Knas: null,
            Kf: null,
            Kz: null
        },
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.form);
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
                                type: 1,
                                name: null,
                                qm: null,
                                qnorm: null,
                                T: null,
                                Z: null,
                                m: null,
                                P: null,
                                A: null,
                                GDK: null,
                                Kt: null,
                                Knas: null,
                                Kf: null,
                                Kz: null
                            },
                        }
                    });
        }
    }
}
