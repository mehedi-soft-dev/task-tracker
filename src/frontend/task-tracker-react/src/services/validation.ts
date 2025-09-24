export const ValidationRules = {
  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  pattern: (value: string, pattern: RegExp): boolean => {
    return pattern.test(value);
  },
};

export interface ValidationError {
  field: string;
  message: string;
}

export class Validator {
  private errors: ValidationError[] = [];

  validate(field: string, value: any, rules: Array<(value: any) => boolean | string>): this {
    for (const rule of rules) {
      const result = rule(value);
      if (result !== true) {
        this.errors.push({
          field,
          message: typeof result === 'string' ? result : `Validation failed for ${field}`,
        });
        break;
      }
    }
    return this;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  getError(field: string): string | undefined {
    const error = this.errors.find(e => e.field === field);
    return error?.message;
  }

  clear(): void {
    this.errors = [];
  }
}

// Task-specific validation
export const TaskValidation = {
  validateTitle: (title: string): string | true => {
    if (!ValidationRules.required(title)) {
      return 'Title is required';
    }
    if (!ValidationRules.minLength(title, 1)) {
      return 'Title must be at least 1 character';
    }
    if (!ValidationRules.maxLength(title, 100)) {
      return 'Title must be less than 100 characters';
    }
    return true;
  },

  validateDescription: (description: string): string | true => {
    if (!ValidationRules.maxLength(description, 500)) {
      return 'Description must be less than 500 characters';
    }
    return true;
  },
};