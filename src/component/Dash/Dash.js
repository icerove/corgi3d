import React, { useContext, useEffect } from "react";

import { NearContext } from "../../context/NearContext";
import { ContractContext } from "../../hooks/contract";

import Poster from "./Poster/Poster";
import ShowCase from "./ShowCase/ShowCase";

const Dash = () => {
  const nearContext = useContext(NearContext);
  const useContract = useContext(ContractContext);
  const { getDisplayCorgis, displayCorgis, getCorgiOwner } = useContract;

  useEffect(() => getDisplayCorgis(), [getDisplayCorgis]);
  
  const signIn = () => {
    nearContext.signIn();
  };

  return (
    <div className="Dash">
      <Poster
        requestSignIn={signIn}
        isLoading={nearContext.isLoading}
        user={nearContext.user}
      />
      <ShowCase displayCorgis={displayCorgis} getCorgiOwner={getCorgiOwner} />
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

export default Dash