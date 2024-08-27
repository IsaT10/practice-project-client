import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/UserManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/UserManagement/CreateFaculty';

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
