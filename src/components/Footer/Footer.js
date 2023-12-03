import React, { useContext } from "react";
import Pagination from "../Pagination";
import UserContext from "../../context/UserContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { userDetails, dispatch, currentPage, pageSize } =
    useContext(UserContext);
  const startIdx = currentPage * pageSize - pageSize;
  const getSelectedCount = () => {
    let flag = userDetails.filter((user) => user.checked && user.show).length;
    return flag;
  };

  const bulkDeleteHandler = () => {
    const output = userDetails.filter((user, idx) => {
      if (idx >= startIdx && idx < startIdx + pageSize) {
        return user.checked !== true;
      }
      return true;
    });
    console.log(output);
    dispatch({ type: "SET_USER_DETAILS", payload: output });
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.left}>
        <p>
          {getSelectedCount()} of{" "}
          {userDetails.filter((user) => user.show).length} rows selected
        </p>
        <button
          className={styles.deleteBtn}
          disabled={getSelectedCount() == 0 ? true : false}
          onClick={bulkDeleteHandler}
        >
          <span>Delete Selected</span>
        </button>
      </div>
      <Pagination />
    </div>
  );
};

export default Footer;
