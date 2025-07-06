import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import styles from "./Table.module.scss";

export interface TableProps {
  className?: string;
  children: ReactNode;
}

export const Table: FC<TableProps> = ({ className, children }) => (
  <table className={clsx(styles.table, className)} border={0}>
    {children}
  </table>
);
