import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { SmallCard } from "../../CorgiCard/Card";
import Modal from "../../utils/Modal";

const Share = ({ corgi, show, closeModal }) => {
  const [copied, setCopied] = useState(false);
  const address = window.location.origin + "/share/" + corgi.id;

  return (
    <Modal show={show} Close={closeModal}>
      <div style={{ width: "100%", height: "100%", marginBottom: "30px" }}>
        <h3>Share a Corgi</h3>
        <p>Click the card to see the share page</p>
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
          <p
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "4px 2px",
              wordWrap: "break-word",
            }}
          >
            {address}
          </p>
          <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
            <button
              style={{
                backgroundColor: "#fbb040",
                color: "#f2f2f2",
                borderRadius: "5px",
                padding: "4px 2px",
                cursor: "alias",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
              }}
            >
              Copy Link
            </button>
          </CopyToClipboard>
          {copied && (
            <span style={{ color: "#961be0", marginLeft: "5px" }}>Copied.</span>
          )}
        </div>
       {/* <div style={{ marginBottom: "10px" }}>
          <p style={{ color: "#999" }}>or share directly on</p>
          <div style={{ display: "flex", justifyContent: "space between" }}>
            <div class="share-this-inline-share-buttons"></div>
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default Share