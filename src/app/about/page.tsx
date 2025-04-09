"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";

const AboutPage = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["about"], //전역으로 캐시되는 키
    queryFn: () =>
      //데이터를 가져오는 함수 -> 전역으로 전달됨
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((res: { id: number; title: string; body: string }[]) =>
          _.shuffle(res)
        ),
  });

  //isLoading은 최초 데이터 패칭 시 true, 새로고침 시 계속 로딩 나옴
  //isPending은 캐시된 데이터말고 데이터가 패칭 중일 때, 
  //isFetching은 데이터가 패칭 중일때, 할 때마다 상태값이 바뀜
  if (isPending) return <div>Loading...</div>;
  return (
    <ul className="p-4 flex flex-col gap-2">
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["about"] })}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
      >
        새로고침
      </button>
      {data?.map((item: { id: number; title: string; body: string }) => (
        <li key={item.id} className="border rounded p-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-sm">{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default AboutPage;
