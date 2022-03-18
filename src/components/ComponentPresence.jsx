import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ComponentPresence = ({ presenceWanted, children }) => {
  const [isPresent, setIsPresent] = useState(presenceWanted);
  useEffect(() => {
    if (presenceWanted) {
      setIsPresent(true);
    }
  }, [presenceWanted]);

  if (!presenceWanted && !isPresent) return null;
  return children({
    isExiting: !presenceWanted && isPresent,
    onExited: () => setIsPresent(false),
  });
};

ComponentPresence.propTypes = {
  children: PropTypes.func.isRequired,
  presenceWanted: PropTypes.bool.isRequired,
};

export default ComponentPresence;
