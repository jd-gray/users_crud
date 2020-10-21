import React, { useState } from "react";
import { Link } from "react-router-dom";

const SortableColumn = ({columnName, displayText}) => {
  const [sortableColumn, setSortableColumn] = useState(false);

  return (
    <th>
      <Link 
        to="#"
        to={{ search: `?s=${sortableColumn ? `-${columnName}` : columnName}` }}
        onClick={() => setSortableColumn(!sortableColumn)}>
          {displayText}
      </Link>
    </th>
  )
};

export default SortableColumn;