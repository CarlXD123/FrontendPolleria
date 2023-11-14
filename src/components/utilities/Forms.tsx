type ValidatorObject = {
  value: string;
  isRequired?: boolean;
  isEmail?: boolean;
  minLength?: number;
};

type ValidationResult = {
  errors?: {
    [key: string]: string[];
  };
};

class Form {
  /**
   * Validate Email
   * @param str 
   * @returns boolean
   */
  static validEmail(str: string): boolean {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(str);
  }

  /**
   * Minimum length of string
   * @param str 
   * @param length 
   * @returns 
   */
  static minLength(str: string, length: number): boolean {
    return str.length < length;
  }

  /**
   * Form Validator
   * @param  obj 
   * @returns 
   */
  static validator(obj: { [key: string]: ValidatorObject }): ValidationResult {
    const keys = Object.entries(obj);
    const results: { [key: string]: string[] }[] = [];
    let validations: ValidationResult = {};

    keys.forEach((key) => {
      const fieldName = key[0];
      const fieldProperties = key[1];

      if (fieldProperties.isRequired && fieldProperties.value.length === 0) {
        results.push({ [fieldName]: [`The ${fieldName} is required.`] });
      } else {
        if (fieldProperties.isEmail && !this.validEmail(fieldProperties.value)) {
          results.push({ [fieldName]: [`The ${fieldName} must be a valid email.`] });
        }

        if (
          fieldProperties.minLength &&
          this.minLength(fieldProperties.value, fieldProperties.minLength)
        ) {
          results.push({
            [fieldName]: [`The ${fieldName} must be at least ${fieldProperties.minLength} characters.`],
          });
        }
      }
      return results;
    });

    const mergedResults = Object.assign({}, ...results);

    if (Object.keys(mergedResults).length > 0) {
      validations = { errors: mergedResults };
    } else {
      validations = {};
    }

    return validations;
  }
}

export default Form;
