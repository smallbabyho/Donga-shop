export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <span className="text-xl font-black tracking-tighter">DONGA SHOP</span>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-2xl font-bold tracking-tight">동아고등학교 쇼핑몰</h1>
          <p className="mt-2 text-sm text-zinc-400">
            동아고 학생과 동문을 위한 공식 굿즈를 만나보세요.
          </p>
        </div>
      </div>
    </header>
  );
}
