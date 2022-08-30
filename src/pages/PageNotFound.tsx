import { Link } from "react-router-dom";
import { Card } from "antd";

const PageNotFound = () => {
  return (
    <Card className="shadow" style={{ height: "98%" }}>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="text-9xl mb-2 text-red-700">404</h2>
        <h4 className="text-4xl ">Page Not Found</h4>
        <p className="text-center my-6 text-base w-1/3">
          The page you were looking for doesn't exist. You may have have
          mistyped the address or the page may have moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-submit text-white py-3 px-4">
            Back to Home
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PageNotFound;
