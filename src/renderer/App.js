import axios from 'axios';
import { useEffect, useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WorldMap from '../../assets/images/world-map.jpg'
import Profile from '../components/Profile';
const Hello = () => {

	const [error, setError] = useState()

	const [acts, setActs] = useState()

	const getInfos = async () => {
		await axios.get(`https://us.api.blizzard.com/d3/data/act?locale=fr_FR&access_token=EUhSc5XEI3jjKv72x7aBrwtEtlLt44iTgQ`)
			.then(response => {
				setActs(response.data.acts)
			})
	}

	useEffect(() => {
		getInfos()
	}, [])

	if (acts == null) return (
		<h1>Loading</h1>
	)

	return (
		<main className='main'>
			{error &&
				<div className='error_container'>
					<p className='error_title'>Erreur</p>
					<p className='error_msg'>{error}</p>
					<button className='error_btn' onClick={() => setError()}>OK</button>
				</div>
			}
			<h1 className='main_title'>Diablo III</h1>
			<h2 className='sub_title'>Actes</h2>

			<ul className='acts_list'>
				{acts.map((act, index) => {
					return (
						<li key={index} className='act'>
							<img className='act_img' src={WorldMap} />
							<div className='act_txt'>
								<p className='act_name'>{act.name}</p>
								<p className='act_quests'>{act.quests.length} quêtes disponibles</p>
							</div>
						</li>
					)
				})}
			</ul>

			<h2 className='sub_title'>Profil</h2>

			<Profile setError={setError} />

		</main >
	);
};

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Hello />} />
			</Routes>
		</Router>
	);
}
