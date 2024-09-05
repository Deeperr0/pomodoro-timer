import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
	return (
		<div className="bg-mobileBackground bg-no-repeat bg-cover md:bg-tabletBackground lg:bg-desktopBackground">
			<Navbar />
			<Home />
		</div>
	);
}

export default App;
