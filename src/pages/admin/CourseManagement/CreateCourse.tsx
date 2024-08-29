import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import { FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import FormInput from '../../../components/Form/FormInput';
import { createCourseSchema } from '../../../schemas/courseManagementSchema';
import {
  useAddCoursesMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagementApi';

export default function CreateCourse() {
  const [AddCourses] = useAddCoursesMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCourseOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');

    const courseData = {
      ...data,
      code: data?.code * 1,
      credits: data?.credits * 1,
      preRequisiteCourses: data?.preRequisiteCourses?.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
    };

    try {
      const res = await AddCourses(courseData).unwrap();
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
    <Flex justify='center' align='center'>
      <Col span={7}>
        <FromComp
          onSubmit={onSubmit}
          resolver={zodResolver(createCourseSchema)}
        >
          <FormInput name='title' label='Title' type='text' />
          <FormInput name='prefix' label='Prefix' type='text' />
          <FormInput name='code' label='Code' type='text' />
          <FormInput name='credits' label='Credits' type='text' />

          <FormSelect
            mode='multiple'
            name='preRequisiteCourses'
            label='Pre Requisite Courses'
            options={preRequisiteCourseOptions}
          />

          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
