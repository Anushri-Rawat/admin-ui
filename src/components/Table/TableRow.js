import React, { useContext, useState } from "react";
import styles from "./Table.module.css";
import UserContext from "../../context/UserContext";

const TableRow = ({ user }) => {
  const [userEditValues, setUserEditValues] = useState({});
  const [isEditRow, setIsEditRow] = useState(false);
  const { userDetails, dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    setUserEditValues({ ...userEditValues, [e.target.name]: e.target.value });
  };

  const editHandler = (id) => {
    const editedOutput = userDetails.map((user) => {
      if (user.id === id) return { ...user, ...userEditValues };
      else return user;
    });
    dispatch({ type: "SET_USER_DETAILS", payload: editedOutput });
    setIsEditRow(false);
  };

  const deleteHandler = (id) => {
    const filteredOutput = userDetails.filter((user) => user.id !== id);
    console.log(userDetails, filteredOutput, id);
    dispatch({ type: "SET_USER_DETAILS", payload: filteredOutput });
  };

  const selectRowHandler = (e, id) => {
    let output;
    if (e.target.checked) {
      output = userDetails.map((user) =>
        user.id === id ? { ...user, checked: true } : user
      );
    } else {
      output = userDetails.map((user) =>
        user.id === id ? { ...user, checked: false } : user
      );
    }
    dispatch({ type: "SET_USER_DETAILS", payload: output });
  };
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name={user.name}
          style={{
            cursor: "pointer",
          }}
          onChange={(event) => selectRowHandler(event, user.id)}
          checked={user.checked}
        />
      </td>
      <td>
        {isEditRow ? (
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            value={userEditValues.name}
            onChange={handleChange}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditRow ? (
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            value={userEditValues.email}
            onChange={handleChange}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditRow ? (
          <input
            type="text"
            name="role"
            defaultValue={user.role}
            value={userEditValues.role}
            onChange={handleChange}
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {!isEditRow ? (
          <>
            <i
              className={`fas fa-edit ${styles.icons}`}
              onClick={() => {
                setIsEditRow(true);
              }}
            ></i>
            <i
              className={`fas fa-trash-alt ${styles.icons} ${styles.red}`}
              onClick={() => deleteHandler(user.id)}
            ></i>
          </>
        ) : (
          <>
            <i
              className={`fas fa-check ${styles.icons} ${styles.green}`}
              onClick={() => editHandler(user.id)}
            ></i>
            <i
              className={`fa fa-close ${styles.icons}`}
              onClick={() => setIsEditRow(false)}
            ></i>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
