import React from "react";
import { getThemeContent } from "../utils/Utilities";
import PropTypes from "prop-types";

const FilterCardProducts = (props) => {
  const {
    handleChange,
    handleSearch,
    handleFilter,
    dropdownValue,
    filterValue,
    value,
    list,
    filterList,
    filterTable,
    newFieldInFilter,
    marginRight,
    handelSearchonClick,
    noFiltern,
    NoSortieren,
  } = props;
  return (
    <div className="filters mt-4 d-flex align-items-center">
      <div className="sorting__section">
        {!NoSortieren && (
          <>
            <label className="mt-2">Sortieren:</label>
            <select
              className="mt-2"
              value={dropdownValue}
              onChange={handleChange}
              style={{
                border: `1px solid ${getThemeContent().color}`,
                marginRight: marginRight,
              }}
            >
              <option disabled defaultValue value="">
                Select
              </option>
              {list?.map((item) => (
                <option key={item.key} value={item?.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      {!noFiltern && (
        <div className="sorting__section">
          <label className="mt-2">Filtern:</label>
          <select
            className="mt-2"
            value={filterValue}
            onChange={handleFilter}
            style={{
              border: `1px solid ${getThemeContent().color}`,
              marginRight: marginRight,
            }}
          >
            <option defaultValue value="">
              Select
            </option>
            {filterList?.map((item) => (
              <option key={item.id} value={item?.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="filter-mobilePart">
        {newFieldInFilter && filterTable()}
        <div
          className="search-field mt-2"
          style={{
            border: `1px solid ${getThemeContent().color}`,
          }}
        >
          <input
            type="text"
            placeholder="Suchen…"
            value={value}
            onChange={handleSearch}
            onKeyPress={(e) => e.code === "Enter" && handelSearchonClick()}
          />
          <img
            src={`/assets/icons/${getThemeContent().searchIcon}`}
            className="search-icon"
            alt="search"
            onClick={() => handelSearchonClick()}
          />
        </div>
      </div>
    </div>
  );
};
FilterCardProducts.propTypes = {
  handleChange: PropTypes.any,
  handleSearch: PropTypes.any,
  handleFilter: PropTypes.any,
  dropdownValue: PropTypes.any,
  filterValue: PropTypes.any,
  value: PropTypes.any,
  list: PropTypes.any,
  filterList: PropTypes.any,
  filterTable: PropTypes.any,
  newFieldInFilter: PropTypes.any,
  marginRight: PropTypes.any,
  handelSearchonClick: PropTypes.any,
  noFiltern: PropTypes.any,
  NoSortieren: PropTypes.any,
};
export default FilterCardProducts;
