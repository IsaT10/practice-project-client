import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { adminSidebarItems } from '../../routes/admin.routes';
const { Header, Content, Footer, Sider } = Layout;

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
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className='demo-logo-vertical'>
          <h1
            style={{
              color: '#FFF',
              fontWeight: '600',
              textAlign: 'left',
              paddingLeft: '28px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            PH Uni
          </h1>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
