import React from "react";
import { Redirect, Link } from "react-router-dom";

import Button from "../../utils/Button";
import { Common, Uncommon, Rare, VeryRare } from "../../utils/Photo";
import {
  GiDiscussion,
  GiJumpingDog,
  GiDogBowl,
  GiGlassBall,
} from "react-icons/gi";

const ProfileRow = ({ corgi, deleteCorgi, deleted, setDeleted }) => {
  if (deleted) {
    setDeleted(false)
    return <Redirect push to="/account" />;
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

  return (
    <div
      style={{
        margin: "5px",
        display: "flex",
        flexBasis: "row wrap",
        justifyContent: "center",
      }}
    >
      <Link
        to={`/corgi/${corgi.id}`}
        key={corgi.id}
      >
        {show}
      </Link>
      <div style={{ marginLeft: "10px", width: "50%", textAlign: "left" }}>
        <div>
          <GiGlassBall style={{ color: "#9437ff" }} /> {corgi.rate}
          <GiJumpingDog style={{ color: "#9437ff" }} />
          {corgi.name}
          <GiDogBowl style={{ color: "#9437ff" }} />
          from: {corgi.sender.length > 0 ? corgi.sender : "NEAR"}
          <p>
            <GiDiscussion style={{ color: "#9437ff" }} />
            {corgi.message ? corgi.message : "This lovely corgi is for you"}
          </p>
          <Button description="delete" action={() => deleteCorgi(corgi.id)}/>
        </div>
      </div>
    </div>
  );
};
export default ProfileRow