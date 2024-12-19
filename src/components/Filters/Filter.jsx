import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/campers/filterSlice";
import fetchCampers from "../../redux/campers/operations.js";

const Filters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    const newValue = filters[filterName] === value ? null : value;
    dispatch(setFilters({ name: filterName, value: newValue }));
  };

  const handleSearch = () => {
    dispatch(fetchCampers(filters));
  };

  return (
    <div>
      <label>
        Location
        <input
          type="text"
          name="location"
          placeholder="Kyiv, Ukraine"
          value={filters.location}
          onChange={(e) =>
            dispatch(setFilters({ name: "location", value: e.target.value }))
          }
        />
      </label>
      <p>Filters</p>
      <div className="filter-group">
        <h3>Vehicle type</h3>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("AC", "true")}
        >
          AC
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("transmission", "automatic")}
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
          onClick={() => handleFilterChange("TV", "true")}
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
      <div className="filter-group">
        <h3>Vehicle type</h3>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("form", "panelTruck")}
        >
          Van
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("form", "fullyIntegrated")}
        >
          Fully Integrated
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterChange("form", "alcove")}
        >
          Alcove
        </button>
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Filters;
