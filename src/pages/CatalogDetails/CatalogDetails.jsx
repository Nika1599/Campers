import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchCamperById } from "../../redux/campers/operations";
import ImageGallery from "react-image-gallery";
import css from "./CatalogDetails.module.css";
import { BookForm } from "../../components/BookForm/BookForm";

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

  const features = [
    { key: "transmission", label: "Transmission" },
    { key: "engine", label: "Engine" },
    { key: "AC", label: "Air Conditioning" },
    { key: "bathroom", label: "Bathroom" },
    { key: "kitchen", label: "Kitchen" },
    { key: "TV", label: "TV" },
    { key: "radio", label: "Radio" },
    { key: "refrigerator", label: "Refrigerator" },
    { key: "microwave", label: "Microwave" },
    { key: "gas", label: "Gas" },
    { key: "water", label: "Water" },
  ];

  const vehicleDetails = [
    { key: "form", label: "Form" },
    { key: "length", label: "Length" },
    { key: "width", label: "Width" },
    { key: "height", label: "Height" },
    { key: "tank", label: "Tank Capacity" },
    { key: "consumption", label: "Consumption" },
  ];

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
            <div
              className={`${css.tab} ${
                activeTab === "features" ? css.activeTab : ""
              }`}
              onClick={() => handleTabChange("features")}
            >
              Features
              {activeTab === "features" && (
                <svg
                  className={css.tabUnderline}
                  width="85"
                  height="6"
                  viewBox="0 0 85 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3H100" stroke="#DADDE1" />
                  <path d="M0 3H85" stroke="#E44848" strokeWidth="5" />
                </svg>
              )}
            </div>
            <div
              className={`${css.tab} ${
                activeTab === "reviews" ? css.activeTab : ""
              }`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
              {activeTab === "reviews" && (
                <svg
                  className={css.tabUnderline}
                  width="85"
                  height="6"
                  viewBox="0 0 85 6"
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
      {activeTab === "features" && (
        <div className={css.featuresContainer}>
          <ul className={css.featuresList}>
            {features
              .filter((feature) => selectedCamper?.[feature.key])
              .map((feature) => (
                <li key={feature.key} className={css.featureItem}>
                  {feature.label}
                </li>
              ))}
          </ul>
        </div>
      )}
      {activeTab === "features" && (
        <div className={css.vehicleDetailsContainer}>
          <p className={css.vehicleDetailsTitle}>Vehicle Details</p>
          <ul className={css.vehicleDetailsList}>
            {vehicleDetails
              .filter((detail) => selectedCamper?.[detail.key])
              .map((detail) => (
                <li key={detail.key} className={css.vehicleDetailItem}>
                  {detail.label}:{selectedCamper[detail.key]}
                </li>
              ))}
          </ul>
        </div>
      )}
      {activeTab === "reviews" && (
        <div className={css.reviewsContainer}>
          {selectedCamper?.reviews?.length > 0 ? (
            selectedCamper.reviews.map((review, index) => (
              <div key={index} className={css.reviewItem}>
                <h3 className={css.reviewerName}>{review.reviewer_name}</h3>
                <p className={css.reviewerRating}>
                  ⭐ {review.reviewer_rating} / 5
                </p>
                <p className={css.reviewComment}>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this camper yet.</p>
          )}
        </div>
      )}
      {isLoading && <p>Loading camper details...</p>}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
      <BookForm />
    </div>
  );
};

export default CamperDetails;
