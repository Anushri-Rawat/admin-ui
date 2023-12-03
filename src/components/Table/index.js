import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import TableHeading from "./TableHeading";
import TableRow from "./TableRow";
import styles from "./Table.module.css";

const Table = () => {
  const { userDetails, currentPage, pageSize } = useContext(UserContext);
  const startIndex = currentPage * pageSize - pageSize;

  const userList = userDetails
    .filter((user) => user.show)
    .slice(startIndex, startIndex + pageSize);

  return (
    <table>
      <TableHeading userList={userList} />
      <tbody>
        {userList.map((user) => (
          <TableRow user={user} key={user.id} />
        ))}
        {userList.length == 0 && (
          <td colSpan={5} className={styles.noUser}>
            No User to display!!
          </td>
        )}
      </tbody>
    </table>
  );
};

export default Table;
