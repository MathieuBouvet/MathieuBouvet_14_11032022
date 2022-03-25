import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      Page does not exist. <Link to="/">return to homepage</Link>
    </div>
  );
};

export default NotFoundPage;
