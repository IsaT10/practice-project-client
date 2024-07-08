import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/CreateAdmin';
import CreateFaculty from '../pages/admin/CreateFaculty';

export const studentPaths = [
  { name: 'Dashboard', path: 'dashboard', element: <AdminDashboard /> },
  {
    name: 'User management',
    children: [
      { name: 'Create admin', path: 'create-admin', element: <CreateAdmin /> },
      {
        name: 'Create faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
    ],
  },
];
