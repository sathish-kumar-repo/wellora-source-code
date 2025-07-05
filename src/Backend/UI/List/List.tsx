import React from "react";

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
    
    const baseClasses = `space-y-2 ${nested ? "ml-6 mt-2" : ""} ${
      glass ? "bg-white/10 backdrop-blur-sm rounded-lg p-4" : ""
    } ${small ? "text-sm" : ""}`;

    return (
      <ListTag className={baseClasses}>
        {items.map((item, index) => {
          const isPlain =
            typeof item === "string" || React.isValidElement(item);

          const itemText = isPlain ? item : (item as ListItem).text;
          const children = !isPlain && (item as ListItem).children;

          return (
            <li key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 text-primary-600 dark:text-primary-400 font-medium">
                {type === "ordered" ? `${getOrderedSymbol(index)}.` : "•"}
              </span>
              <div className="flex-1">
                <div className="text-secondary-700 dark:text-secondary-300">
                  {itemText}
                </div>
                {children && renderList(children, true)}
              </div>
            </li>
          );
        })}
      </ListTag>
    );
  };

  return <div className="my-4">{renderList(items)}</div>;
};

export default List;