import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to='/login' replace={true} />;

  console.log('first');
  return children;
}
