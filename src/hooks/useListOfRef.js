import { useRef } from "react";

function useListOfRef() {
  const refs = useRef([]);

  return [
    refs,
    node => {
      if (node != null && refs.current.indexOf(node) === -1) {
        refs.current.push(node);
      }
    },
  ];
}

export default useListOfRef;
