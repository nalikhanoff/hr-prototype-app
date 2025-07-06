import type { EmployeeType } from "../employee.types";

export type EmployeeFormPropsType = {
  onSave: (employee: EmployeeType) => void;
  defaultValues?: EmployeeType;
  companyId: string;
};

export type FieldName = "firstName" | "lastName" | "email" | "position";

export type FormStateType = Record<
  FieldName,
  { value: string; errorMessage: string }
>;

export const isFieldName = (name: string): name is FieldName => {
  return ["firstName", "lastName", "email", "position"].includes(name);
};
