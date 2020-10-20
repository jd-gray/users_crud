import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";
import UsersTable from "../components/UsersTable";

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = params.get("p");

  const [users, setUsers] = useState({});

  useEffect(() => {
    axios
      .get("/api/v1/users", { params: { page: pageNumber } })
      .then((response) => {
        const data = response.data;
        setUsers({
          loading: false,
          ...(data
            ? {
                loaded: true,
                users: data.users,
                previousPage: data.previous_page,
                nextPage: data.next_page,
                totalPages: data.total_pages,
              }
            : { loaded: false }),
        });
      })
      .catch((e) => {
        setUsers({
          loading: false,
          loaded: false,
          error: e.message,
        });
      });
  }, [pageNumber]);

  if (users.loading) {
    return <Fragment />;
  }

  if (!users.loaded && users.error) {
    console.log(users.error);
  }

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};

const AppRouter = () => {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/">
          <UsersTable />
        </Route>
      </Switch>
    </UserProvider>
  );
};

export default AppRouter;
