import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CustomerForm from "./components/CustomerForm";
import { products } from "./products";

export default function Home() {
  return (
    <div className="flex-1 bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <section>
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-lg font-bold">추천 상품</h2>
            <span className="text-xs text-zinc-500">{products.length}개</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section className="mt-20 border-t border-black pt-10 dark:border-white">
          <div className="mx-auto max-w-md">
            <h2 className="text-lg font-bold">고객 등록</h2>
            <p className="mt-1 mb-6 text-sm text-zinc-500">
              새 상품 소식을 가장 먼저 받아보세요.
            </p>
            <CustomerForm />
          </div>
        </section>
      </main>
    </div>
  );
}
