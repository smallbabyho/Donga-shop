export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
};

export const products: Product[] = [
  { id: "hoodie", name: "동아고 후드티", price: 35000, color: "bg-slate-700" },
  { id: "tumbler", name: "텀블러", price: 15000, color: "bg-stone-300" },
  { id: "ecobag", name: "에코백", price: 12000, color: "bg-amber-100" },
];
