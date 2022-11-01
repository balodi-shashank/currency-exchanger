import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    message: string;
    title: string;
}
  
@Component({
template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
    {{data.message}}
    </div>
    <div mat-dialog-actions>
        <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
    </button>
    <button mat-raised-button color="primary" (click)="onYesClick()" cdkFocusInitial>
        Ok
    </button>
    </div>
`
})

export class ConfirmationDialogComponent {
constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
) { }

onNoClick(): void {
    this.dialogRef.close(false);
}

onYesClick(): void {
    this.dialogRef.close(true);
}
}