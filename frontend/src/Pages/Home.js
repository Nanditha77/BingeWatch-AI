import React, { useContext } from 'react'
import '../Css/Home.css'
import BsContext from '../Context/BsContext'
import Modal from '../Components/ModalComponent'
import SelectMood from '../Components/SelectMood'
import SelectGenre from '../Components/SelectGenre'
import SelectLanguage from '../Components/SelectLanguage'
import Watchlist from '../Components/Watchlist'

const Home = () => {

     const context = useContext(BsContext);  // pehle yaha context create karlete hai 
     const {
       genre,
       language,
       mood,
       handlePostChoices,
       setErrorPopup,
       setErrorMessage,
     } = context ;

  
  const handleSearch = () => {
        if(!genre){
          setErrorPopup(true)
          setErrorMessage("Pleaseselect a genre");
        }
        else if(!language){
          setErrorPopup(true)
          setErrorMessage("Pleaseselect a language");
        
        }
         else if(!mood){
          setErrorPopup(true)
          setErrorMessage("Pleaseselect a mood for today");
    }
        else{
          handlePostChoices()
        }
  };
  
  return (
    <>
     <div className='header'>
        <h1>The Smart Way to Choose a Movie</h1> 
    </div>
    <Modal/>
    <div className='container'>
    <div className='wrapper'>
      <div className='select_movie_component'>
       <SelectGenre/>
       </div>
       <div className='suggestions_details_container'>
       <Watchlist/>
       </div>
       </div>
       <div className='time_seats_container'>
         <SelectLanguage/>
         <SelectMood/>
          <button className='BN-btn' onClick={()=>{handleSearch()}}>Search Movies</button>
       </div>
    </div>
    </>
  )
}

export default Home