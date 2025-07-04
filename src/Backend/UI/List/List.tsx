import React from "react";
import "./List.css";

type ListType = "ordered" | "unordered";
type OrderedSymbol =
  | "number"
  | "alphabet"
  | "roman"
  | "uppercase-alphabet"
  | "lowercase-roman";

type ListItem = {
  text: string | React.ReactNode;
  children?: ListItemContent[];
};

type ListItemContent = string | React.ReactNode | ListItem;

type ListProps = {
  items: ListItemContent[];
  type?: ListType;
  orderedSymbol?: OrderedSymbol;
  glass?: boolean;
  small?: boolean;
};

const List: React.FC<ListProps> = ({
  items,
  type = "unordered",
  orderedSymbol = "number",
  glass = false,
  small = false,
}) => {
  const getOrderedSymbol = (index: number): string => {
    switch (orderedSymbol) {
      case "alphabet":
        return String.fromCharCode(97 + index); // a, b, c, ...
      case "uppercase-alphabet":
        return String.fromCharCode(65 + index); // A, B, C, ...
      case "roman":
        return toRoman(index + 1); // I, II, III...
      case "lowercase-roman":
        return toRoman(index + 1).toLowerCase(); // i, ii, iii...
      case "number":
      default:
        return (index + 1).toString(); // 1, 2, 3...
    }
  };

  const toRoman = (input: number | string): string => {
    const num = typeof input === "string" ? Number(input) : input;
    if (isNaN(num)) {
      throw new Error("Invalid input, must be a number or numeric string.");
    }

    const romanMap: [string, number][] = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];

    let result = "";
    let currentNum = num;

    for (const [symbol, value] of romanMap) {
      while (currentNum >= value) {
        result += symbol;
        currentNum -= value;
      }
    }

    return result;
  };

  const renderList = (items: ListItemContent[], nested = false) => {
    const ListTag = type === "ordered" ? "ol" : "ul";

    return (
      <ListTag
        className={`glassmorphic-list ${nested ? "nested" : ""} ${
          glass ? "glass" : ""
        } ${small ? "small" : ""}`}
      >
        {items.map((item, index) => {
          const isPlain =
            typeof item === "string" || React.isValidElement(item);

          const itemText = isPlain ? item : (item as ListItem).text;

          const children = !isPlain && (item as ListItem).children;

          return (
            <li key={index} className="list-item">
              <span
                className={`list-symbol ${
                  type === "unordered" ? "circle-symbol" : "number-symbol"
                }`}
              >
                {type === "ordered" ? `${getOrderedSymbol(index)}.` : ""}
              </span>
              {itemText}
              {children && renderList(children, true)}
            </li>
          );
        })}
      </ListTag>
    );
  };

  return <div className="glassmorphic-list-container">{renderList(items)}</div>;
};

export default List;
