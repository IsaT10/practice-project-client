import { Form } from 'antd';
import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

type TFromDefaultValues = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFromDefaultValues;

export default function FromComp({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TFormProps) {
  const formConfig: TFromDefaultValues = {};
  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout='vertical' onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
