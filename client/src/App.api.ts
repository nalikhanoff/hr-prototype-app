import type { CompanyType } from "App.types";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

class AppApi {
  async getUser() {
    const { data } = await axios.get<CompanyType>(`${serverUrl}/company`);
    return data;
  }
}

export const appApi = new AppApi();
