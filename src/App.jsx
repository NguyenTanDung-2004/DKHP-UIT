import React from "react";
import './App.css'
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

	return (
		<div className="app">
			<ToastContainer />
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
