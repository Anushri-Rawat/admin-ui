import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const { userDetails, dispatch } = useContext(UserContext);
  const [searchText, setSearchText] = useState("");

  const searchResults = () => {
    const output = userDetails.map((user) => {
      if (
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return { ...user, show: true };
      } else {
        return { ...user, show: false };
      }
    });
    dispatch({ type: "SET_USER_DETAILS", payload: output });
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    searchResults();
  };

  return (
    <input
      className={styles.searchAction}
      type="text"
      value={searchText}
      placeholder="Search by name, email or role"
      onChange={handleInputChange}
    ></input>
  );
};

export default SearchBar;
