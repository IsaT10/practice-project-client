import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useGetAllSemsterQuery } from '../../../redux/features/admin/academicManagement.api';
import { TAcademicSemester } from '../../../types/academicManagement.types';
import React from 'react';
import { TQueryParam } from '../../../types';

type TTableData = Pick<
  TAcademicSemester,
  'name' | 'endMonth' | 'startMonth' | 'year'
>;
export default function AcademicSemester() {
  const [params, setParams] = React.useState<TQueryParam[] | undefined>([]);
  const { data: semesterData, isFetching } = useGetAllSemsterQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      width: '20%',

      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text: 'Summer',
          value: 'Summer',
        },
        {
          text: 'Fall',
          value: 'Fall',
        },
      ],
    },
    {
      width: '20%',
      title: 'Year',
      key: 'year',
      dataIndex: 'year',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: '2024',
          value: '2024',
        },
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2026',
        },
      ],
    },
    {
      width: '20%',
      title: 'Start Month',
      key: 'startMonth',
      dataIndex: 'startMonth',
    },
    {
      width: '20%',
      title: 'End Month',
      key: 'endMonth',
      dataIndex: 'endMonth',
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}
