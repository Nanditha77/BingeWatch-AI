import React,{useContext} from 'react'
import { moodList } from '../data'
import '../Css/SelectMood.css'
import BsContext from '../Context/BsContext'
import RadioComponent from './RadioComponent'

const SelectMood = () => {
   const context = useContext(BsContext);
   const {mood,changeMood} = context;

   const handleChange= (valu)=>{
  changeMood(valu)
  window.localStorage.setItem("mood",valu); // local storage mein time ko set karna hai
}
  return (
    <div className='SS_wrapper'>
      <h1 className='SS_heading'>How is your mood today? </h1>
      <div className='SS_main_container'>
        {moodList.map((el,index)=>{
          return (
             <RadioComponent text={el} data={mood}  changeSelection={handleChange} key={index}/> //seat change kitne horr raha hai 
          )
        })}
      </div>
    </div>
  )
}

export default SelectMood