import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { utils } from "near-api-js";
import { NearContext } from "../../context/NearContext";
import { ContractContext } from "../../hooks/contract";

import ProfileRow from "./ProfileRow/ProfileRow";
import Spinner from "../utils/Spinner";

import { CorgiTwo } from "../utils/corgiAnimation";

const Profile = () => {
  const nearContext = useContext(NearContext);
  const useContract = useContext(ContractContext);
  const {
    corgis,
    loading,
    deleteCorgi,
    deleting,
    deleted,
    setDeleted,
    error,
  } = useContract;

  if (!nearContext.user) {
    return <Redirect to="/" />;
  }
  if (!corgis || loading) {
    return <Spinner />;
  }
  if (corgis && corgis.length === 0) {
    return <Redirect to="/generation" />;
  }
  let Corgis;
  if (corgis && corgis.length > 0) {
    Corgis = corgis.map((corgi) => {
      return (
        <ProfileRow
          deleteCorgi={deleteCorgi}
          corgi={corgi}
          key={corgi.id}
          deleted={deleted}
          setDeleted={setDeleted}
        />
      );
    });
  }
  if (deleting) {
    return (
      <div className="box">
        <CorgiTwo color={"black"} />
        <style>{`
      .box {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
      }
      @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
      }
    `}</style>
      </div>
    );
  }
  return (
    <div>
      <h1>Your Corgis</h1>
      <p>
        NEAR Balance:{" "}
        {utils.format.formatNearAmount(nearContext.user.balance, 5)} Ⓝ
      </p>
      {error && <p>{error}</p>}
      <div>{Corgis}</div>
    </div>
  );
};
export default Profile;
