import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState
} from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import axios from 'axios';
import UsersTable from '../components/users/UsersTable';
import PropTypes from 'prop-types';

const UserContext = createContext({})
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const pageNumber = params.get('p')
  const sortableColumn = params.get('s')
  const searchQuery = params.get('q')

  const [users, setUsers] = useState({ loaded: false, loading: true })

  useEffect(() => {
    axios
      .get('/api/v1/users', { params: { page: pageNumber, sort: sortableColumn, search: searchQuery } })
      .then((response) => {
        const data = response.data
        setUsers({
          loading: false,
          ...(data
            ? {
                loaded: true,
                data: data
              }
            : { loaded: false })
        })
      })
      .catch((e) => {
        setUsers({
          loading: false,
          loaded: false,
          error: e.message
        })
      })
  }, [pageNumber, sortableColumn, searchQuery, setUsers])

  if (users.loading) {
    return <Fragment />
  }

  if (!users.loaded && users.error) {
    console.log(users.error)
  }

  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
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
  )
}

export default AppRouter
