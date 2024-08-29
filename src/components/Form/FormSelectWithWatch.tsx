import { Form, Select } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type TSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: 'multiple' | undefined;
  onValueChange?: Dispatch<SetStateAction<string>>;
};

const FormSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  React.useEffect(() => {
    onValueChange?.(inputValue);
  }, [inputValue, onValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
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
};

export default FormSelectWithWatch;
