import { Button, Col, Flex } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import FormInput from '../../../components/Form/FormInput';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import { academicFacultySchema } from '../../../schemas/academicManagementSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAcademicFacultyMutation } from '../../../redux/features/admin/academicManagement.api';
import { FieldValues } from 'react-hook-form';

export default function CreateAcademicFaculty() {
  const [CreateAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');

    try {
      const res = await CreateAcademicFaculty(data).unwrap();
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <FormInput type='text' name='name' label={'Name'} />
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Flex>
  );
}
