import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFooterComponent } from './header-footer.component';

describe('HeaderFooterComponent', () => {
  let component: HeaderFooterComponent;
  let fixture: ComponentFixture<HeaderFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderFooterComponent]
    });
    fixture = TestBed.createComponent(HeaderFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
