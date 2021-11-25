import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Employee } from '../employee';

export interface DialogData {
    employee: Employee
}

@Component({
    selector: 'create-dialog',
    templateUrl: './create-dialog.component.html',
})

export class CreateDialog {
    constructor(
        public dialogRef: MatDialogRef<CreateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}