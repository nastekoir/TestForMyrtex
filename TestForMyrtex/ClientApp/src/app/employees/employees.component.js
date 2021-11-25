var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import { DeleteDialog } from './delete-dialog.component';
import { EditDialog } from './edit-dialog.component';
import { CreateDialog } from './create-dialog.component';
import * as _ from 'lodash';
let EmployeesComponent = class EmployeesComponent {
    constructor(dataService, dialog) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.employee = new Employee();
        this.tableMode = true;
    }
    ngOnInit() {
        this.loadEmployees();
    }
    loadEmployees() {
        this.dataService.getEmployees()
            .subscribe((data) => (this.employees = data,
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
                    .subscribe((data) => this.employees.push(data));
            }
            ;
        });
    }
    openEditDialog(e) {
        const dialogRef = this.dialog.open(EditDialog, {
            data: { empl: _.cloneDeep(e) }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.employee = result;
                this.dataService.updateEmployee(this.employee)
                    .subscribe(data => this.loadEmployees());
            }
            ;
        });
    }
    openDeleteDialog(e) {
        const dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.delete(e);
            }
            ;
        });
    }
    delete(e) {
        this.dataService.deleteEmployee(e.id)
            .subscribe(data => this.loadEmployees());
    }
    sortEmployees(sort) {
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
    filterByDepartment(filter) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.department.toLowerCase().includes(filter.toLowerCase()));
    }
    filterByFullName(filter) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.fullName.toLowerCase().includes(filter.toLowerCase()));
    }
    filterBySalary(filter) {
        if (filter == "") {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.salary.toString().toLowerCase().includes(filter.toLowerCase()));
    }
    filterByDateOfBirth(filter) {
        if (filter == null) {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.dateOfBirth.toString().toLowerCase().
            includes(filter.toString().toLowerCase()));
    }
    filterByDateOfEmployment(filter) {
        if (filter == null) {
            this.employees = this.filteredEmployees;
        }
        this.employees = this.filteredEmployees.filter(e => e.dateOfEmployment.toString().toLowerCase().
            includes(filter.toString().toLowerCase()));
    }
};
EmployeesComponent = __decorate([
    Component({
        selector: 'employees',
        templateUrl: './employees.component.html',
        providers: [DataService]
    })
], EmployeesComponent);
export { EmployeesComponent };
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
//# sourceMappingURL=employees.component.js.map