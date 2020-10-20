import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../routers/AppRouter";

const Pagination = () => {
  const usersState = useUserContext();

  const {
    previous_page: previousPage,
    next_page: nextPage,
    current_page: currentPage,
    total_pages: totalPages,
  } = usersState.data;
  
  return (
    <div>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <Link
          to={{ search: `?p=${previousPage}` }}
          className="pagination-previous"
        >
          Previous
        </Link>
        <Link
          to={{ search: `?p=${nextPage}` }}
          className="pagination-next"
        >
          Next page
        </Link>
      </nav>
      <p>Page {currentPage} of {totalPages}</p>
    </div>
  )
};

export default Pagination;