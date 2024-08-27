import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const FormSelect = ({ label, name, options, disabled }: TSelectProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: { error } }) => (
      <Form.Item label={label}>
        <Select
          style={{ width: '100%' }}
          {...field}
          options={options}
          size='large'
          disabled={disabled}
        />
        {error && <small style={{ color: 'red' }}>{error.message}</small>}
      </Form.Item>
    )}
  />
);

export default FormSelect;
