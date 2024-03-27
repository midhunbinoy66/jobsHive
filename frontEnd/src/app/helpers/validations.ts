import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from "@angular/forms";

const formBuilder = new FormBuilder()
export function validateByTrimming(validators:ValidatorFn[]):ValidatorFn{
    
    return (control:AbstractControl)=>{
        const trimmedValue   = control.value.trim();
        const trimmedControl = formBuilder.control(trimmedValue);
        return validators.reduce<ValidationErrors | null>((error: ValidationErrors | null, validator) => error ?? validator(trimmedControl), null)
    }
}


export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const repeatPassword = control.get('repeatPassword')
  
    // console.log(repeatPassword, 'repeat password from password match validator')
  
    if ((password != null) && (repeatPassword != null)) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (repeatPassword.value === '') {
        repeatPassword.setErrors({ required: true })
        return { required: true }
      }
      if (password.value !== repeatPassword.value) {
        repeatPassword.setErrors({ passwordMismatch: true })
        return { passwordMismatch: true }
      }
    }
    repeatPassword?.setErrors(null)
    return null
  }