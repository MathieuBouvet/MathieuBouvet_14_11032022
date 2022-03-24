import { useState } from "react";

const Status = {
  ON: "ON",
  OFF: "OFF",
  VANISHING: "VANISHING",
};

function usePresence(initialyPresent = false) {
  const [status, setStatus] = useState(
    initialyPresent ? Status.ON : Status.OFF
  );

  const isPresent = status !== Status.OFF;
  const isVanishing = status === Status.VANISHING;

  const setPresent = () => setStatus(Status.ON);
  const setVanishing = () => setStatus(Status.VANISHING);
  const setAbsent = () => setStatus(Status.OFF);

  return [
    isPresent,
    isVanishing,
    setPresent,
    setVanishing,
    setAbsent,
  ];
}

export default usePresence;
