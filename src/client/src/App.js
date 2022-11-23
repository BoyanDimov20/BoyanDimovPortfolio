import { useEffect, useState } from 'react';
import './App.css';
import ContactPage from './components/ContactPage/ContactPage';
import GalleryPage from './components/Gallery/GalleryPage';
import HomePage from './components/HomePage/HomePage';
import MainPage from './components/MainPage/MainPage';
import Navigation from './components/Navigation/Navigation';

function App() {

	return (
		<div className="App">
			<Navigation />

			<HomePage />

			<MainPage />
			<ContactPage />
			<GalleryPage />
		</div>
	);
}

export default App;
