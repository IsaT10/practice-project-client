import { Button, Col, Divider, Form, Input, Row } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import FormInput from '../../../components/Form/FormInput';
import { Controller, FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { bloodGroupOptions, genderOptions } from '../../../constans/user';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import { useAddAdminMutation } from '../../../redux/features/admin/userManagement.api';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';

//! this is for development
//! should be removed
const adminDefaultValues = {
  name: {
    firstName: 'Rakib',
    lastName: 'Uddin',
  },
  gender: 'male',
  designation: 'Software Engineer',
  bloodGroup: 'O+',
  // dateOfBirth: '1990-01-01',

  email: 'rakiib010@gmail.com',
  contactNo: '+1234567890',
  emergencyContactNo: '+9876543210',
  presentAddress: '123 Main Street, Anytown, CA 12345',
  permanentAddress: '456 Elm Street, Anytown, CA 12345',
};

export default function CreateAdmin() {
  const [AddAdmin] = useAddAdminMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');
    const studentData = {
      password: 'admin1234',
      admin: data,
    };
    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data?.profileImg);

    console.log(data);
    try {
      const res = await AddAdmin(formData).unwrap();

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
    <Row>
      <Col span={24}>
        <FromComp onSubmit={onSubmit} defaultValues={adminDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='name.firstName' label='First Name' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='name.middleName'
                label='Middle Name (optional)'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='name.lastName' label='Last Name' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                label='Gender'
                name='gender'
                options={genderOptions}
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              {/* <FormInput type='text' name='dateOfBirth' label='Date Of Birth' /> */}
              <FormDatePicker name='dateOfBirth' label='Date Of Birth' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                label='Blood Group'
                name='bloodGroup'
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name='profileImg'
                render={({ field: { value, onChange, ...field } }) => (
                  <Form.Item label='Photo'>
                    <Input
                      size='large'
                      type='file'
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='designation' label='Designation' />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='email' label='Email' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='contactNo' label='Contact No' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='emergencyContactNo'
                label='Emergency Contact No'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='presentAddress'
                label='Present Address'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='permanentAddress'
                label='Permanent Address'
              />
            </Col>
          </Row>

          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Row>
  );
}
