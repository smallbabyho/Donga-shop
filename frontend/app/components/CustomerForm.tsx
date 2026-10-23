"use client";

import { useEffect, useState, type FormEvent } from "react";
import { products } from "../products";

type Customer = {
  id: number;
  name: string;
  email: string;
  product: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const inputClass =
  "mt-1.5 h-11 w-full border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-black dark:focus:border-white";

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_URL}/customers`);
  if (!res.ok) throw new Error(`고객 목록을 불러오지 못했습니다. (${res.status})`);
  return res.json();
}

export default function CustomerForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function loadCustomers() {
    return fetchCustomers()
      .then(setCustomers)
      .catch((e) =>
        setError(
          e instanceof TypeError
            ? "서버에 연결할 수 없습니다."
            : e instanceof Error
              ? e.message
              : "고객 목록을 불러오지 못했습니다.",
        ),
      );
  }

  // 화면이 열릴 때 목록을 불러온다.
  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .catch(() => setError("고객 목록을 불러오지 못했습니다. 서버가 켜져 있는지 확인하세요."));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setMessage(null);
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name")),
          email: String(data.get("email")),
          product: String(data.get("product")),
        }),
      });
      if (!res.ok) throw new Error(`등록에 실패했습니다. (${res.status})`);

      setMessage("등록되었습니다!");
      form.reset();
      await loadCustomers();
    } catch (e) {
      setError(
        e instanceof TypeError
          ? "서버에 연결할 수 없습니다."
          : e instanceof Error
            ? e.message
            : "등록에 실패했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

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
          <select name="product" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              선택하세요
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-full bg-black text-sm font-bold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {submitting ? "등록 중..." : "등록하기"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm font-bold text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm font-bold text-red-600">{error}</p>}

      <div className="mt-8">
        <p className="text-sm font-bold">등록된 고객 ({customers.length})</p>
        {customers.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">아직 등록된 고객이 없습니다.</p>
        ) : (
          <ul className="mt-3 divide-y divide-zinc-200 border border-zinc-200 text-sm dark:divide-zinc-800 dark:border-zinc-800">
            {customers.map((c) => (
              <li key={c.id} className="grid grid-cols-[5rem_1fr_auto] gap-2 p-3">
                <span className="font-bold">{c.name}</span>
                <span className="truncate text-zinc-500">{c.email}</span>
                <span>{c.product}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
