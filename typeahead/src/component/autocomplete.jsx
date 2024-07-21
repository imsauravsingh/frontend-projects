import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SuggestionList from "./suggestion-list";
import { debounce } from "../util";

export default function Autocomplete({
  placeholder = "",
  fetchSuggestion,
  staticData,
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
}) {
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");

  console.log({ suggestions });

  const handleInputChange = (e) => {
    setSelected("");
    setInputVal(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestion = async (query) => {
    setError(null);
    setLoading(true);

    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) =>
          item.toLowerCase().includes(query)
        );
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestion");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionDebounce = useCallback(debounce(getSuggestion, 500), []);

  useEffect(() => {
    if (!selected && inputVal.length > 1) {
      getSuggestionDebounce(inputVal);
    } else {
      setSuggestions([]);
    }
  }, [inputVal, selected]);

  const handleSuggestionClick = (val) => {
    setInputVal(dataKey ? val[dataKey] : val);
    setSelected(val);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        style={customStyles}
        value={inputVal}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onfocus}
        onChange={handleInputChange}
      />
      {(suggestions.length || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          {(!loading || !error) && (
            <SuggestionList
              suggestions={suggestions}
              highlight={inputVal}
              onSuggestionClick={handleSuggestionClick}
              dataKey={dataKey}
            />
          )}
        </ul>
      )}
    </div>
  );
}
