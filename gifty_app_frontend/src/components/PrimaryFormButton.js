export default function PrimaryFormButton({
  additionalClassNames,
  type,
  disabled,
  children,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`w-full text-center rounded-[28px] py-3 px-2 disabled:opacity-50 ${additionalClassNames}`}
    >
      {children}
    </button>
  );
}
