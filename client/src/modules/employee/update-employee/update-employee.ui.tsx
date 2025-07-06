import { Modal } from "@components/.";
import { type FC } from "react";
import { type UpdateEmployeePropsType } from "./update-employee.types";
import { employeeApi } from "../employee.api";
import type { EmployeeType } from "../employee.types";
import { EmployeeFormUi } from "../employee-form";

export const UpdateEmployeeUi: FC<UpdateEmployeePropsType> = ({
  companyId,
  isOpen,
  onClose,
  employee,
}) => {
  const handleSave = async (data: EmployeeType) => {
    if (!employee?.id) {
      return;
    }

    await employeeApi.updateEmployee(employee.id, data, companyId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактирование сотрудника">
      <EmployeeFormUi onSave={handleSave} defaultValues={employee} companyId={companyId} />
    </Modal>
  );
};
