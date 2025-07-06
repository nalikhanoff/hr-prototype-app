import axios from "axios";
import type { EmployeeType, EmployeeWithCompanyType } from "./employee.types";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

type ResponseType = { isSuccess: boolean };

class EmployeeApi {
  async getEmployees(companyId: string) {
    const { data } = await axios.get<Array<EmployeeWithCompanyType>>(
      `${serverUrl}/employee`,
      {
        headers: {
          "x-company-id": companyId,
        },
      }
    );
    return data;
  }

  async createEmployee(employee: EmployeeType, companyId: string) {
    const { data } = await axios.post<ResponseType>(
      `${serverUrl}/employee`,
      employee,
      {
        headers: {
          "x-company-id": companyId,
        },
      }
    );

    return data;
  }

  async updateEmployee(id: string, employee: EmployeeType, companyId: string) {
    const { data } = await axios.put<ResponseType>(
      `${serverUrl}/employee/${id}`,
      employee,
      {
        headers: {
          "x-company-id": companyId,
        },
      }
    );
    return data;
  }

  async deleteEmployee(id: string) {
    const { data } = await axios.delete<ResponseType>(
      `${serverUrl}/employee/${id}`
    );
    return data;
  }
}

export const employeeApi = new EmployeeApi();
