import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default App;
