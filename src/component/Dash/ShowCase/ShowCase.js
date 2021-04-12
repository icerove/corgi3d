import { Link } from "react-router-dom";
import React from "react";

import DashCard from "./DashCard/DashCard";

const ShowCase = ({ displayCorgis }) => {
  let Corgis = displayCorgis.map((corgi) => {
    return (
      <Link
        to={`/share/${corgi.id}`}
        key={corgi.id}
      >
        <DashCard corgi={corgi}/>
      </Link>
    );
  });
  return <div>{Corgis}</div>;
};

export default ShowCase