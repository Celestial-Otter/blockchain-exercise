import * as React from "react";

import { blockchainContext } from "../context/blockchainContext";
import moment from "moment";
import LockedCard from "./LockedCard";
import UnlockedCard from "./UnlockedCard";

const RollLotteryCardBox = () => {
  const { lockedUntil } = React.useContext(blockchainContext);

  const currentTime = moment().unix();
  const lockedUntilTime = moment(lockedUntil).unix();

  const isLocked = moment(currentTime).isAfter(lockedUntilTime);
  return <div>{isLocked ? <UnlockedCard /> : <LockedCard />}</div>;
};

export default RollLotteryCardBox;
