import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from 'antd';
import { CircleUser, LoaderCircle, LockKeyhole } from 'lucide-react';
import { authSchema } from '../../validations';
import { useMutation } from '@tanstack/react-query';
import { loginService } from '../../services/auth/auth';
import type { LoginData, User } from '../../types/common';
import { userAuthStore } from '../../store/auth/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import loginImg from '../../assets/login.jpeg';
export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(authSchema),
  });
  const login = userAuthStore((state) => state.login);
  const data = userAuthStore((state) => state.user);
  const navigate = useNavigate();
  console.log(data);

  const mutation = useMutation({
    mutationFn: loginService,
  });

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data, {
      onSuccess: (data: User) => {
        login(data);
        navigate('/');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error);
        if (error?.status === 400) toast.error('Invalid username or password');

        toast.error(`Error:${error.message}`);
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <div className=" md:flex w-1/2 items-center justify-center bg-blue-100">
        <img
          src={loginImg}
          alt="Login image"
          className=" w-full h-screen object-cover"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">W2S Solutions</h1>
            <p className="text-gray-500">Login Into Admin Panel.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Username"
                    size="large"
                    prefix={
                      <CircleUser size={20} style={{ color: '#9ca3af' }} />
                    }
                    className="w-full"
                    status={errors?.username ? 'error' : ''}
                  />
                )}
              />
              {errors?.username && (
                <p className="error">{errors?.username?.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Password"
                    size="large"
                    prefix={
                      <LockKeyhole size={20} style={{ color: '#9ca3af' }} />
                    }
                    className="w-full"
                    status={errors?.password ? 'error' : ''}
                  />
                )}
              />
              {errors?.password && (
                <p className="error">{errors?.password?.message}</p>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary hover:bg-primary/70 !font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                ''
              )}{' '}
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
