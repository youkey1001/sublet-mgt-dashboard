import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';

type Props = {
  redirect: string;
  component: JSX.Element;
  rule: boolean;
}

const RouteAuthGuard: React.VFC<Props> = (props) => {
  const user = useSelector(selectUser);
  const { redirect, component, rule } = props;

  if (rule && user.auth) {

    return <>{component}</>
  } else if (!rule && user.auth) {

    return <Navigate to={redirect} state={false} replace={false} />
  }

  return <></>
}

export default RouteAuthGuard;