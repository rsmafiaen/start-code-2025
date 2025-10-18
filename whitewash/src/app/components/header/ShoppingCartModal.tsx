import Link from "next/link";

export const ShoppingCartModal = () => {
  const isEmpty = true;

  return (
    <div className="p-5 absolute right-2 top-[110px] bg-rema-blue rounded-2xl flex flex-col">
      <div>Din handleliste</div>
      <div>{isEmpty ? <span>Tom!</span> : <div>Innhold</div>}</div>
    </div>
  );
};
