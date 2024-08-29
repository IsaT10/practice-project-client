import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import { FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { semesterStatusOptions } from '../../../constans/semester';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import useSemester from '../../../hooks/useSemester';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import FormInput from '../../../components/Form/FormInput';
import { semesterRegistrationSchema } from '../../../schemas/courseManagementSchema';
import { useAddSemesterRegistrationMutation } from '../../../redux/features/admin/courseManagementApi';

export default function SemesterRegistration() {
  const { semesterOptions, sisLoading } = useSemester();
  const [AddSemesterRegistration] = useAddSemesterRegistrationMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');

    const semesterRegistrationData = {
      ...data,
      minCredits: data?.minCredits * 1,
      maxCredits: data?.maxCredits * 1,
    };

    try {
      const res = await AddSemesterRegistration(
        semesterRegistrationData
      ).unwrap();
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
          resolver={zodResolver(semesterRegistrationSchema)}
        >
          <FormSelect
            name='academicSemester'
            label='Semester'
            options={semesterOptions}
            disabled={sisLoading}
          />
          <FormSelect
            name='status'
            label='Status'
            options={semesterStatusOptions}
          />
          <FormDatePicker name='startDate' label='Start Date' />
          <FormDatePicker name='endDate' label='End Date' />

          <FormInput name='minCredits' label='Min Credits' type='text' />
          <FormInput name='maxCredits' label='Max Credits' type='text' />
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
