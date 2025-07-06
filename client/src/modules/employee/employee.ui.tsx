import { useState, type FC } from "react";
import { Button } from "@components/.";
import classes from "./employee.module.scss";
import { EmployeeTableUi } from "./employee-table";
import { CreateEmployee } from "./create-employee";

export const Employee: FC<{ companyId: string }> = ({ companyId }) => {
  const [refetchIdx, setRefetchIdx] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCloseCreateModal = () => {
    setRefetchIdx((prevState) => prevState + 1);
    setIsCreateModalOpen(false);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.h1}>Сотрудники</h3>
        <Button onClick={() => setIsCreateModalOpen(true)}>Создать</Button>
      </div>
      <EmployeeTableUi refetchIdx={refetchIdx} companyId={companyId} />
      <CreateEmployee
        onClose={handleCloseCreateModal}
        isOpen={isCreateModalOpen}
        companyId={companyId}
      />
    </>
  );
};
