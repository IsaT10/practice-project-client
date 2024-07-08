import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { decodedToken } from '../utils/decodedToken';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';

export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: 'A-0001',
      password: '12345678',
    },
  });

  const onSubmit = async (data) => {
    const res = await login(data).unwrap();
    const token = res.data.accessToken;
    const user = decodedToken(token);
    dispatch(setUser({ user, token }));
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='id'>ID:</label>
        <input type='text' id='id' {...register('id')} />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='text' id='password' {...register('password')} />
      </div>

      <Button htmlType='submit'>Send</Button>
    </form>
  );
}
