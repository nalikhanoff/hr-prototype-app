import { useEffect, useState } from "react";
import { Employee } from "./modules/employee";
import { appApi } from "./App.api";
import type { StateType } from "App.types";
import classes from "./App.module.scss";
import { UserUi } from "./modules/company";

function App() {
  const [user, setUser] = useState<StateType>({
    data: null,
    isFetching: false,
    error: "",
  });

  const fetchUser = async () => {
    setUser((prevState) => ({
      ...prevState,
      isFetching: true,
    }));
    try {
      const data = await appApi.getUser();
      setUser((prevState) => ({
        ...prevState,
        isFetching: false,
        data,
      }));
    } catch (err) {
      console.log(err);
      setUser((prevState) => ({
        ...prevState,
        isFetching: false,
        data: null,
        error: "Ошибка получения пользователя",
      }));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className={classes.container}>
      <UserUi data={user.data} isFetching={user.isFetching} error={user.error}>
        {!!user?.data?.id && (
          <Employee companyId={user?.data?.id} />
        )}
      </UserUi>
    </div>
  );
}

export default App;
