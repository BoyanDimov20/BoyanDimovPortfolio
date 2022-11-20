import { useEffect, useState } from 'react';
import './App.css';
import ContactPage from './components/ContactPage/ContactPage';
import MainPage from './components/MainPage/MainPage';
import Navigation from './components/Navigation/Navigation';

function App() {

	return (
		<div className="App">
			<Navigation />

			<header id="welcome" className="App-header">
				<h1 className='heading'>Welcome to BDimov</h1>
			</header>

			<MainPage />
			<ContactPage />
		</div>
	);
}

export default App;
