import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
/**
 * @author Nermeen Mattar
 * A class that has all the custom validators needed in forms.
 * @class CustomValidators
 */
export class FieldValidatorsService {
  constructor() {}

  /**
   * @author Nermeen Mattar
   * @description An object where the key is the validator name and the value is the validator function. A validator function does certain
   * checks on each change in the attached form control. Based on the checks the validator function either returns null (if no error), or an
   * object with the error info.
   * @private
   */
  private validatorsFunctions = {
    validatePositive: (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = Number(control.value);
        return !isNaN(controlValue) && controlValue >= 0 ?
          null : { validatePositive: { value: control.value } };
      };
    },
    validateSecondGreaterThanFirst: (specs): ValidatorFn => {
      return (group: FormGroup): {
        [key: string]: any
      } => {
        const value1 =  group.controls[specs.field1].value;
        const value2 =  group.controls[specs.field2].value;
        const bothAreSet = ((value1 || value1 === 0) && (value2 || value2 === 0 ));
        return bothAreSet && value1 > value2 ?
        {
          validateSecondGreaterThanFirst: 'error'
        } : null;
      };
    },
    validateEqual: (specs): ValidatorFn => {
      return (group: FormGroup): {
        [key: string]: any
      } => {
        const value1 =  group.controls[specs.field1].value;
        const value2 =  group.controls[specs.field2].value;
        const bothAreSet = value1 && value2;
        return bothAreSet && (group.controls[specs.field1].value !== group.controls[specs.field2].value) ?
        {
          validateEqual: 'error'
        } : null;
      };
    },
    validatePassword: (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } => {
        const passRegExp = /^(?=.*\d)(?=.*([a-z]|[A-Z]))[0-9a-zA-Z]{8,}$/;
        const controlValue = control.value;
        return controlValue.match(passRegExp) ?
          null : { validatePassword: { invalid: true } };
      };
    },
  };
  /**
   * @author Nermeen Mattar
   * @description The only function exposed to other classes, used to attach a custom validator to any form control.
   * @example customValidators.getValidator(maxNumOfDecimalPlaces, 2) returns a validator which checks on each change that value does not
   * contain for than two decimal places, e.g. 2.399 returns an error in this case.
   * @param {string} validatorName
   * @param {any} specifications
   * @returns {ValidatorFn}
   */
  public getValidator(validatorName: string, specifications ? ): ValidatorFn {
    if (typeof this.validatorsFunctions[validatorName] === 'function') {
      return this.validatorsFunctions[validatorName](specifications);
    }
  }
}
