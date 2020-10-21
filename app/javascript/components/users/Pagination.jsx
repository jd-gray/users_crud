import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../../routers/AppRouter";

const PaginationColumn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Pagination = () => {
  const usersState = useUserContext();

  const {
    previous_page: previousPage,
    next_page: nextPage,
    current_page: currentPage,
    total_pages: totalPages,
  } = usersState.data;
  
  return (
    <div className="columns is-vcentered">
      <div className="column">
        <p>Page <b>{currentPage}</b> of <b>{totalPages}</b></p>
      </div>
      {totalPages > 1 && 
        <PaginationColumn className="column">
          <nav role="navigation" aria-label="pagination">
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
        </PaginationColumn>
      }
    </div>
  )
};

export default Pagination;