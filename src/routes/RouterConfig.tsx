import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { db, auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from 'features/userSlice';
import { presenceSetup } from 'utils/Presence';
import RouteAuthGuard from './auth/RouteAuthGuard';
import Auth from 'pages/signin/Auth';
import DashboardContainer from 'pages/Dashboard/DashboardContainer';
import Contents from 'pages/view/Contents';
import UserManager from 'pages/view/UserManager';
import FtpManager from 'pages/view/FtpManager';
import KanbanBoard from 'pages/view/KanbanBoard';
import { rtdb } from "../firebase";

const RouterConfig: React.VFC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            dispatch(login({
              uid: doc.id,
              photoUrl: doc.get("photoURL"),
              displayName: doc.get("username"),
              role: doc.get("role"),
              auth: true
            }));
          })
          .then(() => {
            // authUser.getIdTokenResult().then((data) => {
            //   console.log(data.token)
            // });
            presenceSetup(authUser.uid);
            location.pathname === "/signin"
              ? navigate("/")
              : navigate(location.pathname);
          })
      } else {
        dispatch(logout());
        navigate("/", { replace: true });
        navigate("/signin");
      }
    });
    return () => {
      unSub();
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={<RouteAuthGuard redirect="/signin" component={<DashboardContainer />} rule={user.uid !== ""} />}
      >
        <Route index element={<Contents />} />
        <Route
          path="user"
          element={<RouteAuthGuard redirect="/" component={<UserManager />} rule={user.role === "admin"} />}
        />
        <Route path="ftp" element={<FtpManager />} />
        <Route path="kanban" element={<KanbanBoard />} />
      </Route>
      <Route path="signin" element={<Auth />} />
    </Routes >
  )
}

export default RouterConfig;