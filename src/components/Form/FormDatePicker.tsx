import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs'; // Import dayjs

type TDatePickerProps = {
  name: string;
  label?: string;
  defaultValue?: Date;
};

export default function FormDatePicker({
  name,
  label,
  defaultValue,
}: TDatePickerProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              id={name}
              size='large'
              style={{ width: '100%' }}
              defaultValue={defaultValue ? dayjs(defaultValue) : undefined} // Use dayjs to parse the date string
            />
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
