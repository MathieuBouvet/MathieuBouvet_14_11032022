import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { useState } from "react";

const NotFoundPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      Page does not exist. <Link to="/">return to homepage</Link>
      <div>
        <button onClick={() => setShowModal(s => !s)}>toggle</button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      </Modal>
    </div>
  );
};

export default NotFoundPage;
