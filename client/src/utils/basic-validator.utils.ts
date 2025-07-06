export class BasicValidator {
  fields: Record<string, unknown>;
  errors: Record<string, string>;
  rteRegex: RegExp;

  constructor(fields: Record<string, unknown>) {
    this.fields = fields;
    this.errors = {};
    this.rteRegex = /<[^>]+>/g;
  }

  getErrors() {
    return this.errors;
  }

  mustBePresent(fieldName: string, errorMessage: string | null = null) {
    if (this.fields[fieldName] || this.fields[fieldName] === 0) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Field can't be empty";
  }

  mustBeNotNull(fieldName: string, errorMessage = null) {
    if (this.fields[fieldName] !== null) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Field can't be empty";
  }

  mustBeNonEmptyArray(fieldName: string, errorMessage = null) {
    if (Array.isArray(this.fields[fieldName]) && this.fields[fieldName].length) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Field can't be empty";
  }

  mustBeUnique(fieldName: string, array: Array<string>, errorMessage: string | null = null) {
    if (typeof this.fields[fieldName] === 'string' && !array.includes(this.fields[fieldName])) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Field must be unique";
  }

  mustBeLargerThan(fieldName: string, largerThan: number) {
    if (typeof this.fields[fieldName] === 'number' && this.fields[fieldName] > largerThan) {
      return;
    }
    this.errors[fieldName] = `Value can't be less than ${largerThan}`;
  }

  mustBeLargerOrEqualTo(fieldName: string, largerThan: number) {
    if (typeof this.fields[fieldName] === 'number' && this.fields[fieldName] >= largerThan) {
      return;
    }
    this.errors[fieldName] = `Value can't be less than ${largerThan}`;
  }

  mustBeLessThanOrEqualTo(fieldName: string, lessThan: number) {
    if (typeof this.fields[fieldName] === 'number' && this.fields[fieldName] <= lessThan) {
      return;
    }
    this.errors[fieldName] = `Value can't be more than ${lessThan}`;
  }

  mustBeNilOrPositive(fieldName: string, errorMessage = null) {
    if (typeof this.fields[fieldName] === 'number' && this.fields[fieldName] >= 0) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Value can't be less than 0";
  }

  mustBeInteger(fieldName: string, errorMessage = null) {
    if (Number.isInteger(Number(this.fields[fieldName]))) {
      return;
    }
    this.errors[fieldName] = errorMessage ?? "Value must be an integer";
  }

  mustMatchRegex(fieldName: string, regex: string | RegExp, errorMessage: string) {
    if (String(this.fields[fieldName]).match(regex)) {
      return;
    }
    this.errors[fieldName] = errorMessage;
  }

  isValid() {
    return Object.keys(this.errors).length < 1;
  }
}
