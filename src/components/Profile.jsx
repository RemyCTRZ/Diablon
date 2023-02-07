import axios from 'axios';
import { useState } from 'react'
import '../styles/profile.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function Profile({ setError, accessToken }) {

    const [nickname, setNickname] = useState()
    const [battleId, setBattleId] = useState()

    const [profileInfos, setProfileInfos] = useState()
    const [heroesList, setHeroesList] = useState()

    const [spliceStart, setSpliceStart] = useState(0)
    const [spliceEnd, setSpliceEnd] = useState(3)

    const getProfile = async () => {
        try {
            await axios.get(`https://eu.api.blizzard.com/d3/profile/${nickname}%23${battleId}/?locale=fr_FR&access_token=${accessToken}`)
                .then(response => {
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
                            return (
                                <li key={index} className='hero'>
                                    <p className='hero_name'>{hero.name}</p>
                                    <p className='hero_class'>{hero.class}</p>
                                    {hero.level != null && <p className='hero_lvl'>Niv. {hero.level == 70 ? hero.paragonLevel : hero.level}</p>}
                                    {hero.class == 'nécromancien' && <img className='class_img' alt='class' src={require(`../../assets/images/classes/${hero.class}.gif`)} />}
                                    {hero.class == 'nécromancienne' && <img className='class_img' alt='class' src={require(`../../assets/images/classes/${hero.class}.gif`)} />}
                                    {hero.class && hero.class != 'nécromancien' && hero.class != 'nécromancienne' && <img className='class_img' alt='class' src={require(`../../assets/images/classes/${hero.class}.jpg`)} />}
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
