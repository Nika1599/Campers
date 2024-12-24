import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const CamperDetails = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Дізнаємось, звідки прийшов користувач

  const handleBackToCatalog = () => {
    // Якщо є state з попередньою сторінкою, повертаємо назад, інакше на /catalog
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/catalog");
    }
  };

  return (
    <div>
      <FaArrowLeftLong size="24" />
      <button onClick={handleBackToCatalog} type="button">
        Back to Catalog
      </button>
    </div>
  );
};

export default CamperDetails;
