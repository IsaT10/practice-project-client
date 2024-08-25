import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { decodedToken } from '../utils/decodedToken';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../types';
import FromComp from '../components/Form/FromComp';
import FormInput from '../components/Form/FormInput';

export default function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const defaultValues = {
    id: 'A-0001',
    password: '12345678',
  };

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: 'A-0001',
  //     password: '12345678',
  //   },
  // });

  const onSubmit = async (data: FieldValues) => {
    const sonnerId = toast.loading('loging in...');
    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const user = decodedToken(token) as TUser;
      dispatch(setUser({ user, token }));
      toast.success('Logged in.', { id: sonnerId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error('Something went wrong!', { id: sonnerId });
    }
  };
  return (
    <Row align={'middle'} justify={'center'} style={{ height: '100vh' }}>
      <FromComp onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormInput type={'text'} name={'id'} label={'ID:'} />
        <FormInput type={'text'} name={'password'} label={'Password:'} />
        <Button htmlType='submit'>Send</Button>
      </FromComp>
    </Row>
  );
}
