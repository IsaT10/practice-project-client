import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import Login from '../pages/Login';
import { routesGenerator } from '../utils/routesGenerator';
import { adminPaths } from './admin.routes';
import { studentPaths } from './student.routes';
import { facultyPaths } from './faculty.routes';
import ProtectedRoutes from '../components/layout/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: '/student',
    element: <App />,
    children: routesGenerator(studentPaths),
  },
  {
    path: '/faculty',
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
