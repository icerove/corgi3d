import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { NearContext } from "../../context/NearContext";
import { ContractContext } from "../../hooks/contract";

import { BigCard } from "../CorgiCard/Card";
import Send from "./Send/Send";
import Share from "./Share/Share";
import Sell from "./Sell/Sell";

import Spinner from "../utils/Spinner";
import Rate from "../utils/Rate";

import iconSend from "../../assets/images/icon-send.svg";
import iconShare from "../../assets/images/icon-share.svg";
import iconSell from "../../assets/images/icon-sell.svg";

const SinglePage = () => {
  const nearContext = useContext(NearContext);
  const useContract = useContext(ContractContext);
  const { corgi, loading, getCorgi, transfering } = useContract;
  const id = Number(window.location.pathname.slice(7));

  useEffect(() => {
    getCorgi(id);
  }, [getCorgi, id]);

  const [showSend, setSend] = useState(false);
  const [showShare, setShare] = useState(false);
  const [showSell, setSell] = useState(false);
  const openSendModal = () => {
    setSend(true);
  };
  const openShareModal = () => {
    setShare(true);
  };
  const openSellModal = () => {
    setSell(true);
  };
  const closeModal = () => {
    setSend(false);
    setShare(false);
    setSell(false);
  };

  if (!nearContext.user) {
    return <Redirect to="/" />;
  }
  if (!corgi || loading) {
    return <Spinner />;
  }
  if (corgi.owner && corgi.owner !== nearContext.user.accountId) {
    return <Redirect to="/account" />;
  }

  return (
    <div>
      <Send
        corgi={corgi}
        transfering={transfering}
        show={showSend}
        closeModal={closeModal}
      />
      <Share corgi={corgi} closeModal={closeModal} show={showShare} />
      <Sell corgi={corgi} closeModal={closeModal} show={showSell} />
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
        <div className="wrapperS">
          <Rate rate={corgi.rate} />
          <SendAndShare
            openSendModal={openSendModal}
            openShareModal={openShareModal}
            openSellModal={openSellModal}
          />
        </div>
      </div>
      <style>{`
        .wrapperS {
          width: 70%;
          max-width: 800px;
          margin: 2% auto;
          display: flex;
          justify-content: space-between;
      }
      
      .card {
          background-color: azure;
          margin-bottom: 10px;
          padding-left: 10px;
          display: flex;
          border-radius: 5px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
          cursor: pointer;
      }
      
      .cardChar {
          color: #2b73c7;
      }
      
      .text {
          margin-left: 10px;
          display: inline-block;
          // width: 200px;
          text-align: left;
          padding: 0;
      }
      
      .small {
          display: none;
      }

      .button-part {
        width: 80%;
      }
      
      @media all and (max-width: 416px) {
          .text {
              display: none;
          }
      
          .small {
              font-size: 1rem;
              display: inline;
              color: #2b73c7;
          }

          .card {
            width: 100px;
          }

          .button-part {
            width: 200px;
          }
      }
      `}</style>
    </div>
  );
};

export default SinglePage;

const SendAndShare = ({ openShareModal, openSendModal, openSellModal }) => {
  let style = { display: "flex", flexDirection: "column" };
  return (
    <div className="button-part">
      <h5 className="icontext">What would you like to do</h5>
      <span style={style}>
        <SendCard clicked={openSendModal} />
        <ShareCard clicked={openShareModal} />
        <SellCard clicked={openSellModal} />
      </span>
    </div>
  );
};

const SendCard = ({ clicked }) => {
  return (
    <button className="card" onClick={clicked}>
      <img
        src={iconSend}
        alt="Send"
        style={{ height: "60%", paddingTop: "20px" }}
      />
      <div className="small">Send</div>
      <div className="text">
        <h3 className="cardChar">Send as a gift</h3>
        <p>The perfect gift for any occasion</p>
      </div>
    </button>
  );
};

const ShareCard = ({ clicked }) => {
  return (
    <button className="card" onClick={clicked}>
      <img
        src={iconShare}
        alt="Share"
        style={{ height: "60%", paddingTop: "20px" }}
      />
      <div className="small">Share</div>
      <div className="text">
        <h3 className="cardChar">Share on Social</h3>
        <p>Got something rare? It is time to brag a bit.</p>
      </div>
    </button>
  );
};

const SellCard = ({ clicked }) => {
  return (
    <button className="card" onClick={clicked}>
      <img
        src={iconSell}
        alt="Share"
        style={{ height: "60%", paddingTop: "20px" }}
      />
      <div className="small">Sell</div>
      <div className="text">
        <h3 className="cardChar">Sell on Market</h3>
        <p>Got something rare? Try for good luck.</p>
      </div>
    </button>
  );
};
