import { Button, Input } from "@components/.";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { BasicValidator } from "../../../utils/basic-validator.utils";
import {
  type EmployeeFormPropsType,
  type FormStateType,
  isFieldName,
} from "./employee-form.types";
import type { EmployeeType } from "../employee.types";
import { employeeApi } from "../employee.api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmployeeFormUi: FC<EmployeeFormPropsType> = ({
  onSave,
  defaultValues,
  companyId,
}) => {
  const [existingEmployees, setExistingEmployees] = useState<
    Array<EmployeeType>
  >([]);
  const [formState, setFormState] = useState<FormStateType>({
    firstName: {
      value: defaultValues?.firstName || "",
      errorMessage: "",
    },
    lastName: {
      value: defaultValues?.lastName || "",
      errorMessage: "",
    },
    email: {
      value: defaultValues?.email || "",
      errorMessage: "",
    },
    position: {
      value: defaultValues?.position || "",
      errorMessage: "",
    },
  });

  const fetchEmployees = async (id: string) => {
    try {
      const data = await employeeApi.getEmployees(id);
      setExistingEmployees(data);
    } catch (err) {
      console.error(err);
      setExistingEmployees([]);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!isFieldName(name)) {
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        value,
        errorMessage: "",
      },
    }));
  };

  const handleValidate = () => {
    const validator = new BasicValidator(
      Object.fromEntries(
        Object.entries(formState).map(([key, value]) => [key, value.value])
      )
    );

    const uniqueEmails = existingEmployees.reduce((acc, employee) => {
      if (defaultValues?.id && employee.id === defaultValues?.id) {
        return acc;
      }

      return [...acc, employee.email];
    }, [] as Array<string>);

    Object.keys(formState).forEach((key) => {
      validator.mustBePresent(key, "Поле не может быть пустым");
    });
    validator.mustMatchRegex("email", emailRegex, "Email адрес неверный");
    validator.mustBeUnique("email", uniqueEmails, "Не уникальный email");

    if (!validator.isValid()) {
      const errors = validator.getErrors();
      const formStateWithErrors = Object.entries(formState).reduce(
        (acc, [key, fieldData]) => {
          if (!isFieldName(key)) return acc;

          return {
            ...acc,
            [key]: {
              ...fieldData,
              errorMessage: errors[key] || "",
            },
          };
        },
        {} as FormStateType
      );

      setFormState(formStateWithErrors);
    }

    return validator.isValid();
  };

  const handleSave = async () => {
    const isValid = handleValidate();

    if (!isValid) {
      return;
    }

    try {
      onSave(
        Object.fromEntries(
          Object.entries(formState).map(([key, value]) => [key, value.value])
        ) as EmployeeType
      );

      const emptyFormState = Object.keys(formState).reduce((acc, key) => {
        if (!isFieldName(key)) return acc;

        return {
          ...acc,
          [key]: {
            value: "",
            errorMessage: "",
          },
        };
      }, {} as FormStateType);
      setFormState(emptyFormState);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees(companyId);
  }, [companyId]);

  return (
    <>
      <Input
        name="firstName"
        value={formState.firstName.value}
        onChange={handleChangeInput}
        label="Имя"
        error={formState.firstName.errorMessage}
      />
      <Input
        name="lastName"
        value={formState.lastName.value}
        onChange={handleChangeInput}
        label="Фамилия"
        error={formState.lastName.errorMessage}
      />
      <Input
        name="position"
        value={formState.position.value}
        onChange={handleChangeInput}
        label="Должность"
        error={formState.position.errorMessage}
      />
      <Input
        name="email"
        value={formState.email.value}
        onChange={handleChangeInput}
        label="Email"
        error={formState.email.errorMessage}
      />
      <Button onClick={handleSave}>Сохранить</Button>
    </>
  );
};
