'use client'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ZodTestPage = () => {
  const schema = z.object({
    name: z.string().min(2, "이름은 2글자 이상으로 적어주세요"),
    email: z.string().email("이메일 양식이 올바르지 않습니다."),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    }
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 p-4">
      <input 
        type='text' 
        {...form.register("name")}
        placeholder="이름"
        className="border p-2 rounded"
      />
      {form.formState.errors.name && (
        <p className="text-red-500">{form.formState.errors.name.message}</p>
      )}
      
      <input 
        type='text' 
        {...form.register("email")}
        placeholder="이메일"
        className="border p-2 rounded"
      />
      {form.formState.errors.email && (
        <p className="text-red-500">{form.formState.errors.email.message}</p>
      )}
      
      <button 
        type='submit'
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        제출
      </button>
    </form>
  );
}

export default ZodTestPage;