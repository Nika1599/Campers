import { NavLink } from "react-router-dom";
import css from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header>
      <nav className={css.pageNav}>
        <svg className={css.logo}>
          <use href="../../../image/icons/symbol-defs.svg#Vector"></use>{" "}
        </svg>
        <ul className={css.menu}>
          <li className={css.menuLink}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${css.active} ${css.menuLink}`
                  : `${css.inactive} ${css.menuLink}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className={css.menuLink}>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? `${css.active} ${css.menuLink}`
                  : `${css.inactive} ${css.menuLink}`
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
