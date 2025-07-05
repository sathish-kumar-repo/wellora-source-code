import { useState, useEffect, useRef, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Table from "../Table/Table";
import HighlightMatch from "../../components/HighlightMatch";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableIcon from "@mui/icons-material/Window";
import SentenceIcon from "@mui/icons-material/ViewStream";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ViewType = "Table" | "Sentence";
type Sentence = { eng: string; tam: string };

interface Lang {
  primary: string;
  secondary: string;
}

interface LangProps {
  lang?: Lang;
  type?: ViewType;
  sentences: Sentence[];
}

const ITEMS_PER_PAGE = 10;

const Lang: React.FC<LangProps> = ({
  type = "Sentence",
  lang = { primary: "English", secondary: "Tamil" },
  sentences,
}) => {
  const [viewType, setViewType] = useState<ViewType>(type);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationSettings, setPaginationSettings] = useState({
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 1,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered = useMemo(
    () =>
      sentences.filter(
        (s) =>
          s.eng.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.tam.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, sentences]
  );

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(0, currentPage), pageCount - 1);

  const pageItems = filtered.slice(
    safePage * ITEMS_PER_PAGE,
    (safePage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const updatePaginationSettings = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setPaginationSettings({
          pageRangeDisplayed: 1,
          marginPagesDisplayed: 1,
        });
      } else if (width < 768) {
        setPaginationSettings({
          pageRangeDisplayed: 2,
          marginPagesDisplayed: 1,
        });
      } else {
        setPaginationSettings({
          pageRangeDisplayed: 3,
          marginPagesDisplayed: 2,
        });
      }
    };

    updatePaginationSettings();
    window.addEventListener("resize", updatePaginationSettings);
    return () => window.removeEventListener("resize", updatePaginationSettings);
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < pageCount - 1) {
          setCurrentPage((prev) => prev + 1);
        } else if (diff < 0 && currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
      }
      touchStartX.current = null;
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener("touchstart", handleTouchStart, { passive: true });
      node.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener("touchstart", handleTouchStart);
        node.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentPage, pageCount]);

  return (
    <div className="mb-8" ref={containerRef}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(value) => {
            setSearchTerm(value);
            setCurrentPage(0);
          }}
        />
        <button
          className="btn btn-secondary flex items-center gap-2 px-6 py-3"
          onClick={() => {
            setViewType(viewType === "Sentence" ? "Table" : "Sentence");
            setCurrentPage(0);
          }}
        >
          {viewType === "Sentence" ? <TableIcon /> : <SentenceIcon />}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-lg text-secondary-600 dark:text-secondary-400 py-8">
          No result found.
        </div>
      ) : viewType === "Sentence" ? (
        <div className="space-y-4">
          {pageItems.map((sentence, index) => (
            <div className="card p-6" key={`sentence-${index}`}>
              <div className="text-secondary-900 dark:text-secondary-100 mb-2">
                <HighlightMatch text={sentence.eng} query={searchTerm} />
              </div>
              <div className="text-secondary-700 dark:text-secondary-300">
                <HighlightMatch text={sentence.tam} query={searchTerm} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>{lang.primary}</th>
              <th>{lang.secondary}</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((sentence, index) => (
              <tr key={`sentence-${index}`}>
                <td>
                  <HighlightMatch text={sentence.eng} query={searchTerm} />
                </td>
                <td>
                  <HighlightMatch text={sentence.tam} query={searchTerm} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {pageCount > 1 && (
        <div className="flex justify-center mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowForwardIosIcon />}
            previousLabel={<ArrowBackIosIcon />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={paginationSettings.pageRangeDisplayed}
            marginPagesDisplayed={paginationSettings.marginPagesDisplayed}
            pageCount={pageCount}
            containerClassName="flex items-center gap-2"
            pageClassName="inline-block"
            pageLinkClassName="px-3 py-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            activeClassName="bg-primary-500 text-white"
            activeLinkClassName="bg-primary-500 text-white hover:bg-primary-600"
            disabledClassName="opacity-50 cursor-not-allowed"
            nextClassName="inline-block"
            previousClassName="inline-block"
            nextLinkClassName="px-3 py-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            previousLinkClassName="px-3 py-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            forcePage={safePage}
          />
        </div>
      )}
    </div>
  );
};

export default Lang;