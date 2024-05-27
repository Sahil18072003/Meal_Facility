import { FormGroup } from "@angular/forms";

export function confirmpasswordvalidator(
  controlName: string,
  matchControlName: string
) {
  return (formGroup: FormGroup) => {
    const passwordcontrol = formGroup.controls[controlName];
    const confirmpasswordcontrol = formGroup.controls[matchControlName];

    if (
      confirmpasswordcontrol.errors &&
      confirmpasswordcontrol.errors["confirmpasswordvalidator"]
    ) {
      return;
    }
    if (passwordcontrol.value !== confirmpasswordcontrol.value) {
      confirmpasswordcontrol.setErrors({ confirmpasswordvalidator: true });
    } else {
      confirmpasswordcontrol.setErrors(null);
    }
  };
}
