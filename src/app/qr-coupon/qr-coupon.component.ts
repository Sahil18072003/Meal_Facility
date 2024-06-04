import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CouponService } from '../services/coupon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-coupon',
  templateUrl: './qr-coupon.component.html',
  styleUrls: ['./qr-coupon.component.css'],
})
export class QrCouponComponent implements OnDestroy {
  qrForm!: FormGroup;
  isFormVisible = true;
  qrCodeDownloadeLink = '';
  SafeValue = '';
  public qrdata: string = '';
  public userId: any;
  showQRCode: boolean = false;
  showBtn: boolean = true;
  isExpired: boolean = false;
  expirationTimeout: any;
  secondsLeft: number = 0;
  expirationInterval: any;
  uniqueId: number | null = null;
  isButtonDisabled: boolean = false;
  remainingTime: number = 0;
  private timer: any;

  constructor(
    public dialogRef: MatDialogRef<QrCouponComponent>,
    private auth: AuthService,
    private couponService: CouponService,
    private snackBar: MatSnackBar
  ) {}

  closeForm() {
    this.dialogRef.close();
  }

  onChange(url: SafeValue) {
    // this.qrCodeDownloadeLink = url;
  }

  ngOnDestroy() {
    clearInterval(this.expirationInterval);
  }

  onClick() {
    const user = this.auth.getUser();
    if (user) {
      this.uniqueId = parseInt(user.id, 10);
      console.log(this.uniqueId);
      this.couponService.createCoupon(this.uniqueId).subscribe((res) => {
        console.log(res);
        this.qrdata = res.coupon.couponCode;
        console.log(this.qrdata);
        this.userId = res.coupon.userId;
        console.log(this.userId);
        this.showQRCode = true;
        this.showBtn = false;
        console.log(res.coupon.expirationTime);
        console.log(res.coupon.createdTime);

        const currentTime = new Date().getTime();
        const expirationTime = new Date(res.coupon.expirationTime).getTime();
        const expirationDuration = expirationTime - currentTime;

        // Set the expiration timer
        this.setExpirationTimer(expirationDuration);

        // Calculate seconds left instead of minutes
        this.secondsLeft = Math.ceil(expirationDuration / 1000);

        this.expirationInterval = setInterval(() => {
          this.secondsLeft--;
          if (this.secondsLeft <= 0) {
            clearInterval(this.expirationInterval);
            this.isExpired = true;
            this.dialogRef.close();

            this.snackBar.open('QR Code has expired', 'Okay', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['error-snackbar'],
            });
          }
        }, 1000);
      });
    }
  }

  setExpirationTimer(duration: number) {
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }
    this.expirationTimeout = setTimeout(() => {
      this.showQRCode = false;
      this.isExpired = true;

      this.snackBar.open('QR Code has expired', 'Okay', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }, duration);
  }
}
