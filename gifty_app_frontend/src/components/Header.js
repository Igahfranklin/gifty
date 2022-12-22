export default function Header({ children }) {
  return (
    <div className="absolute top-0 flex justify-center gap-10 w-full bg-header py-5">
      <h1 className="font-bold text-[20px] text-center text-white text-bold capitalize">
        {children}
      </h1>
    </div>
  );
}
