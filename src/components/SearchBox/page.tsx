// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";

// const SearchBox: React.FC = () => {
//   const [query, setQuery] = useState<string>("");
//   const [results, setResults] = useState<any[]>([]);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     // Fetch suggestions based on the input
//     axios
//       .get(
//         `https://api.unsplash.com/search/photos?query=${query}&client_id=6ZmYBdxYEioyazp6jxRqbkyOR7R-nCYaetws97CUxTo`
//       )
//       .then((response) => {
//         const suggestions = response.data.results.map(
//           (result: any) => result.description
//         );
//         setSuggestions(suggestions);
//       })
//       .catch((error) => {
//         console.error("Error fetching suggestions", error);
//       });
//   }, [query]);

//   const handleSearch = () => {
//     // Fetch images based on the query
//     axios
//       .get(
//         `https://api.unsplash.com/search/photos?query=${query}&client_id=6ZmYBdxYEioyazp6jxRqbkyOR7R-nCYaetws97CUxTo`
//       )
//       .then((response) => {
//         setResults(response.data.results);
//         // Clear suggestions when performing a search
//         setSuggestions([]);
//       })
//       .catch((error) => {
//         console.error("Error fetching images", error);
//       });
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         className="p-2 border rounded w-full"
//         placeholder="Search for images"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             handleSearch();
//           }
//         }}
//       />

//       <ul className="mt-2">
//         {suggestions.map((suggestion, index) => (
//           <li
//             key={index}
//             className="text-blue-500 cursor-pointer"
//             onClick={() => setQuery(suggestion)}
//           >
//             {suggestion}
//           </li>
//         ))}
//       </ul>

//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {results.map((result) => (
//           <Image
//             key={result.id}
//             src={result.urls.regular}
//             alt={result.description}
//             className="rounded shadow-md"
//             width={1600}
//             height={1600}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBox;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Fetch suggestions based on the input
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=2ojMg0rHziCunnQHJKWgDXLkLUAym5nsRaVxswSV_4Q`
      )
      .then((response) => {
        const suggestions = response.data.results.map(
          (result: any) => result.description
        );
        setSuggestions(suggestions);
        setActiveSuggestion(-1);
      })
      .catch((error) => {
        console.error("Error fetching suggestions", error);
      });
  }, [query]);

  const handleSearch = () => {
    // Fetch images based on the query
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=2ojMg0rHziCunnQHJKWgDXLkLUAym5nsRaVxswSV_4Q`
      )
      .then((response) => {
        setResults(response.data.results);
        setSuggestions([]);
        setActiveSuggestion(-1);
      })
      .catch((error) => {
        console.error("Error fetching images", error);
      });
  };

  const handleClear = () => {
    setQuery(""); // Clear the input
    setSuggestions([]);
    setActiveSuggestion(-1);
    inputRef.current?.focus(); // Focus on the input
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      setQuery(suggestions[activeSuggestion]);
      setActiveSuggestion(-1);
      inputRef.current?.blur();
    } else if (e.key === "ArrowUp" && activeSuggestion > 0) {
      setActiveSuggestion(activeSuggestion - 1);
    } else if (
      e.key === "ArrowDown" &&
      activeSuggestion < suggestions.length - 1
    ) {
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Search for images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onFocus={() => setSuggestions([])}
        />
        {
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={handleClear}
          >
            Clear
          </button>
        }
        <button
          className="p-2 bg-blue-500 text-white rounded "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <ul className="mt-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={`text-blue-500 cursor-pointer ${
              activeSuggestion === index ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setQuery(suggestion);
              setSuggestions([]);
              inputRef.current?.blur();
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((result) => (
          <Image
            key={result.id}
            src={result.urls.regular}
            alt={result.description}
            className="rounded shadow-md"
            width={1600}
            height={1600}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
