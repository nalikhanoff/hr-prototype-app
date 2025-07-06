import type { FC, ReactElement } from 'react';
import clsx from 'clsx';
import { Tr } from './Tr.ui';
import styles from './Table.module.scss';

type TrElement = ReactElement<typeof Tr> | false;

export interface TbodyProps {
  className?: string;
  children: TrElement | Array<TrElement>;
}

export const Tbody: FC<TbodyProps> = ({ children, className }) => (
  <tbody className={clsx(styles.tbody, className)}>{children}</tbody>
);
