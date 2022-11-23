import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import ContactPage from './pages/ContactPage/ContactPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import HomePage from './pages/HomePage/HomePage';
import MainPage from './pages/MainPage/MainPage';
import Navigation from './pages/Navigation/Navigation';

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
