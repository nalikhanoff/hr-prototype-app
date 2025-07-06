import { type FC, type ReactNode } from "react";
import type { StateType } from "App.types";

export const UserUi: FC<StateType & { children?: ReactNode }> = ({
  children,
  isFetching,
  error,
}) => {
  if (isFetching) {
    return "Загрузка...";
  }

  if (error) {
    return error;
  }

  return <>{children}</>;
};
