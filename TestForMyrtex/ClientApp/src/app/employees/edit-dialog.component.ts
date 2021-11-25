import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';

export interface DialogData {
    empl: Employee
}

@Component({
    selector: 'edit-dialog',
    templateUrl: './edit-dialog.component.html',
})

export class EditDialog {
    constructor(
        public dialogRef: MatDialogRef<EditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}