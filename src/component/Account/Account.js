import React, { useContext, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import { NearContext } from "../../context/NearContext";
import { ContractContext } from "../../hooks/contract";

import Spinner from "../utils/Spinner";
import AccountCard from "./AccountCard/AccountCard";
import Generation from "../Generation/Generation"

const Account = () => {
  const nearContext = useContext(NearContext);
  const useContract = useContext(ContractContext);
  const { loading, getCorgisList,corgis } = useContract;
  let Corgis;

  useEffect(() => {
    if (nearContext.user) {
      getCorgisList(nearContext.user.accountId);
    }
  }, [getCorgisList,nearContext ]);
  
  if (!nearContext.user) {
    return <Redirect to="/" />;
  }
  if (!corgis || loading) {
    Corgis = <Spinner />;
  }
  if (corgis && corgis.length === 0) {
     return <Generation />;
  }
  if (corgis && corgis.length > 0) {
    Corgis = corgis.map((corgi) => {
      return (
          <Link
            to={`/corgi/${corgi.id}`}
            key={corgi.id}
          >
            <AccountCard corgi={corgi} />
          </Link>
      );
    });
  }
  return (
    <div>
      <div>
        <h1 className="head">Your Pack</h1>
        <p>Create,collect,send or trade</p>
      </div>
      <div>{Corgis}</div>
    </div>
  );
};

export default Account