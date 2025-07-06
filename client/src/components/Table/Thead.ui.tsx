import type { FC, ReactElement } from 'react';
import clsx from 'clsx';
import { Th } from './Th.ui';
import styles from './Table.module.scss';

export interface TheadProps {
  className?: string;
  children: ReactElement<typeof Th>[];
}

export const Thead: FC<TheadProps> = ({ children, className }) => (
  <thead className={clsx(styles.thead, className)}>
    <tr>{children}</tr>
  </thead>
);
