import React, { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

//모달을 컨트롤할 함수들을 정의
//외부에서 컨트롤하니 타입을 exprot해서 import가능하도록

export type ModalRef<T> = {
  close: () => void;
  open: (data: T) => void;
};

//모달 컴포넌트의 타입
type Props<T> = {
  children: (data: T) => React.ReactNode;
};

const Modal = forwardRef<ModalRef<any>, Props<any>>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const[data, setData] = useState<T>();
  
  
  //모달 컴포넌트의 함수들을 정의
  useImperativeHandle(ref, () => ({
    close: () => {
      setIsOpen(false);
    },
    open: (data: T) => {
      setIsOpen(true);
      setData(data);
    },
  }));
  if(!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="bg-white p-4 rounded-md relative z-10">{data && children(data)}</div>
    </div>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;
