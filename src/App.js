import "./App.css";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import Home from "./components/Home";

function App() {
  const { userDetails, error, isLoading } = useContext(UserContext);
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error.message && <h1>{error.message}</h1>}
      {!isLoading && !error.state && <Home />}
    </div>
  );
}

export default App;
