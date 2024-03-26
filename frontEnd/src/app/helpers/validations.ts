import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from "@angular/forms";

const formBuilder = new FormBuilder()
export function validateByTrimming(validators:ValidatorFn[]):ValidatorFn{
    
    return (control:AbstractControl)=>{
        const trimmedValue   = control.value.trim();
        const trimmedControl = formBuilder.control(trimmedValue);
        return validators.reduce<ValidationErrors | null>((error: ValidationErrors | null, validator) => error ?? validator(trimmedControl), null)
    }
}