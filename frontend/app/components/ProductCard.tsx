import type { Product } from "../products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <div className={`aspect-[5/6] ${product.color}`} aria-hidden="true" />
      <div className="mt-3 space-y-1">
        <p className="text-xs font-bold">DONGA</p>
        <h3 className="text-sm text-zinc-600 dark:text-zinc-400">{product.name}</h3>
        <p className="text-sm font-bold">
          {product.price.toLocaleString("ko-KR")}원
        </p>
      </div>
    </article>
  );
}
