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
        POP: null,
        HI: null,
        emissions_info: {
            pollutant_name: null,
            LADD: null,
            Tout: null,
            Vout: null,
            Tin: null,
            Vin: null,
            BW: null,
            AT: null,
            EF: null,
            ED: null,
            Ca: null,
            Ch: null,
            HQ: null,
            AC: null,
            RfC: null,
            CR: null,
            SF: null,
            PCR: null
        },
        additional_information: {
            year: null,
            url: null
        }
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.form);
        if (this.formControl.form.valid) {

            this.form.emissions_info = [this.form.emissions_info];

            this.dataBaseService.addNewArea(this.form)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err),
                    () => {
                        this.formControl.form.reset();
                        this.form = {
                            name: null,
                            POP: null,
                            HI: null,
                            emissions_info: {
                                pollutant_name: null,
                                LADD: null,
                                Tout: null,
                                Vout: null,
                                Tin: null,
                                Vin: null,
                                BW: null,
                                AT: null,
                                EF: null,
                                ED: null,
                                Ca: null,
                                Ch: null,
                                HQ: null,
                                AC: null,
                                RfC: null,
                                CR: null,
                                SF: null,
                                PCR: null
                            },
                            additional_information: {
                                year: null,
                                url: null
                            }
                        }
                    });
        }
    }
}
