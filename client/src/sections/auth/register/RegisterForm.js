import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register } from '../../../api/auth';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // const RegisterSchema = Yup.object().shape({
  //   firstName: Yup.string().required('First name required'),
  //   lastName: Yup.string().required('Last name required'),
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  const defaultValues = {
    userName: 'name222',
    name: 'last222',
    password: 'pass',
  };

  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // resolver: yupResolver(RegisterSchema),
    
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    console.log("iciiii")
    const a = await register(defaultValues);
    console.log(a);
    navigate('/dashboard/app', { replace: true });    
  };
   
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" value={firstName} onChange={(e) => setName(e.target.value)} />
          <RHFTextField name="lastName" label="Last name"  />
        </Stack>

        <RHFTextField name="email" label="Email address"  onChange={(e) => setEmail(e.target.value)}/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}