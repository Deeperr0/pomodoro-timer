import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="bg-mobileBackground bg-no-repeat bg-cover md:bg-tabletBackground lg:bg-desktopBackground">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
