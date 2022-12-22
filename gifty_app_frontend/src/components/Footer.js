import { Link } from "react-router-dom";
import { urls } from "../utils/urls";

export default function Footer({ children }) {
  return (
    <div className="bg-primary_faded">
      <div className="my-container  flex flex-col md:flex-row justify-between items-center gap-3 text-danger">
        <p>Copyright © 2022 Salistech Limited.</p>
        <div className="flex gap-5">
          <Link to={urls.home}>Home</Link>|
          <Link to={urls.terms}>Terms</Link>|
          <Link to={urls.privacy}>Privacy</Link>
        </div>
      </div>
    </div>
  );
}
