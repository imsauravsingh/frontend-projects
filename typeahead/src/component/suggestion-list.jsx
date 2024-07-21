import React from "react";

export default function SuggestionList({
  suggestions = [],
  highlight = "",
  onSuggestionClick = () => {},
  dataKey = "",
}) {
  const getHighlightedText = (text, highlight) => {
    const parse = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log({ parse });
    return parse.map((part, index) => {
      return part.toLowerCase() === highlight.toLowerCase() ? (
        <b key={index}>{part}</b>
      ) : (
        part
      );
    });
  };
  return (
    <>
      {suggestions.map((list, index) => {
        const currSuggestion = dataKey ? list[dataKey] : list;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(list)}
            className="suggestion-item"
          >
            {getHighlightedText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
}
