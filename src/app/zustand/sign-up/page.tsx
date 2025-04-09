"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "zustand";

// 회원가입 상태를 관리할 스토어 정의
interface SignUpStore {
  formData: {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    birthDate: string;
    address: string;
    hobbies: string[];
    bio: string;
  };
  setFormData: (data: Partial<SignUpStore["formData"]>) => void;
  resetForm: () => void;
}

// Zustand 스토어 생성
const useSignUpStore = create<SignUpStore>((set) => ({
  formData: {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    birthDate: "",
    address: "",
    hobbies: [],
    bio: "",
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () =>
    set({
      formData: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male",
        birthDate: "",
        address: "",
        hobbies: [],
        bio: "",
      },
    }),
}));

const SignUpPage = () => {
  // Zustand 스토어 사용
  const { formData, setFormData, resetForm } = useSignUpStore();

  const schema = z
    .object({
      name: z.string().min(2, "이름은 2글자 이상으로 입력해주세요"),
      phone: z
        .string()
        .regex(
          /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
          "올바른 전화번호 형식이 아닙니다"
        ),
      //^ : 문자열의 시작, $: 문자열의 끝
      email: z.string().email("올바른 이메일 형식이 아닙니다"),
      password: z
        .string()
        .min(8, "비밀번호는 8자 이상이어야 합니다")
        .regex(/[A-Z]/, "영어 대문자를 포함해야 합니다")
        .regex(/[a-z]/, "영어 소문자를 포함해야 합니다")
        .regex(/[0-9]/, "숫자를 포함해야 합니다"),
      confirmPassword: z.string(),
      gender: z.enum(["male", "female", "other"], {
        required_error: "성별을 선택해주세요",
      }),
      birthDate: z.string().refine((date) => {
        //.refine() : 추가적인 사용자 정의 유효성 검사를 적용시 사용, 기본 타입 검사(문자열인지)이후 더 복잡한 조건을 검사할 수 있음
        const d = new Date(date); //date 입력 값(문자)를 숫자로 변경
        return !isNaN(d.getTime()); //getTime시 Date 객체의 시간 값을 밀리초로 반환, 유효한 날짜 형식이 아니면 Not a Number 반환
      }, "올바른 날짜를 입력해주세요"), //유효한 날짜가 아닐 시 오류 메시지 반환

      address: z.string().min(5, "주소를 입력해주세요"),
      hobbies: z.array(z.string()).min(1, "취미를 하나 이상 선택해주세요"),
      bio: z.string().min(10, "자기소개는 10자 이상 입력해주세요"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다",
      path: ["confirmPassword"], //오류 메시지를 표시할 필드
    });
    
//폼 유효성 검사
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formData, // Zustand 스토어의 초기값 사용
  });

  // 폼 값이 변경될 때마다 Zustand 스토어 업데이트
  const handleChange = (field: keyof SignUpStore["formData"], value: any) => {
    setFormData({ [field]: value });
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    // resetForm(); // 폼 초기화가 필요한 경우에 사용
  };

  //form.register("@")란? @이라는 이름을 가진 입력 필드를 ReactHookForm의 상태 관리 시스템에 등록함
  //{...form.register("password")}는 입력 필드와 폼을 자동으로 연결해주는 역할을 함
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      <div>
        <input
          type="text"
          {...form.register("name", {
            onChange: (e) => handleChange("name", e.target.value),
          })}
          placeholder="이름"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="tel"
          {...form.register("phone", {
            onChange: (e) => handleChange("phone", e.target.value),
          })}
          placeholder="전화번호 (000-0000-0000)"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          {...form.register("email", {
            onChange: (e) => handleChange("email", e.target.value),
          })}
          placeholder="이메일"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...form.register("password", {
            onChange: (e) => handleChange("password", e.target.value),
          })}
          placeholder="비밀번호"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...form.register("confirmPassword", {
            onChange: (e) => handleChange("confirmPassword", e.target.value),
          })}
          placeholder="비밀번호 확인"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <select
          {...form.register("gender", {
            onChange: (e) => handleChange("gender", e.target.value),
          })}
          className="w-full border p-2 rounded"
        >
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
        {form.formState.errors.gender && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.gender.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="date"
          {...form.register("birthDate", {
            onChange: (e) => handleChange("birthDate", e.target.value),
          })}
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.birthDate && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.birthDate.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          {...form.register("address", {
            onChange: (e) => handleChange("address", e.target.value),
          })}
          placeholder="주소"
          className="w-full border p-2 rounded"
        />
        {form.formState.errors.address && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.address.message}
          </p>
        )}
      </div>

      <div>
        <select
          multiple //취미를 여러개 선택할 수 있도록 함
          {...form.register("hobbies", {
            onChange: (e) =>
              handleChange(
                "hobbies",
                Array.from(e.target.selectedOptions, (option) => option.value)
              ),
          })}
          className="w-full border p-2 rounded"
        >
          <option value="reading">독서</option>
          <option value="viewing">스포츠 관람</option>
          <option value="sports">운동</option>
          <option value="music">음악</option>
          <option value="travel">여행</option>
          <option value="cooking">요리</option>
        </select>
        {form.formState.errors.hobbies && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.hobbies.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          {...form.register("bio", {
            onChange: (e) => handleChange("bio", e.target.value),
          })}
          placeholder="자기소개"
          className="w-full border p-2 rounded h-32"
        />
        {form.formState.errors.bio && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.bio.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
