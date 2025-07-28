import React, { useContext, useEffect } from 'react'
import '../Css/Watchlist.css'
import BsContext from '../Context/BsContext'

const Watchlist = () => {
  const context = useContext(BsContext);

  const {handleGetSuggestions,lastSuggestions} = context

  useEffect(()=>{
         handleGetSuggestions(); // thaki ham api ko call kar rahe hai
  },[]) ;//lastbooking detail ko jab bhi component mount karega hame fetch karna hai 
  return (
  
    <div className='suggestions_details_container_main'>
      <h2 className='suggestions_details_header'>Recommended Watchlist</h2>
      {
        lastSuggestions ? (  // lastSuggestions agar hai toh sear bhi set ke lete hai
          <>
      <p className='movie'><strong>Genre : </strong><span>{lastSuggestions.genre}</span></p>
      <p className='language' style={{textAlign:"left"}}><strong>Language : </strong><span>{lastSuggestions.language}</span></p>
      <p className='mood_header'><strong> Mood: </strong><span>{lastSuggestions.mood}</span></p>
       <div className='suggestions'>
       <ul>
        <p className='suggestion'><strong>Suggested Movies : </strong>{lastSuggestions.recommendations.map(films => (
        <li>{films.title}</li>
     ))}</p>
      </ul>
      </div>
        </>
        ) : (
                 <p className='no_previous'>No choices entered</p>
        )
      }
    </div>
  )
}

export default Watchlist