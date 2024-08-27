import { Button, Col, Divider, Form, Input, Row } from 'antd';
import FromComp from '../../../components/Form/FromComp';
import FormInput from '../../../components/Form/FormInput';
import { Controller, FieldValues } from 'react-hook-form';
import FormSelect from '../../../components/Form/FormSelect';
import { bloodGroupOptions, genderOptions } from '../../../constans/user';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import {
  TAcademicDepartment,
  TAcademicSemester,
} from '../../../types/academicManagement.types';
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemsterQuery,
} from '../../../redux/features/admin/academicManagement.api';
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from '../../../redux/features/admin/userManagement.api';
import { toast } from 'sonner';
import { TErrorResponse } from '../../../types';
import { useParams } from 'react-router-dom';

export default function StudentUpdate() {
  const { studentId } = useParams();
  const { data, isFetching } = useGetSingleStudentQuery(studentId);

  console.log(data?.data?.academicDepartment?._id);
  const obj = {
    name: {
      firstName: data?.data?.name.firstName,
      middleName: data?.data?.name.middleName || '',
      lastName: data?.data?.name.lastName,
      // middleName can be added if available
    },
    gender: data?.data?.gender,
    // dateOfBirth is omitted as requested
    bloodGroup: data?.data?.bloodGroup,
    email: data?.data?.email,
    contactNo: data?.data?.contactNo,
    emergencyContactNo: data?.data?.emergencyContactNo,
    presentAddress: data?.data?.presentAddress,
    permanentAddress: data?.data?.permanentAddress,
    guardian: {
      fatherName: data?.data?.guardian.fatherName,
      fatherOccupation: data?.data?.guardian.fatherOccupation,
      fatherContactNo: data?.data?.guardian.fatherContactNo,
      motherName: data?.data?.guardian.motherName,
      motherOccupation: data?.data?.guardian.motherOccupation,
      motherContactNo: data?.data?.guardian.motherContactNo,
    },
    localGuardian: {
      name: data?.data?.localGuardian.name,
      occupation: data?.data?.localGuardian.occupation,
      contactNo: data?.data?.localGuardian.contactNo,
      address: data?.data?.localGuardian.address,
    },
    admissionSemester: data?.data?.admissionSemester?._id,
    academicDepartment: data?.data?.academicDepartment?._id,
  };

  const [updateStudent] = useUpdateStudentMutation();
  const { data: semesterData, isLoading: sisLoading } =
    useGetAllSemsterQuery(undefined);
  const { data: departmentData, isLoading: disLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = semesterData?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} (${item.year})`,
    })
  );

  const departmentOptions = departmentData?.data?.map(
    (item: TAcademicDepartment) => ({ value: item._id, label: item.name })
  );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Updating...');
    const studentData = {
      student: data,
    };

    console.log(studentData);
    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));
    // formData.append('file', data?.profileImg);

    console.log(Object.fromEntries(formData));
    try {
      const res = await updateStudent({
        id: studentId,
        data: formData,
      }).unwrap();
      console.log(res);

      toast.success(res?.message, { id: toastId });
    } catch (error) {
      const typedError = error as TErrorResponse;

      console.log(error);
      if (typedError?.data?.message) {
        toast.error(typedError.data.message, { id: toastId });
      } else {
        toast.error('Something went very wrong', { id: toastId });
      }
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <Row>
      <Col span={24}>
        <FromComp onSubmit={onSubmit} defaultValues={obj}>
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
              <FormDatePicker
                name='dateOfBirth'
                label='Date Of Birth'
                defaultValue={data?.data?.dateOfBirth}
              />
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
