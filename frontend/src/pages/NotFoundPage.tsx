import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>404 — Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>

      <p style={{ marginTop: 24 }}>
        <Link to="/" style={{ color: "#0366d6" }}>
          Go back home
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;