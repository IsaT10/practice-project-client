import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
const { Header, Content } = Layout;

// const items: MenuProps['items'] = [
//   {
//     key: 'Dashboard',
//     label: <NavLink to='/admin/dashboard'>Dashboard</NavLink>,
//   },
//   {
//     key: 'User management',
//     label: 'User management',
//     children: [
//       {
//         key: 'Create admin',
//         label: <NavLink to='/admin/create-admin'>Create admin</NavLink>,
//       },
//       {
//         key: 'Create faculty',
//         label: <NavLink to='/admin/create-faculty'>Create faculty</NavLink>,
//       },
//       {
//         key: 'Create student',
//         label: <NavLink to='/admin/create-student'>Create student</NavLink>,
//       },
//     ],
//   },
// ];

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
