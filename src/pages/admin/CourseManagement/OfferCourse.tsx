import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import { FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagementSchema';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import FormSelectWithWatch from '../../../components/Form/FormSelectWithWatch';
import FormInput from '../../../components/Form/FormInput';
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseWithFacultyMutation,
} from '../../../redux/features/admin/courseManagementApi';
import useDepartment from '../../../hooks/useDepartment';
import useFaculty from '../../../hooks/useFaculty';
import React from 'react';
import { TFaculty } from '../../../types/userManagement.types';
import { dayOptions } from '../../../constans/global';

export default function OfferCourse() {
  const [courseId, setCourseId] = React.useState('');
  const { data: registeredSemesterData, isLoading: sregistrationLoading } =
    useGetAllRegisteredSemestersQuery([{ name: 'sort', value: 'id' }]);

  const registerSemesterOptions = registeredSemesterData?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.academicSemester.name} (${item.academicSemester.year})`,
    };
  });

  const [getCourseWithFaculty, { data: courseWithFaculty, isLoading }] =
    useGetCourseWithFacultyMutation();

  console.log(courseWithFaculty);
  React.useEffect(() => {
    if (courseId) {
      getCourseWithFaculty(courseId);
    }
  }, [courseId]);

  const facultyOptions = courseWithFaculty?.data?.faculties?.map(
    (item: TFaculty) => ({
      value: item._id,
      label: `${item.name.firstName} ${item.name.middleName || ''} ${
        item.name.lastName
      }`,
    })
  );

  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const courseOptions = courseData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const { departmentOptions, disLoading } = useDepartment();
  const { academicFacultyOptions, fisLoading } = useFaculty();

  const onSubmit = async (data: FieldValues) => {
    // const toastId = toast.loading('Creating...');

    console.log(data);
    // const submitData = {

    // };

    // try {
    //   const res = await createAcademicSemester(semesterData).unwrap();
    //   toast.success(res?.message, { id: toastId });
    // } catch (error) {
    //   const typedError = error as TErrorResponse;

    //   if (typedError?.data?.message) {
    //     toast.error(typedError.data.message, { id: toastId });
    //   } else {
    //     toast.error('Something went very wrong', { id: toastId });
    //   }
    // }
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={7}>
        <FromComp
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FormSelect
            name='semesterRegistration'
            label='Academic Semester'
            options={registerSemesterOptions}
            disabled={sregistrationLoading}
          />
          <FormSelect
            name='academicDepartment'
            label='Academic Department'
            options={departmentOptions}
            disabled={disLoading}
          />
          <FormSelect
            name='academicFaculty'
            label='Academic Faculty'
            options={academicFacultyOptions}
            disabled={fisLoading}
          />
          <FormSelectWithWatch
            name='course'
            label='Course'
            options={courseOptions}
            onValueChange={setCourseId}
          />

          <FormSelect
            name='faculty'
            label='Faculty'
            options={facultyOptions}
            disabled={!courseId || isLoading}
          />

          <FormInput type='text' name='maxCapacity' label='Student Capacity' />
          <FormInput type='text' name='section' label='Section' />

          <FormSelect
            name='days'
            label='Days'
            options={dayOptions}
            mode='multiple'
          />
          <FormInput type='text' name='name' label='Name' />

          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
