import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchCamperById } from "../../redux/campers/operations";
import ImageGallery from "react-image-gallery";
import css from "./CatalogDetails.module.css";

const CamperDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("features");

  const { selectedCamper, isLoading, error } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCamperById(id));
  }, [id, dispatch]);

  const handleBackToCatalog = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/catalog");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const images = selectedCamper?.gallery.map((image) => ({
    thumbnail: image.thumb,
  }));

  return (
    <div>
      <FaArrowLeftLong size="24" />
      <button onClick={handleBackToCatalog} type="button">
        Back to Catalog
      </button>
      {selectedCamper !== null && (
        <div>
          <h1>{selectedCamper.name}</h1>
          <p>
            ⭐ {selectedCamper.rating} ({selectedCamper.reviews.length} reviews)
          </p>
          <p> {selectedCamper.location}</p>
          <p> €{parseFloat(selectedCamper.price).toFixed(2)}</p>
          <ImageGallery items={images} className={css.imageGallery} />
          <p>{selectedCamper.description}</p>
          <div className={css.tabsContainer}>
            {" "}
            {/* Flex-контейнер для вкладок */}
            <div
              className={css.tab}
              onClick={() => handleTabChange("features")}
            >
              Features
              {activeTab === "features" && (
                <svg
                  className={css.tabUnderline}
                  width="100"
                  height="6"
                  viewBox="0 0 100 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3H100" stroke="#DADDE1" />
                  <path d="M0 3H85" stroke="#E44848" strokeWidth="5" />
                </svg>
              )}
            </div>
            <div className={css.tab} onClick={() => handleTabChange("reviews")}>
              Reviews
              {activeTab === "reviews" && (
                <svg
                  className={css.tabUnderline}
                  width="100"
                  height="6"
                  viewBox="0 0 100 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3H100" stroke="#DADDE1" />
                  <path d="M0 3H85" stroke="#E44848" strokeWidth="5" />
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
      {isLoading && <p>Loading camper details...</p>}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
    </div>
  );
};

export default CamperDetails;
