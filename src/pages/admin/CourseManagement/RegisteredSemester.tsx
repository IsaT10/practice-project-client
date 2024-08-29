import { Button, Dropdown, Table, Tag } from 'antd';
import type { MenuProps, TableColumnsType } from 'antd';
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterStatusMutation,
} from '../../../redux/features/admin/courseManagementApi';
import { TRegisteredSemester } from '../../../types/courseManagement.types';
import dayjs from 'dayjs'; // Import dayjs
import React from 'react';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';

type TTableData = Pick<TRegisteredSemester, 'startDate' | 'endDate' | 'status'>;
export default function RegisteredSemester() {
  const [semesterId, setSemesterId] = React.useState('');
  const { data: registeredSemesterData, isFetching } =
    useGetAllRegisteredSemestersQuery([]);

  const [UpdateSemesterStatus] = useUpdateSemesterStatusMutation();

  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester?.name} (${academicSemester?.year})`,
      startDate: dayjs(startDate).format('MMMM'),
      endDate: dayjs(endDate).format('MMMM'),
      status,
    })
  );
  const items: MenuProps['items'] = [
    {
      label: 'Upcoming',
      key: 'UPCOMING',
    },
    {
      label: 'Ongoing',
      key: 'ONGOING',
    },

    {
      label: 'Ended',
      key: 'ENDED',
    },
  ];

  const handleStatusUpdate = async (data) => {
    const toastId = toast.loading('Updating status...');
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    console.log(updateData);

    try {
      const res = await UpdateSemesterStatus(updateData).unwrap();
      toast.success(res?.message, { id: toastId });
    } catch (error) {
      const typedError = error as TErrorResponse;

      if (typedError?.data?.message) {
        toast.error(typedError.data.message, { id: toastId });
      } else {
        toast.error('Something went very wrong', { id: toastId });
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      width: '20%',

      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      width: '20%',
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (item) => {
        let color;

        if (item === 'UPCOMING') {
          color = 'blue';
        } else if (item === 'ONGOING') {
          color = 'green';
        } else {
          color = 'red';
        }
        return <Tag style={{ color }}>{item}</Tag>;
      },
    },
    {
      width: '20%',
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      width: '20%',
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
    },

    {
      width: '20%',
      title: 'Action',
      key: 'X',
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
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
