import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';

import { DataService } from '../data.service';
import { Employee } from '../employee';
import { DeleteDialog } from './delete-dialog.component';
import { EditDialog } from './edit-dialog.component';
import { CreateDialog } from './create-dialog.component';

import * as _ from 'lodash';


@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    providers: [DataService]
})
export class EmployeesComponent implements OnInit {

    employee: Employee = new Employee();   
    employees: Employee[];                
    tableMode: boolean = true;
    sortedEmployees: Employee[];
    filteredEmployees: Employee[];
    constructor(private dataService: DataService, public dialog: MatDialog) {  }
    
    ngOnInit() {
        this.loadEmployees();    
    }
    
    loadEmployees() {
        this.dataService.getEmployees()
            .subscribe((data: Employee[]) => (
                this.employees = data,
                this.filteredEmployees = data));
    }
    
    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateDialog, {
            data: { employee: this.employee = new Employee() }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.employee = result;
                this.dataService.createEmployee(this.employee)
                    .subscribe((data: Employee) => this.employees.push(data));
            };

        });
    }

    openEditDialog(e: Employee) {
        const dialogRef = this.dialog.open(EditDialog, {
            data: { empl: _.cloneDeep(e) }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.employee = result;
                this.dataService.updateEmployee(this.employee)
                    .subscribe(data => this.loadEmployees());
            };
            
        });
    }

    openDeleteDialog(e: Employee) {
        const dialogRef = this.dialog.open(DeleteDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.delete(e);
            };
        });
    }

    delete(e: Employee) {
        this.dataService.deleteEmployee(e.id)
            .subscribe(data => this.loadEmployees());
    }

    sortEmployees(sort: Sort) {
        const data = this.employees.slice();
        if (!sort.active || sort.direction === '') {
            this.loadEmployees();
            return;
        }

        this.employees = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'department':
                    return compare(a.department, b.department, isAsc);
                case 'fullName':
                    return compare(a.fullName, b.fullName, isAsc);
                case 'dateOfBirth':
                    return compare(a.dateOfBirth, b.dateOfBirth, isAsc);
                case 'dateOfEmployment':
                    return compare(a.dateOfEmployment, b.dateOfEmployment, isAsc);
                case 'salary':
                    return compare(a.salary, b.salary, isAsc);
                default:
                    return 0;
            }
        });
    }

    filterByDepartment(filter: string) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.department.toLowerCase().includes(filter.toLowerCase()));
    }

    filterByFullName(filter: string) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.fullName.toLowerCase().includes(filter.toLowerCase()));
    }

    filterBySalary(filter: string) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.salary.toString().toLowerCase().includes(filter.toLowerCase()));
    }

    filterByDateOfBirth(filter: Date) {
        if (filter == null) {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.dateOfBirth.toString().toLowerCase().
            includes(filter.toString().toLowerCase()));
    }

    filterByDateOfEmployment(filter: Date) {
        if (filter == null) {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.dateOfEmployment.toString().toLowerCase().
            includes(filter.toString().toLowerCase()));
    }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}