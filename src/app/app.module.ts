import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { TableComponent } from './features/table/table.component';
import { HttpClientModule } from "@angular/common/http";
import { AddFormComponent } from './features/add-form/add-form.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from './shared/modules/material/material.module';
import { MatTableModule } from "@angular/material/table";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TableComponent,
        AddFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MaterialModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
