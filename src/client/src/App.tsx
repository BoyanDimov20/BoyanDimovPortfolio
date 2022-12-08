import './App.css';
import ContactPage from './pages/ContactPage/ContactPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/LoginPage/Login';
import MainPage from './pages/MainPage/MainPage';
import Navigation from './pages/Navigation/Navigation';
import { createSignalRContext } from "react-signalr";

const { useSignalREffect, Provider } = createSignalRContext();

function App() {

	return (
		<div className="App">
			<Provider url="https://localhost:7186/comment">
				<Navigation />

				<HomePage />

				<MainPage />
				<ContactPage />
				<GalleryPage />
			</Provider>
		</div>
	);
}

export default App;
