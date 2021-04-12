import React, { useContext, useEffect } from "react";

import { ContractContext } from "../../hooks/contract";

import ShowCase from "../Dash/ShowCase/ShowCase";

const Market = () => {
  const useContract = useContext(ContractContext);
  const { getDisplayCorgis, displayCorgis, getCorgiOwner } = useContract;

  useEffect(() => getDisplayCorgis(), [getDisplayCorgis]);

  const corgis = displayCorgis.filter((corgi) => corgi.selling === true)

  return (
    <div className="Dash">
        <h1 className="head">Welcome to Corgi Market</h1>
        {corgis.length > 0 ?
        <ShowCase displayCorgis={corgis} getCorgiOwner={getCorgiOwner} />
        : <p>There is no available corgi on sale, please have a look later</p>
    }
        
        <style>{`
            .Dash {
                width: 100%;
                margin: auto;
                display: grid;
                text-align: center;
            }
        `}</style>
    </div>
  );
};

export default Market