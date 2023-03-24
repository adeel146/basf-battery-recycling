import React, { useState } from "react";
import OverallExport from "../modals/OverallExport";
import { getThemeContent } from "../utils/Utilities";
import PropTypes from "prop-types";

const FilterCard = (props) => {
  const [overallExport, setOverallExport] = useState(false);
  const {
    handleChange,
    handleSearch,
    dropdownValue,
    value,
    list,
    filterTable,
    newFieldInFilter,
    marginRight,
    noexporticon,
    handelSearchonClick,
    tableType,
  } = props;
  return (
    <div className="filters mt-4 d-flex flex-wrap align-items-center">
      <div className="sorting__section">
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
      </div>

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
      <div
        className={`export ${
          (noexporticon || tableType === "Verpackungsmaterial") && "noexport"
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOverallExport(true);
        }}
      >
        <p>Excel Export: </p>
        <img src="/assets/icons/excel.png" alt="excel" />
      </div>
      <OverallExport
        show={overallExport}
        close={() => {
          setOverallExport(false);
        }}
      />
    </div>
  );
};
FilterCard.propTypes = {
  handleChange:PropTypes.any,
  handleSearch:PropTypes.any,
  dropdownValue:PropTypes.any,
  value:PropTypes.any,
  list:PropTypes.any,
  filterTable:PropTypes.any,
  newFieldInFilter:PropTypes.any,
  marginRight:PropTypes.any,
  noexporticon:PropTypes.any,
  handelSearchonClick:PropTypes.any,
  tableType:PropTypes.any,
};
export default FilterCard;
