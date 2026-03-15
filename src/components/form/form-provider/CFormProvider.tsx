import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
};

export default function CFormProvider({ children, methods }: Props) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
