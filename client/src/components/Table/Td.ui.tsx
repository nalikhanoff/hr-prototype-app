import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';

export interface TdProps {
  className?: string;
  colSpan?: number;
  children?: ReactNode;
}

export const Td: FC<TdProps> = ({ children, className, colSpan }) => (
  <td className={clsx(styles.td, className)} colSpan={colSpan}>
    <span className={styles.text}>
      {children}
    </span>
  </td>
);
