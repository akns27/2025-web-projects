"use server"; //자동으로 API를 만들어준다 | Server Actio

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.info("서버에서 실행됨");
  return data;
};


export {getData};