import { type FC } from "react";
import { Table, Thead, Th, Tbody } from "@components/.";
import { EmployeeTableRowsUi } from "./employee-table-rows.ui";
import classes from './employee-table.module.scss';

export const EmployeeTableUi: FC<{ companyId: string; refetchIdx: number }> = ({
  companyId,
  refetchIdx,
}) => {
  return (
    <div className={classes.tableWrapper}>
      <Table>
        <Thead>
          <Th># п/п</Th>
          <Th>Имя</Th>
          <Th>Фамилия</Th>
          <Th>Должность</Th>
          <Th>Email</Th>
          <Th />
        </Thead>
        <Tbody>
          <EmployeeTableRowsUi companyId={companyId} refetchIdx={refetchIdx} />
        </Tbody>
      </Table>
    </div>
  );
};
