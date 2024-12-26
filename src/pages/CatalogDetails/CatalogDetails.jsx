import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
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
          <ImageGallery items={images} className={css.imageGallery} />;
          <p>{selectedCamper.description}</p>
          <p>Features</p>
          <p>Reviews</p>
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
