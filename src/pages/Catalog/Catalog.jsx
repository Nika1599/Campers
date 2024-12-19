import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCampers } from "../../redux/campers/campersSlice";
import fetchCampers from "../../redux/campers/operations";
import Filter from "../../components/Filters/Filter";

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCampers(filters));
    return () => dispatch(clearCampers());
  }, [dispatch, filters]);

  if (isLoading) return <p>Loading campers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Filter />
      <div>
        {items.length > 0 ? (
          items.map((camper) => {
            const fixedPrice = camper.price.toFixed(2);
            return (
              <div key={camper.id}>
                <h3>{camper.name}</h3>
                <p>{camper.description}</p>
                <p>Price: {fixedPrice}</p>
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
