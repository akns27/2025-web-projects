"use client"
import { getData } from "@/action/getData";
import Modal from "@/components/Modal";
import { useRef, useEffect, useState } from "react";

//모달로 전달할 데이터 타입
type ModalData = {
  title: string;
}

export default function Home() {
  // const modalRef = useRef<HTMLDivElement>(null);
  // const [data, setData] = useState([]);
  const modalRef = useRef<ModalRef<ModalData>>(null);
  // useEffect(() => {
  //   getData().then((data) => {
  //     setData(data);
  //   });
  // }, []);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.innerText = "hello";
    }
  }, []);

  return (
    <ul className="flex flex-col gap-4 p4">
      {/* {data.map((item: any) => (
        <li key={item.id} className="p-4 border border-gray-300 rounded-md">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-gray-500">{item.body}</p>
        </li>
      ))} */}
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => {
        if (modalRef.current) {
          modalRef.current.open({
            title: "hello",
          });
        }
      }}>
        모달 열기
      </button>
      <Modal ref={modalRef} >{(data) => {
        return <h2>{data.title}</h2>
      }}</Modal>
    </ul>
  );
}
