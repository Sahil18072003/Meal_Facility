import { FormGroup, FormControl } from '@angular/forms';

export default class ValidateForm {
  static validdateAllFromFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.validdateAllFromFileds(control);
      }
    });
  }
}
