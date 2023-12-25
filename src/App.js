import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './navigation/PrivateRoute';
import DashboardIndex from './pages/Dashboard/Index';
import HomeIndex from './pages/Home/Index';
import { useDispatch, useSelector } from 'react-redux';
import './styles/style.css';
import { loadUser } from './redux/Auth/Auth.action';
import { getCategoryList } from './redux/Category/Category.action';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toaster from './components/Toaster/Toaster';
import FullSpinner from './components/common/Spinner/FullSpinner';
import { fetchSiteSetting } from './redux/Setting/Action';
import ModalContainer from './components/Modal/ModalContainer';
import { fetchUserNotifications } from './components/NavNotification/redux/Action';
import { pusherBind } from './components/NavNotification/pusherBind';
import UseModal from './components/common/modal/useModal';
import { fetchChatList } from './components/chat/redux/Action';
import ScrollToTop from './utils/scrollToTop';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchSiteSetting());
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    auth?.user?.id && pusherBind(auth?.user?.id, auth?.token);
    auth?.user?.id && dispatch(fetchUserNotifications());
    auth?.user?.id && dispatch(fetchChatList());
  }, [auth?.user]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          {auth.isAuthenticated || auth.token ? (
            <PrivateRoute path="/">
              <DashboardIndex />
            </PrivateRoute>
          ) : (
            <Route path="/">
              <HomeIndex />
            </Route>
          )}
        </Switch>
        <ModalContainer />
        <UseModal />
      </Router>
      <Toaster />
      <FullSpinner />
    </>
  );
}

export default App;
