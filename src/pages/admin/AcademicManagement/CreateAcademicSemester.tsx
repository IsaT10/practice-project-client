import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import { FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { nameOptions, yearOptions } from '../../../constans/semester';
import { monthOptions } from '../../../constans/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagementSchema';
import { useCreateAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';

export default function CreateAcademicSemester() {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');
    const name = nameOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = await createAcademicSemester(semesterData).unwrap();
      console.log(res);
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FormSelect name='name' label='Session' options={nameOptions} />
          <FormSelect name='year' label='Year' options={yearOptions} />
          <FormSelect
            name='startMonth'
            label='Start Month'
            options={monthOptions}
          />
          <FormSelect
            name='endMonth'
            label='End Month'
            options={monthOptions}
          />
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
