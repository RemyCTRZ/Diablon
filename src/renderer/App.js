import axios from 'axios';
import { useEffect, useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WorldMap from '../../assets/images/world-map.jpg'
import Profile from '../components/Profile';
import Act from '../pages/Act';

const Hello = () => {

	const [error, setError] = useState()

	const [acts, setActs] = useState()
	const [selectedAct, setSelectedAct] = useState()
	const [selectedActInfos, setSelectedActInfos] = useState()

	const [toDoQuests, setToDoQuests] = useState()

	const [accessToken, setAccessToken] = useState('EU02rm3UsyrRex6AyhtIGIfrBlgrjanW7D')

	const getInfos = async () => {
		await axios.get(`https://us.api.blizzard.com/d3/data/act?locale=fr_FR&access_token=${accessToken}`)
			.then(response => {
				setActs(response.data.acts)
			})
	}

	const getAct = async () => {
		await axios.get(`https://eu.api.blizzard.com/d3/data/act/${selectedAct}?locale=fr_FR&access_token=${accessToken}`)
			.then(response => {
				let quests = response.data.quests
				quests.map(quest => {
					Object.assign(quest, { done: false })
				})
				setToDoQuests(quests)
				setSelectedActInfos(response.data)
			})
	}

	useEffect(() => {
		getInfos()
	}, [])

	useEffect(() => {
		if (selectedAct) getAct()
	}, [selectedAct])

	// Ecran de chargement

	if (acts == null) return (
		<h1>Loading</h1>
	)

	// Acte sélectionné

	if (selectedAct && selectedActInfos) return (
		<Act selectedActInfos={selectedActInfos} setSelectedAct={setSelectedAct} toDoQuests={toDoQuests} />
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
						<li key={index} className='act' onClick={() => setSelectedAct(index + 1)}>
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

			<Profile setError={setError} accessToken={accessToken} />

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