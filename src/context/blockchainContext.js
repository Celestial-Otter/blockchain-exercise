import { createContext } from "react";

export const blockchainContext = createContext({
  currentJackpot: 0,
  previousJackpot: 0,
  winningTicket: 0,
  lockedUntil: 0,
  ticketPrice: 0,
  currentFeePool: 0,
});
