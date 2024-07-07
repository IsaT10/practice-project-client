import { Layout, Menu, MenuProps } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  { key: '1', label: 'Dashboard' },
  { key: '2', label: 'Home' },
  {
    key: '3',
    label: 'Admin',
    children: [
      { key: '1', label: 'Dashboard' },
      { key: '2', label: 'Dashboard' },
    ],
  },
];

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
          items={items}
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
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
