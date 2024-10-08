import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { useAppSelector } from '../../redux/hooks';
const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
};
export default function Sidebar() {
  const { user } = useAppSelector((state) => state.auth);

  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, 'admin');
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, 'faculty');
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, 'student');
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      style={{ height: '100vh', position: 'sticky', top: 0, left: 0 }}
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
        items={sidebarItems}
      />
    </Sider>
  );
}
