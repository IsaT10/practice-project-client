import { Button, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import {
  useAddFacultyToCourseMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagementApi';
import { TCourse } from '../../../types/courseManagement.types';
import React from 'react';
import FromComp from '../../../components/Form/FromComp';
import FormSelect from '../../../components/Form/FormSelect';
import { useGetAllFacultyQuery } from '../../../redux/features/admin/userManagement.api';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';

type TTableData = Pick<TCourse, 'title' | 'code' | 'prefix'>;
export default function Courses() {
  const { data: courseData, isFetching } = useGetAllCoursesQuery([]);
  const tableData = courseData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code,
    prefix,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      width: '20%',

      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      width: '20%',
      title: 'Prefix',
      key: 'prefix',
      dataIndex: 'prefix',
    },
    {
      width: '20%',
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },

    {
      width: '20%',
      title: 'Action',
      key: 'X',
      render: (item) => {
        return <AssignFacultyModal courseId={item.key} />;
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}

const AssignFacultyModal = ({ courseId }: { courseId: string }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const [AddFacultyToCourse] = useAddFacultyToCourseMutation();
  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Adding...');

    const submitData = {
      courseId,
      data,
    };

    try {
      const res = await AddFacultyToCourse(submitData).unwrap();
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

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FromComp onSubmit={onSubmit}>
          <FormSelect
            name='faculties'
            label='Faculty'
            options={facultyOptions}
            mode='multiple'
          />
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Modal>
    </>
  );
};
