import { TAcademicDepartment } from '../../../types/academicManagement.types';
import { useGetAllAcademicDepartmentQuery } from '../../../redux/features/admin/academicManagement.api';
import { Button, Table, TableColumnsType } from 'antd';

type TTableData = Pick<TAcademicDepartment, 'name'>;

export default function AcademicDepartment() {
  const { data: facultyData, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const tableData = facultyData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Department Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Academic Faculty',
      key: 'academicFaculty',
      dataIndex: 'academicFaculty',
    },
    {
      width: '20%',
      title: 'Action',
      key: 'X',
      render: () => {
        return (
          <div>
            <Button>Update</Button>
            <Button>Delete</Button>
          </div>
        );
      },
    },
  ];
  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   console.log(filters, extra);
  //   const queryParams: TQueryParam[] = [];
  //   if (extra.action === 'filter') {
  //     filters?.name?.map((item) =>
  //       queryParams.push({ name: 'name', value: item })
  //     );
  //     filters?.year?.map((item) =>
  //       queryParams.push({ name: 'year', value: item })
  //     );
  //   }
  //   setParams(queryParams);
  // };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}
