import '../styles/act.css'

export default function Act({ selectedActInfos, setSelectedAct, toDoQuests }) {

    return (
        <section className='act_container'>
            <h1 className='main_title'>{selectedActInfos.name}</h1>
            <ul className='quests_list'>
                {toDoQuests.map((quest, index) => {
                    return (
                        <li className={quest.done ? 'quest done' : 'quest'} key={index}>
                            <p className='quest_title'>{index + 1} - {quest.name}</p>
                        </li>
                    )
                })}
            </ul>
            <button className='exit' onClick={() => setSelectedAct()}>X</button>
        </section>
    )
}
