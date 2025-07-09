import { useState, ChangeEvent, FocusEvent } from 'react';

export type ValidatorFn = (
  value: string,
  allValues?: Record<string, string>
) => string | null;

export interface FieldConfig {
  initial: string;
  required?: boolean;
  validators?: ValidatorFn[];
}

export type FormConfig<FieldNames extends string> = Record<
  FieldNames,
  FieldConfig
>;

export function useForm<FieldNames extends string>(
  formConfig: FormConfig<FieldNames>
) {
  const [formValues, setFormValues] = useState<Record<FieldNames, string>>(
    () => {
      const initial: Record<FieldNames, string> = {} as any;
      (Object.keys(formConfig) as FieldNames[]).forEach((field) => {
        initial[field] = formConfig[field].initial;
      });
      return initial;
    }
  );

  const [formErrors, setFormErrors] = useState<Record<FieldNames, string>>(
    () => {
      const initial: Record<FieldNames, string> = {} as any;
      (Object.keys(formConfig) as FieldNames[]).forEach((field) => {
        initial[field] = '';
      });
      return initial;
    }
  );

  const validateField = (fieldName: FieldNames): boolean => {
    const value = formValues[fieldName];
    const { required, validators } = formConfig[fieldName];

    const validatorsToRun: ValidatorFn[] = [];
    if (required) {
      validatorsToRun.push((v) =>
        v ? null : 'This field is required.'
      );
    }
    if (validators) {
      validatorsToRun.push(...validators);
    }

    for (const validator of validatorsToRun) {
      const errorMessage = validator(value, formValues);
      if (errorMessage) {
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: errorMessage,
        }));
        return false;
      }
    }

    setFormErrors((prev) => ({ ...prev, [fieldName]: '' }));
    return true;
  };

  const validateForm = (): boolean => {
    let allValid = true;
    (Object.keys(formConfig) as FieldNames[]).forEach((field) => {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    return allValid;
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target as any as {
      name: FieldNames;
      value: string;
    };
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const field = (event.target as any).name as FieldNames;
    validateField(field);
  };

  return {
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateField,
    validateForm,
  };
}
