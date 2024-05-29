import { FormGroup } from '@angular/forms';

export function confirmpasswordvalidator(
  controlName: string,
  matchControlName: string
) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchControlName];

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['confirmpasswordvalidator']
    ) {
      // Return if another validator has already found an error on the confirmPasswordControl
      return;
    }

    // Set error on confirmPasswordControl if validation fails
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmpasswordvalidator: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
