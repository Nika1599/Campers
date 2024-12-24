import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCampers } from "../../redux/campers/campersSlice";
import fetchCampers from "../../redux/campers/operations";
import Filter from "../../components/Filters/Filter";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/campers/favouritesSlice";
import iziToast from "izitoast";

const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const { items, isLoading, error, totalItems } = useSelector(
    (state) => state.campers
  );
  const filters = useSelector((state) => state.filters);
  const favorites = useSelector((state) => state.favorites.items);
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    dispatch(fetchCampers({ filters, page, limit })); // Передаємо об'єкт із filters, page, і limit
    return () => dispatch(clearCampers());
  }, [dispatch, filters, page, limit]); // Додаємо залежності

  if (isLoading) return <p>Loading campers...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLoadMore = () => {
    // Перевірка на кінець колекції
    if (items.length >= totalItems) {
      iziToast.info({
        title: "End of Collection",
        message: "You have reached the end of the collection!",
        position: "topRight",
        timeout: 3000,
      });
      return;
    }

    // Завантаження наступної сторінки
    setPage((prevPage) => prevPage + 1);

    // Перевіряємо, чи є елемент для прокручування
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
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
                  <p key={`${camper.id}-${value}`}>
                    {label} {camper[value]}
                  </p>
                ))}
                <button
                  onClick={() => navigate(`/catalog/${camper.id}`)}
                  type="button"
                >
                  Show more
                </button>
              </div>
            );
          })
        ) : (
          <p>No campers found.</p>
        )}
      </div>
      {items.length < totalItems ? (
        <button onClick={handleLoadMore}>Load More</button>
      ) : (
        <p ref={bottomRef}>End of Collection</p>
      )}
    </div>
  );
};

export default Catalog;
