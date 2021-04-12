import React, { useState, useEffect, useContext } from "react";

import { ContractContext } from "../../hooks/contract";
import { NearContext } from "../../context/NearContext";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { GiBowTieRibbon, GiImperialCrown } from "react-icons/gi";

import { BigCard } from "../CorgiCard/Card";
import Spinner from "../utils/Spinner";
import { Common, Uncommon, Rare, VeryRare } from "../utils/Photo";

const SharePage = () => {
  const nearContext = useContext(NearContext);
  const [copied, setCopied] = useState(false);
  const useContract = useContext(ContractContext);
  const { corgi, getCorgi, loading, getCorgiOwner } = useContract;
  const id = Number(window.location.pathname.slice(-2))

  const [owner, setOwner] = useState(null)

  useEffect(() => {
    if (id) {
      getCorgi(id);
    }
  }, [getCorgi, id]);

  useEffect(() => {
    async function getOwner() {
      let owner = await getCorgiOwner(corgi.id)
      setOwner(owner)
    }
    if(corgi){
      getOwner()
    }
  })

  if (!corgi || loading) {
    return <Spinner />;
  }

  const rate = corgi.rate;
  let show;
  if (rate === "COMMON") {
    show = <Common color={corgi.color} />;
  } else if (rate === "UNCOMMON") {
    show = <Uncommon color={corgi.color} />;
  } else if (rate === "RARE") {
    show = <Rare color={corgi.color} />;
  } else if (rate === "VERY RARE") {
    show = <VeryRare color={corgi.color} />;
  } else if (rate === "ULTRA RARE") {
    show = "ULTRA RARE";
  }

  const address = window.location.origin + "/share/" + corgi.id;
  const sausage = Number(corgi.sausage).toFixed(4);

  return (
    <div>
      <h1>Meet {corgi.name}!</h1>
      <div>
        <BigCard
          backgroundColor={corgi.background_color}
          color={corgi.color}
          sausage={corgi.sausage}
          quote={corgi.quote}
        />
      </div>
      <div className="text">
        <div>
          <p>Rarity: {corgi.rate}</p>
          {show}
        </div>
        <div>
          <p>
            <GiImperialCrown style={{ color: "#9437ff", fontSize: "1.1rem" }} />
            Owner: {owner}
          </p>
          <p>
            <GiBowTieRibbon style={{ color: "#9437ff", fontSize: "1.2rem" }} />
            Sausage: {sausage}
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        {nearContext.user ? (
          <p>Create your own and share</p>
        ) : (
          <p>
            Do you want to have corgi yourself? click Get started and enjoy the
            advanture!
          </p>
        )}
        <p>Do you also want to share {corgi.name}?</p>
        <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
          <button className="button">Copy Link</button>
        </CopyToClipboard>
        {copied && (
          <span style={{ color: "#961be0", marginLeft: "5px" }}>Copied.</span>
        )}
      </div>
      <style>{`
          .text {
              width: 70%;
              max-width: 800px;
              margin: 2% auto;
              display: flex;
              justify-content: space-around;
          }
          .button {
            background-color: #fbb040;
            color: #f2f2f2;
            border-radius: 5px;
            padding: 4px 6px;
            cursor: alias;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
          }
        `}</style>
    </div>
  );
};

export default SharePage