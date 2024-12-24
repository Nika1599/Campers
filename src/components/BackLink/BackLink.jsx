import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import css from "./BackLink.module.css";

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.link}>
      <FaArrowLeftLong size="24" />
      {children}
    </Link>
  );
};
