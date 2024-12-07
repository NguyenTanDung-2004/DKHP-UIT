import React from "react";
import './App.css'
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

function App() {

	return (
		<div className="app">
			<Navbar />
			<div className="main-content">
				<div className="page-content">
					<AppRoutes />
				</div>
			</div>
		</div>
	);
}

export default App;
