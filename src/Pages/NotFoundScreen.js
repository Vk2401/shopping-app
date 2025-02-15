import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate =useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link onClick={() => navigate(-1)}
     
        className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all duration-300 bg-buttonColor hover:bg-opacity-80"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundScreen;
