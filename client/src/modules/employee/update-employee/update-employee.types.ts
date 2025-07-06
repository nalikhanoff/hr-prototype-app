import type { EmployeeType } from "../employee.types";

export type UpdateEmployeePropsType = {
  companyId: string;
  isOpen: boolean;
  onClose: () => void;
  employee?: EmployeeType;
};
