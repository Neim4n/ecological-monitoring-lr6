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
        pollutant_name: null,
        emissions: null,
        gdv_standards: {
            mass_consumption: null,
            gdv: null
        }
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.formControl.form.valid) {
            this.dataBaseService.addNewGeoObject(this.form)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }
}
