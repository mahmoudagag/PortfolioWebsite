import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center dark text-white">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-4">404</h1>

        <p className="text-lg mb-8">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="
            inline-block
            w-auto
            px-6 py-3
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
          "
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
