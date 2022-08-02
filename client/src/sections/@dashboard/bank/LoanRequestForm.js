import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import {borrow} from '../../../api/bank';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function LoanRequestForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    lenderNumAccount: "",
    amount: "",
  })

  const methods = useForm({
    mode: onchange,
  });

  

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    await borrow(formState)
    navigate('/dashboard/app', { replace: true });
  };

  const handleChange = (e) =>
  setFormState({
    ...formState,
    [e.target.name]: e.target.value,
  })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="lenderNumAccount" label="Num account of the lender" value={formState.lenderNumAccount} onChange={handleChange} required/>
        <RHFTextField name="amount" label="Amount to borrow" value={formState.amount} onChange={handleChange} required/>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Borrow
        </LoadingButton>
        
      </Stack>

      
    </FormProvider>
  );
}