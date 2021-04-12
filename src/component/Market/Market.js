import React, { useContext, useEffect } from "react";

import { ContractContext } from "../../hooks/contract";

import ShowCase from "../Dash/ShowCase/ShowCase";
import market from "../../assets/images/market.png"
const Market = () => {
  const useContract = useContext(ContractContext);
  const { getDisplayCorgis, displayCorgis } = useContract;

  useEffect(() => getDisplayCorgis(), [getDisplayCorgis]);

  const corgis = displayCorgis.filter((corgi) => corgi.selling === true)

  return (
    <div className="Dash">
        <h1 className="head">Welcome to Corgi Market</h1>
        {corgis.length > 0 ?
        <ShowCase displayCorgis={corgis} />
        : 
        <>
        <p>There is no available corgi on sale, please have a look later</p>
        <img src={market} className="market" alt='' />
        </>
    }
        <style>{`
            .Dash {
                width: 100%;
                margin: auto;
                display: grid;
                text-align: center;
            }
            .market {
              width: 30%;
              margin: auto;
            }
        `}</style>
    </div>
  );
};

export default Market