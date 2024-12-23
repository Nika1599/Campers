import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/campers/filterSlice";
import fetchCampers from "../../redux/campers/operations.js";

const Filters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    // Перевірка на множинні значення
    if (Array.isArray(filters[filterName])) {
      const newValue = filters[filterName].includes(value)
        ? filters[filterName].filter((item) => item !== value) // Видаляємо, якщо вже є
        : [...filters[filterName], value]; // Додаємо нове значення
      dispatch(setFilters({ name: filterName, value: newValue }));
    } else {
      dispatch(setFilters({ name: filterName, value }));
    }
  };

  const handleSearch = () => {
    dispatch(fetchCampers(filters));
  };

  return (
    <div>
      <label>
        Location
        <select
          name="location"
          value={filters.location || ""}
          onChange={(e) => {
            dispatch(setFilters({ name: "location", value: e.target.value }));
          }}
        >
          <option value="">Select a city</option>
          <option value="Ukraine, Kyiv">Kyiv,Ukraine</option>
          <option value="Ukraine, Poltava">Poltava,Ukraine</option>
          <option value="Ukraine, Odesa">Odesa,Ukraine</option>
          <option value="Ukraine, Kharkiv">Kharkiv,Ukraine</option>
          <option value="Ukraine, Sumy">Sumy,Ukraine</option>
          <option value="Ukraine, Lviv">Lviv,Ukraine</option>
          <option value="Ukraine, Dnipro">Dnipro,Ukraine</option>
        </select>
      </label>

      <p>Filters</p>
      <div className="filter-group">
        <h3>Vehicle Features</h3>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("AC", "true")} // Множинне значення для AC
        >
          AC
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("transmission", "automatic")}
        >
          Automatic
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("kitchen", "true")} // Множинне значення для kitchen
        >
          Kitchen
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("TV", "true")}
        >
          TV
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("bathroom", "true")}
        >
          Bathroom
        </button>
      </div>

      <div className="filter-group">
        <h3>Vehicle Type</h3>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("form", "panelTruck")}
        >
          Van
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("form", "fullyIntegrated")}
        >
          Fully Integrated
        </button>
        <button
          type="button"
          className="filter-btn"
          onClick={() => handleFilterChange("form", "alcove")}
        >
          Alcove
        </button>
      </div>

      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Filters;
