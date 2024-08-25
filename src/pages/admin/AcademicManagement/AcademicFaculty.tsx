import { Button, Table, TableColumnsType } from 'antd';
import { useGetAllAcademicFacultyQuery } from '../../../redux/features/admin/academicManagement.api';

type TTableData = { name: string };

export default function AcademicFaculty() {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Faculty Name',
      key: 'name',
      dataIndex: 'name',
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
