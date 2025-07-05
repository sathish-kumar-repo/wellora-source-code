import React, { RefObject, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  inputRef,
  placeholder,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const activeRef = inputRef ?? internalRef;
  const { t } = useTranslation();
  const finalPlaceholder = placeholder || t("general.searchHere");

  const handleClear = () => {
    setSearchTerm("");
    if (activeRef.current) {
      activeRef.current.focus();
    }
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={finalPlaceholder}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        ref={activeRef}
        value={searchTerm}
        className="input pl-10 pr-10"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <ClearIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;