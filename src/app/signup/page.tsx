"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/db/SignUpSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { FormValues } from "@/types/signup";
import { useSignupMutation } from "@/services/mutations";

export default function SignUpPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      birthdate: "",
      address: "",
      hobbies: "",
      introduction: "",
    },
  });

  const { mutate } = useSignupMutation();

  const onSubmit = (data: FormValues) => {
    mutate(data);
    reset();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                전화번호
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                성별
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">-- 선택 --</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </select>
                )}
              />
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                생년월일
              </label>
              <Controller
                name="birthdate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.birthdate && (
                <p className="mt-2 text-sm text-red-600">{errors.birthdate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
                취미
              </label>
              <Controller
                name="hobbies"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.hobbies && (
                <p className="mt-2 text-sm text-red-600">{errors.hobbies.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
                자기소개
              </label>
              <Controller
                name="introduction"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              />
              {errors.introduction && (
                <p className="mt-2 text-sm text-red-600">{errors.introduction.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
