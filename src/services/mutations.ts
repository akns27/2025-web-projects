import { FormValues } from "@/types/signup";
import { useMutation } from "@tanstack/react-query";

async function registerUser(data: FormValues) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response.json();
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: FormValues) => registerUser(data),
    onSuccess: () => {
      alert("회원가입 완료!");
    },
    onError: () => {
      alert("회원가입 실패");
    },
  });
};
