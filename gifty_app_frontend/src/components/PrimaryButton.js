import { Link } from "react-router-dom";

const PrimaryButton = ({ additionalClassNames, to, children }) => {
  return (
    <Link to={to}>
      <button
        className={`w-full block text-center rounded-[28px] py-3 px-2 ${additionalClassNames}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default PrimaryButton;
