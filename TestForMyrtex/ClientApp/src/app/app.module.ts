import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AboutComponent } from './about/about.component'
import { EmployeesComponent } from './employees/employees.component'
import { DeleteDialog } from './employees/delete-dialog.component';
import { EditDialog } from './employees/edit-dialog.component';
import { CreateDialog } from './employees/create-dialog.component';


@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, MatDialogModule, MatSortModule, MatMenuModule,
        MatButtonModule,BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', component: AboutComponent, pathMatch: 'full' },
            { path: 'employees', component: EmployeesComponent },
        ])],
    declarations: [AppComponent, NavMenuComponent, EmployeesComponent, DeleteDialog, EditDialog, CreateDialog],
    bootstrap: [AppComponent],
    
})
export class AppModule { }