import React, { useState, useContext } from "react";

import { SmallCard } from "../../CorgiCard/Card";
import Modal from "../../utils/Modal";

import { ContractContext } from "../../../hooks/contract";
import Button from "../../utils/Button";

const Sell = ({ corgi, show, closeModal }) => {
  const [price, _setPrice] = useState("");
  const useContract = useContext(ContractContext);
  const { sellCorgi } = useContract;
  const id = Number(window.location.pathname.slice(7));

  const setPrice = (event) => {
    if (event) {
      const value = event.target !== null ? event.target.value : "";
      _setPrice(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sellCorgi(id, price);
  };

  return (
    <Modal show={show} Close={closeModal}>
      <div style={{ width: "100%", height: "100%", marginBottom: "30px" }}>
        <h3>Sell Corgi</h3>
        <div>
          <div style={{ width: "100%", height: "90%" }}>
            <SmallCard
              backgroundColor={corgi.background_color}
              color={corgi.color}
              sausage={corgi.sausage}
              quote={corgi.quote}
            />
          </div>
          <p style={{ margin: "0" }}>{corgi.name}</p>
          <span style={{ color: "orange", fontSize: "0.7rem" }}>
            {corgi.rate}
          </span>
          <hr />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <form onSubmit={onSubmit}>
            <div style={{ textAlign: "left", marginBottom: "3px" }}>
              <label>Price: </label>
              <input
                autoFocus
                required
                type="text"
                placeholder=""
                value={price}
                onChange={setPrice}
                className="receiver"
              />
            </div>
            <div style={{ marginTop: "5px", marginBottom: "10px" }}>
              <Button description="Sell" />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Sell;
