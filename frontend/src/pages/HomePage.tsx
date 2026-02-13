const HomePage = () => {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Where’s Waldo</h1>
      <p>Welcome to the game. Choose an image to begin.</p>

      <p style={{ marginTop: 24 }}>
        <a href="/dev" style={{ color: "#0366d6" }}>
          Developer Tools
        </a>
      </p>
    </div>
  );
};

export default HomePage;
