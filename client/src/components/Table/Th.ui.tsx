import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';

export interface ThProps {
  className?: string;
  colSpan?: number;
  children?: ReactNode;
}

export const Th: FC<ThProps> = ({ children, className, colSpan }) => (
  <th className={clsx(styles.th, className)} colSpan={colSpan}>
    <span className={styles.text}>
      {children}
    </span>
  </th>
);
