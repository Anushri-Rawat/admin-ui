import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const { userDetails, dispatch, currentPage, pageSize } =
    useContext(UserContext);

  const getTotalPages = (length) => {
    return Math.ceil(length / pageSize);
  };

  const totalPages = getTotalPages(userDetails.filter((user) => user.show).length);

  const getToFirstPage = () => {
    moveToPage(1);
  };
  const getToLastPage = () => {
    moveToPage(totalPages);
  };
  const getToNextPage = () => {
    moveToPage(currentPage + 1);
  };
  const getToPreviousPage = () => {
    moveToPage(currentPage - 1);
  };
  const moveToPage = (val) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: Number(val) });
  };

  return (
    <div className={styles.paginationWrapper}>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={getToFirstPage}
      >
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={getToPreviousPage}
      >
        &lt;
      </button>
      {[...Array(totalPages).keys()]
        .map((i) => i + 1)
        .map((page) => (
          <button
            key={page}
            className={`${currentPage === page ? styles.active : ""}`}
            onClick={() => moveToPage(page)}
          >
            {page}
          </button>
        ))}
      <button
        disabled={currentPage === totalPages ? true : false}
        onClick={getToNextPage}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === totalPages ? true : false}
        onClick={getToLastPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
