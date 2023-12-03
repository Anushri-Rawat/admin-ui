import React, { useEffect, useReducer } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { BASE_URL } from "../constants";

const initialState = {
  error: { state: false, message: "" },
  isLoading: false,
  userDetails: [],
  currentPage:1,
  pageSize:10,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return { ...state, isLoading: false, userDetails: action.payload };
    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_CURRENT_PAGE":
        return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(userReducer, initialState);

  const getUserDetails = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(BASE_URL);
      if (res.status !== 200) {
        throw new Error("Something happened while fetching user details");
      }
      const users = await res.data.map((user) => ({
        ...user,
        checked: false,
        show:true,
      }));
      dispatch({ type: "SET_USER_DETAILS", payload: users });
      dispatch({ type: "SET_FILTERED_USERS", payload: users });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: { state: true, message: error.message },
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ ...data, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
