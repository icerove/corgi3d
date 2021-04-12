import React, {useEffect, useState} from "react";

import Corgi from "../../../CorgiCard/Corgi/Corgi";
import { Dialogue } from "../../../CorgiCard/Card";

const DashCard = ({ corgi, getCorgiOwner }) => {
  const [owner, setOwner] = useState(null)

  useEffect(() => {
    async function getOwner() {
      let owner = await getCorgiOwner(corgi.id)
      setOwner(owner)
    }
    getOwner()
  })

  return (
    <div className="creation">
      <div className="corgiboard">
        <div
          style={{
            backgroundColor: corgi.background_color,
            padding: "10px",
            display: "inline-block",
            borderRadius: "10px",
          }}
        >
          <Dialogue quote={corgi.quote} color={corgi.color} />
          <Corgi color={corgi.color} sausage={corgi.sausage} />
        </div>
      </div>
      <p className="dogname">{corgi.name}</p>
      <p className="address">
        Created by <span className="orange">@{owner}</span>
      </p>
      <style>{`
            .creation {
                margin: 1%;
                display: inline-block;
            }
            
            .corgiboard {
                width: 300px;
                height: 260px;
                border-radius: 10px;
            }
            
            .dogname {
                text-align: left;
                font-size: 1em;
                margin-left: 1%;
                margin-top: 1%;
                margin-bottom: 0;
                display: block;
            }
            
            .address {
                text-align: left;
                font-size: 0.7em;
                margin-left: 1%;
                font-weight: lighter;
                display: block;
            }
            
            .orange {
                color: orange;
            }
            
            .blue {
                color: lightblue;
            }
        `}</style>
    </div>
  );
};

export default DashCard