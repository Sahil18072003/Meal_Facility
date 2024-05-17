import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCouponComponent } from './qr-coupon.component';

describe('QrCouponComponent', () => {
  let component: QrCouponComponent;
  let fixture: ComponentFixture<QrCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCouponComponent]
    });
    fixture = TestBed.createComponent(QrCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
