import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersTable from "../components/UsersTable";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <UsersTable />
      </Route>
    </Switch>
  );
}

export default AppRouter;