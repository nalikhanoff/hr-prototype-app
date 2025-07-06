import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';

export interface TrProps {
  className?: string;
  children?: ReactNode;
}

export const Tr: FC<TrProps> = ({ children, className }) => (
  <tr className={clsx(styles.tr, className)}>{children}</tr>
);
