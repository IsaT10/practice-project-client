import { Button, Pagination, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React from 'react';
import { TQueryParam } from '../../../types';
import { TStudent } from '../../../types/userManagement.types';
import { useGetAllStudentQuery } from '../../../redux/features/admin/userManagement.api';
import { Link } from 'react-router-dom';

type TTableData = Pick<TStudent, 'fullName' | 'id' | 'contactNo' | 'email'>;

export default function StudentData() {
  const [params, setParams] = React.useState<TQueryParam[]>([]);
  const [page, setPage] = React.useState(1);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: 'limit', value: 2 },
    { name: 'sort', value: 'id' },
    { name: 'page', value: page },
    ...params,
  ]);

  console.log(studentData?.data);
  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, contactNo, email }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const metaData = studentData?.meta;
  const columns: TableColumnsType<TTableData> = [
    {
      //   width: '20%',
      title: 'Student ID',
      key: 'id',
      dataIndex: 'id',
    },

    {
      //   width: '20%',
      title: 'Name',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      //   width: '20%',
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      //   width: '20%',
      title: 'Contact No',
      key: 'contactNo',
      dataIndex: 'contactNo',
    },
    {
      width: '2%',
      title: 'Action',
      key: 'X',
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/students-data/edit/${item.key}`}>
              <Button>Update</Button>
            </Link>

            <Button>Block</Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParam[] = [];
    if (extra.action === 'filter') {
      filters?.name?.map((item) =>
        queryParams.push({ name: 'name', value: item })
      );
      filters?.year?.map((item) =>
        queryParams.push({ name: 'year', value: item })
      );
    }
    setParams(queryParams);
  };
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
      />
      <Pagination
        onChange={(val) => setPage(val)}
        total={metaData?.total}
        pageSize={metaData?.limit}
        current={page}
      />
    </>
  );
}
