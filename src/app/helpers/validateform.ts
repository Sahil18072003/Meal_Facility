import { FormGroup, FormControl } from '@angular/forms';

export default class ValidateForm {
  static validdateAllFromFileds(loginForm: FormGroup<any>) {
    throw new Error('Method not implemented.');
  }
  private validdateAllFromFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validdateAllFromFileds(control);
      }
    });
  }
}
