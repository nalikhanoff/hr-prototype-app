import { useEffect, useState, type FC, type MouseEvent } from "react";
import axios from "axios";
import { Tr, Td, Button } from "@components/.";
import type { EmployeeType, EmployeeWithCompanyType } from "../employee.types";
import { employeeApi } from "../employee.api";
import { UpdateEmployeeUi } from "../update-employee/update-employee.ui";
import classes from "./employee-table-rows.module.scss";

export const EmployeeTableRowsUi: FC<{
  companyId: string;
  refetchIdx: number;
}> = ({ companyId, refetchIdx }) => {
  const [state, setState] = useState<{
    error: string;
    data: Array<EmployeeWithCompanyType>;
    isFetching: boolean;
  }>({
    data: [],
    isFetching: false,
    error: "",
  });
  const [employeeToUpdate, setEmployeeToUpdate] = useState<
    EmployeeType | undefined
  >();

  const fetchEmployees = async (id: string) => {
    setState((prevState) => ({
      ...prevState,
      isFetching: true,
    }));
    try {
      const data = await employeeApi.getEmployees(id);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        data,
      }));
    } catch (err) {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        data: [],
        error: axios.isAxiosError(err)
          ? err.response?.data?.message || "Ошибка сервера"
          : "Ошибка сервера",
      }));
    }
  };

  const handleCloseUpdateModal = () => {
    setEmployeeToUpdate(undefined);
    fetchEmployees(companyId);
  };

  const handleDeleteEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
    const { employeeId } = e.currentTarget.dataset;

    if (!employeeId) {
      return;
    }

    if (window.confirm("Вы действительно хотите удалить данного сотрудника")) {
      try {
        await employeeApi.deleteEmployee(employeeId);
        fetchEmployees(companyId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchEmployees(companyId);
  }, [companyId, refetchIdx]);

  if (state.isFetching) {
    return (
      <Tr>
        <Td colSpan={6}>Загрузка...</Td>
      </Tr>
    );
  }

  if (state.error) {
    return (
      <Tr>
        <Td colSpan={6}>{state.error}</Td>
      </Tr>
    );
  }

  return (
    <>
      {!state.data.length ? (
        <Tr>
          <Td colSpan={6}>Данных нет</Td>
        </Tr>
      ) : (
        state.data.map((employee, employeeIdx) => (
          <Tr key={employee.id}>
            <Td>{employeeIdx + 1}</Td>
            <Td>{employee.firstName}</Td>
            <Td>{employee.lastName}</Td>
            <Td>{employee.position}</Td>
            <Td>{employee.email}</Td>
            <Td className={classes.actionColumn}>
              <Button
                variant="secondary"
                onClick={() => setEmployeeToUpdate(employee)}
                className={classes.editBtn}
                size="small"
              >
                Редактировать
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteEmployee}
                data-employee-id={employee.id}
                size="small"
              >
                Удалить
              </Button>
            </Td>
          </Tr>
        ))
      )}
      <UpdateEmployeeUi
        isOpen={!!employeeToUpdate?.id}
        onClose={handleCloseUpdateModal}
        employee={employeeToUpdate}
        companyId={companyId}
      />
    </>
  );
};
