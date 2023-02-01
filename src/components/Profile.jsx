import axios from 'axios';
import { useState } from 'react'
import '../styles/profile.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Barbarian from '../../assets/images/classes/barbarian.jpg'
import BarbarianFemale from '../../assets/images/classes/barbarianF.jpg'
import Crusader from '../../assets/images/classes/crusader.jpg'
import CrusaderFemale from '../../assets/images/classes/crusaderF.jpg'
import DemonHunter from '../../assets/images/classes/demon_hunter.jpg'
import DemonHunterFemale from '../../assets/images/classes/demon_hunterF.jpg'
import Fetichist from '../../assets/images/classes/fetichist.jpg'
import FetichistFemale from '../../assets/images/classes/fetichistF.jpg'
import Monk from '../../assets/images/classes/monk.jpg'
import MonkFemale from '../../assets/images/classes/monkF.jpg'
import Necromancer from '../../assets/images/classes/necromancer.gif'
import NecromancerFemale from '../../assets/images/classes/necromancerF.gif'
import Wizard from '../../assets/images/classes/wizard.jpg'
import WizardFemale from '../../assets/images/classes/wizardF.jpg'

export default function Profile({ setError }) {

    const [nickname, setNickname] = useState()
    const [battleId, setBattleId] = useState()

    const [profileInfos, setProfileInfos] = useState()
    const [heroesList, setHeroesList] = useState()
    const [selectedClass, setSelectedClass] = useState([])

    const [spliceStart, setSpliceStart] = useState(0)
    const [spliceEnd, setSpliceEnd] = useState(3)

    const getProfile = async () => {
        try {
            await axios.get(`https://eu.api.blizzard.com/d3/profile/${nickname}%23${battleId}/?locale=fr_FR&access_token=EUhSc5XEI3jjKv72x7aBrwtEtlLt44iTgQ`)
                .then(response => {
                    console.log(response.data.heroes)
                    setProfileInfos(response.data)

                    response.data.heroes.unshift('')
                    response.data.heroes.push('')

                    setHeroesList(response.data.heroes)
                })
        }
        catch (error) {
            if (error.response.status == 404) setError('Utilisateur introuvable')
        }
    }

    const incrementSlice = () => {
        if (spliceEnd == heroesList.length) return
        setSpliceStart(previous => previous + 1)
        setSpliceEnd(previous => previous + 1)
    }

    const decrementSlice = () => {
        if (spliceStart == 0) return
        setSpliceStart(previous => previous - 1)
        setSpliceEnd(previous => previous - 1)
    }

    return (
        <>
            <section className="profile_search_section">
                <input className='input' placeholder='Pseudo' onChange={(e) => setNickname(e.target.value)}>
                </input>
                <div className='battleId_container'>
                    <p className='hash'>#</p>
                    <input className='input_right' placeholder='0000' onChange={(e) => setBattleId(e.target.value)} maxLength={5}></input>
                </div>
                <button className='submit' onClick={getProfile}>Confirmer</button>
            </section>
            {profileInfos != null &&
                <section className='profile_found_section'>
                    <p className='nickname'>{profileInfos.battleTag}</p>
                    <p className='guild'>Clan : {profileInfos.guildName}</p>
                    <h2 className='sub_title'>Personnages</h2>
                    <ul className='heroes_list'>
                        <FaArrowLeft className={spliceStart != 0 ? 'arrow' : 'arrow_invisible'} onClick={decrementSlice} />
                        {heroesList.slice(spliceStart, spliceEnd).map((hero, index) => {
                            console.log(hero.name, hero.class)
                            return (
                                <li key={index} className='hero'>
                                    <p className='hero_name'>{hero.name}</p>
                                    <p className='hero_class'>{hero.class}</p>
                                    {hero.level != null && <p className='hero_lvl'>Niv. {hero.level == 70 ? hero.paragonLevel : hero.level}</p>}
                                    {(hero.class == 'barbare' && hero.gender == 0) && <img className='class_img' alt='class' src={Barbarian} />}
                                    {(hero.class == 'barbare' && hero.gender == 1) && <img className='class_img' alt='class' src={BarbarianFemale} />}
                                    {(hero.class == 'croisé' && hero.gender == 0) && <img className='class_img' alt='class' src={Crusader} />}
                                    {(hero.class == 'croisée' && hero.gender == 1) && <img className='class_img' alt='class' src={CrusaderFemale} />}
                                    {(hero.class == 'chasseur de démons' && hero.gender == 0) && <img className='class_img' alt='class' src={DemonHunter} />}
                                    {(hero.class == 'chasseuse de démons' && hero.gender == 1) && <img className='class_img' alt='class' src={DemonHunterFemale} />}
                                    {(hero.class == 'féticheur' && hero.gender == 0) && <img className='class_img' alt='class' src={Fetichist} />}
                                    {(hero.class == 'féticheuse' && hero.gender == 1) && <img className='class_img' alt='class' src={FetichistFemale} />}
                                    {(hero.class == 'moine' && hero.gender == 0) && <img className='class_img' alt='class' src={Monk} />}
                                    {(hero.class == 'moniale' && hero.gender == 1) && <img className='class_img' alt='class' src={MonkFemale} />}
                                    {(hero.class == 'nécromancien' && hero.gender == 0) && <img className='class_img' alt='class' src={Necromancer} />}
                                    {(hero.class == 'nécromancienne' && hero.gender == 1) && <img className='class_img' alt='class' src={NecromancerFemale} />}
                                    {(hero.class == 'sorcier' && hero.gender == 0) && <img className='class_img' alt='class' src={Wizard} />}
                                    {(hero.class == 'sorcière' && hero.gender == 1) && <img className='class_img' alt='class' src={WizardFemale} />}
                                </li>
                            )
                        })}
                        <FaArrowRight className={spliceEnd != heroesList.length ? 'arrow' : 'arrow_invisible'} onClick={incrementSlice} />
                    </ul>
                </section>
            }
        </>
    )
}
