import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicDepartmentSchema } from '../../../schemas/academicManagementSchema';
import FormInput from '../../../components/Form/FormInput';
import { useCreateAcademicDepartmentMutation } from '../../../redux/features/admin/academicManagement.api';
import FormSelect from '../../../components/Form/FormSelect';
import useFaculty from '../../../hooks/useFaculty';

export default function CreateAcademicDepartment() {
  const { academicFacultyOptions, fisLoading } = useFaculty();

  const [CreateAcademicFaculty] = useCreateAcademicDepartmentMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = await CreateAcademicFaculty(departmentData).unwrap();
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
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <FormInput type='text' name='name' label={'Name'} />
          <FormSelect
            name='academicFaculty'
            label='Academic Faculty'
            options={academicFacultyOptions}
            disabled={fisLoading}
          />
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
