"use client";

import { useState, useEffect } from "react";

const About2Page = () => {
  const [ data, setData ] = useState<
    { id: number; title: string; body: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <ul className="p-4 flex flex-col gap-2">
      {data?.map((item: { id: number; title: string; body: string }) => (
        <li key={item.id} className="border rounded p-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-sm">{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default About2Page;
