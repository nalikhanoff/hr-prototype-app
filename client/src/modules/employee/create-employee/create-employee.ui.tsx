import { Modal } from "@components/.";
import { type FC } from "react";
import { type CreateEmployeePropsType } from "./create-employee.types";
import { employeeApi } from "../employee.api";
import type { EmployeeType } from "../employee.types";
import { EmployeeFormUi } from "../employee-form";

export const CreateEmployee: FC<CreateEmployeePropsType> = ({
  companyId,
  isOpen,
  onClose,
}) => {
  const handleSave = async (employee: EmployeeType) => {
    await employeeApi.createEmployee(employee, companyId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Создание сотрудника">
      <EmployeeFormUi onSave={handleSave} companyId={companyId} />
    </Modal>
  );
};
