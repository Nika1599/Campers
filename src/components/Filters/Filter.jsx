import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/campers/filterSlice";

const Filters = () => {
  const filters = useSelector((state) => state.filters); // Забираємо фільтри з Redux
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    // Якщо фільтр вже активований, скидаємо його значення (деактивуємо)
    const newValue = filters[filterName] === value ? null : value;
    dispatch(setFilters({ name: filterName, value: newValue }));
  };

  return (
    <div>
      {/* Локація */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={(e) =>
          dispatch(setFilters({ name: "location", value: e.target.value }))
        }
      />

      <div className="filter-group">
        {/* Тип кузова */}
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("vehicleType", "van")}
        >
          Van
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("vehicleType", "fully_integrated")}
        >
          Fully Integrated
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("vehicleType", "alcove")}
        >
          Alcove
        </button>
      </div>

      <div className="filter-group">
        {/* Обладнання */}
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("airConditioning", "true")}
        >
          AC
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("automatic", "true")}
        >
          Automatic
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("kitchen", "true")}
        >
          Kitchen
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("tv", "true")}
        >
          TV
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("bathroom", "true")}
        >
          Bathroom
        </button>
      </div>
    </div>
  );
};
export default Filters;
