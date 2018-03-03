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
    checkIfEndAfterStart: (): ValidatorFn => {
      return (group: FormGroup): {
        [key: string]: any
      } => {
        return group.controls.startTime.value < group.controls.endTime.value ?
          null : {
            checkIfEndAfterStart: {
              errorMsg: 'END_SHOULD_BE_AFTER_START'
            }
          };
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
