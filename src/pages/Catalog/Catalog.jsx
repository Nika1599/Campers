import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCampers } from "../../redux/campers/campersSlice";
import fetchCampers from "../../redux/campers/operations";
import Filter from "../../components/Filters/Filter";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/campers/favouritesSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filters);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchCampers(filters));
    return () => dispatch(clearCampers());
  }, [dispatch, filters]);

  if (isLoading) return <p>Loading campers...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleShowMore = (id) => {
    navigate(`/catalog/${id}`);
  };

  const getFirstFourCharacteristics = (camper) => {
    const characteristics = [
      { label: "Engine", value: "engine" },
      { label: "AC", value: "AC" },
      { label: "Bathroom", value: "bathroom" },
      { label: "Kitchen", value: "kitchen" },
      { label: "TV", value: "TV" },
      { label: "Radio", value: "radio" },
      { label: "Refrigerator", value: "refrigerator" },
      { label: "Microwave", value: "microwave" },
      { label: "Gas", value: "gas" },
      { label: "Water", value: "water" },
    ];

    // Вибираємо характеристики, які існують у об'єкті кемпера
    return characteristics
      .filter((char) => camper[char.value] !== undefined)
      .slice(0, 4); // Відбираємо тільки перші 4
  };

  return (
    <div>
      <Filter />
      <div>
        {items.length > 0 ? (
          items.map((camper) => {
            const isFavorite = favorites.some((item) => item.id === camper.id);
            const displayedCharacteristics =
              getFirstFourCharacteristics(camper);
            const handleFavoriteClick = () => {
              if (isFavorite) {
                dispatch(removeFromFavorites(camper));
              } else {
                dispatch(addToFavorites(camper));
              }
            };

            const fixedPrice = parseFloat(camper.price).toFixed(2);

            return (
              <div key={camper.id}>
                <img src={camper.gallery[0].thumb} alt={camper.name} />
                <h3>{camper.name}</h3>
                <p> €{fixedPrice}</p>
                <button onClick={handleFavoriteClick}>
                  {isFavorite ? "💖" : "🤍"}
                </button>
                <p>
                  ⭐ {camper.rating} ({camper.reviews.length} reviews)
                </p>
                <p> {camper.location}</p>
                <p>{camper.description.slice(0, 100)}...</p>
                {displayedCharacteristics.map(({ label, value }) => (
                  <p key={value}>
                    {label} {camper[value]}
                  </p>
                ))}
                <button onClick={() => handleShowMore(camper.id)} type="button">
                  Show more
                </button>
              </div>
            );
          })
        ) : (
          <p>No campers found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
