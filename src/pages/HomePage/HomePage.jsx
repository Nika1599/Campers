import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const viewNow = () => {
    navigate("/catalog");
  };

  return (
    <div>
      <h1>Campers of your dreams</h1>
      <p>You can find everything you want in our catalog</p>
      <button onClick={viewNow}>View now</button>
    </div>
  );
};
export default HomePage;
