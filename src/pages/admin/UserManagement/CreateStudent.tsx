import { Button, Col, Divider, Form, Input, Row } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import FormInput from '../../../components/Form/FormInput';
import { Controller, FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { bloodGroupOptions, genderOptions } from '../../../constans/user';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement.api';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import useSemester from '../../../hooks/useSemester';
import useDepartment from '../../../hooks/useDepartment';

//! this is for development
//! should be removed
const studentDefaultValues = {
  name: {
    firstName: 'Rofi',
    middleName: 'Uddin',
    lastName: 'Rafi',
  },
  gender: 'male',
  // dateOfBirth: '2000-01-01',
  bloodGroup: 'B+',
  email: 'ami@gmail.com',
  contactNo: '1234567890',
  emergencyContactNo: '0987654321',
  presentAddress: '123 Main St, City, Country',
  permanentAddress: '456 Other St, City, Country',

  guardian: {
    fatherName: 'Richard Doe',
    fatherOccupation: 'Engineer',
    fatherContactNo: '1234567890',
    motherName: 'Jane Doe',
    motherOccupation: 'Doctor',
    motherContactNo: '0987654321',
  },

  localGuardian: {
    name: 'Uncle Bob',
    occupation: 'Teacher',
    contactNo: '1122334455',
    address: '789 Another St, City, Country',
  },

  // admissionSemester: '66571c00e75bc9e490d8fb84',
  // academicDepartment: '66597c5c7ada85f85fdbbd3b',
};

export default function CreateStudent() {
  const [AddStudent] = useAddStudentMutation();
  // const { data: semesterData, isLoading: sisLoading } =
  //   useGetAllSemsterQuery(undefined);

  const { semesterOptions, sisLoading } = useSemester();
  const { departmentOptions, disLoading } = useDepartment();
  // const { data: departmentData, isLoading: disLoading } =
  // useGetAllAcademicDepartmentQuery(undefined);

  // const semesterOptions = semesterData?.data?.map(
  //   (item: TAcademicSemester) => ({
  //     value: item._id,
  //     label: `${item.name} (${item.year})`,
  //   })
  // );

  // const departmentOptions = departmentData?.data?.map(
  //   (item: TAcademicDepartment) => ({ value: item._id, label: item.name })
  // );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Creating...');
    const studentData = {
      password: 'dbfjdbf4343',
      student: data,
    };
    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data?.profileImg);

    console.log(data);
    try {
      const res = await AddStudent(formData).unwrap();

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
        <FromComp onSubmit={onSubmit} defaultValues={studentDefaultValues}>
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
                      type='file'
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
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
          <Divider>Guardian Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.fatherName'
                label='Father Name'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.fatherOccupation'
                label='Father Occupation'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.fatherContactNo'
                label='Father ContactNo'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.motherName'
                label='Mother Name'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.motherOccupation'
                label='Mother Occupation'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='guardian.motherContactNo'
                label='Mother ContactNo'
              />
            </Col>
          </Row>
          <Divider>Local Guardian Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type='text' name='localGuardian.name' label='Name' />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='localGuardian.occupation'
                label='Occupation'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='localGuardian.contactNo'
                label='ContactNo'
              />
            </Col>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type='text'
                name='localGuardian.address'
                label='Address'
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={12}>
            <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                label='Admission Semester'
                name='admissionSemester'
                options={semesterOptions}
                disabled={sisLoading}
              />
            </Col>
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

// "name": {
//   "firstName": "Rofi",
//   "lastName": "Uddin"
// },
// "gender": "male",
// "dateOfBirth": "2000-01-01",
// "bloodGroup": "B+",

// "email": "rssssddaasdsdssisd@gmail.com",
// "contactNo": "1234567890",
// "emergencyContactNo": "0987654321",
// "presentAddress": "123 Main St, City, Country",
// "permanentAddress": "456 Other St, City, Country",

// "guardian": {
//   "fatherName": "Richard Doe",
//   "fatherOccupation": "Engineer",
//   "fatherContactNo": "1234567890",
//   "motherName": "Jane Doe",
//   "motherOccupation": "Doctor",
//   "motherOccupation": "0987654321"
// },

// "localGuardian": {
//   "name": "Uncle Bob",
//   "occupation": "Teacher",
//   "contactNo": "1122334455",
//   "address": "789 Another St, City, Country"
// },

// "admissionSemester":"66571c00e75bc9e490d8fb84",
// "academicDepartment":"66597c5c7ada85f85fdbbd3b",
// "profileImg": "https://example.com/image.jpg",
// "isDelete": false
// }
// }
