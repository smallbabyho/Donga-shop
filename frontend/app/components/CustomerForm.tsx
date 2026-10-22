"use client";

import { useState, type FormEvent } from "react";
import { products } from "../products";

type Customer = {
  name: string;
  email: string;
  productId: string;
};

const inputClass =
  "mt-1.5 h-11 w-full border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-black dark:focus:border-white";

export default function CustomerForm() {
  const [submitted, setSubmitted] = useState<Customer | null>(null);

  // 서버 연동 전이라 입력값을 화면에만 보여준다.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted({
      name: String(data.get("name")),
      email: String(data.get("email")),
      productId: String(data.get("productId")),
    });
  }

  const productName = products.find((p) => p.id === submitted?.productId)?.name;

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs font-bold">이름</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="block">
          <span className="text-xs font-bold">이메일</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block">
          <span className="text-xs font-bold">관심 상품</span>
          <select name="productId" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              선택하세요
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="h-12 w-full bg-black text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          등록하기
        </button>
      </form>

      {submitted && (
        <div className="mt-6 border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-bold">등록된 정보</p>
          <dl className="mt-3 grid grid-cols-[5rem_1fr] gap-y-1.5">
            <dt className="text-zinc-500">이름</dt>
            <dd>{submitted.name}</dd>
            <dt className="text-zinc-500">이메일</dt>
            <dd>{submitted.email}</dd>
            <dt className="text-zinc-500">관심 상품</dt>
            <dd>{productName}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}
