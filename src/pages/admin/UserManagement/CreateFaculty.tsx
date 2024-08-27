import { Button, Col, Divider, Form, Input, Row } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import FormInput from '../../../components/Form/FormInput';
import { Controller, FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { bloodGroupOptions, genderOptions } from '../../../constans/user';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import { TAcademicDepartment } from '../../../types/academicManagement.types';
import { useGetAllAcademicDepartmentQuery } from '../../../redux/features/admin/academicManagement.api';
import { useAddFacultyMutation } from '../../../redux/features/admin/userManagement.api';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';

//! this is for development
//! should be removed
const facultyDefaultValues = {
  name: {
    firstName: 'Upendro',
    lastName: 'Jogi',
  },
  gender: 'male',
  // dateOfBirth: '1980-01-01',
  designation: 'lecturer',
  bloodGroup: 'O+',

  email: 'jogi@gmail.com',
  contactNo: '+1234567890',
  emergencyContactNo: '+0987654321',
  presentAddress: '123 Main St, Springfield, IL 62701',
  permanentAddress: '456 Elm St, Springfield, IL 62702',

  academicDepartment: '66597c5c7ada85f85fdbbd3b',
};

export default function CreateFaculty() {
  const [AddFaculty] = useAddFacultyMutation();
  const { data: departmentData, isLoading: disLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const departmentOptions = departmentData?.data?.map(
    (item: TAcademicDepartment) => ({ value: item._id, label: item.name })
  );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');
    const studentData = {
      password: 'dbfjdbf4343',
      faculty: data,
    };
    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data?.profileImg);

    console.log(data);
    try {
      const res = await AddFaculty(formData).unwrap();

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
        <FromComp onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
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

          <Divider>Academic Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                label='Academic Department'
                name='academicDepartment'
                options={departmentOptions}
                disabled={disLoading}
              />
            </Col>
          </Row>
          <Button htmlType='submit'>Send</Button>
        </FromComp>
      </Col>
    </Row>
  );
}
