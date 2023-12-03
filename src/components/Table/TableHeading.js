import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const TableHeading = ({ userList }) => {
  const { dispatch, userDetails } = useContext(UserContext);

  const getAllSelectedFlag = () => {
    let flag = userList.every((user) => user.checked);
    return flag;
  };

  const selectAllHandler = (e) => {
    let output = userDetails;
    if (e.target.checked) {
      output.forEach((user, id) => {
        userList.forEach((item) => {
          if (item.id === user.id) {
            user.checked = true;
          }
        });
      });
    } else {
      output.forEach((user, id) => {
        userList.forEach((item) => {
          if (item.id === user.id) {
            user.checked = false;
          }
        });
      });
    }
    dispatch({ type: "SET_USER_DETAILS", payload: output });
  };

  return (
    <thead>
      <tr>
        <th style={{ width: "10%" }}>
          <input
            type="checkbox"
            name="selectAll"
            style={{
              cursor: "pointer",
            }}
            checked={getAllSelectedFlag()}
            onChange={selectAllHandler}
          />
        </th>
        <th style={{ width: "25%" }}>Name</th>
        <th style={{ width: "30%" }}>Email</th>
        <th style={{ width: "15%" }}>Role</th>
        <th style={{ width: "20%" }}>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeading;
