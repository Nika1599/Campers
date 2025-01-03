import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const viewNow = () => {
    navigate("/catalog");
  };

  return (
    <div className={css.container}>
      <main>
        <section className={css.heroSection}>
          <h1 className={css.mainTitle}>Campers of your dreams</h1>
          <p className={css.mainText}>
            You can find everything you want in our catalog
          </p>
          <button type="button" className={css.viewNowButton} onClick={viewNow}>
            View now
          </button>
        </section>
      </main>
    </div>
  );
};
export default HomePage;
