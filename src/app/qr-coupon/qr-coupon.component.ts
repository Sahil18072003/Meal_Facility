import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-coupon',
  templateUrl: './qr-coupon.component.html',
  styleUrls: ['./qr-coupon.component.css'],
})
export class QrCouponComponent {
  qrForm!: FormGroup;
  isFormVisible = true;

  constructor(public dialogRef: MatDialogRef<QrCouponComponent>) {}

  closeForm() {
    this.dialogRef.close();
  }
}
