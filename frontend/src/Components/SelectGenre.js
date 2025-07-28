import React, {useContext} from 'react'
import {genreList} from '../data'
import RadioComponent from './RadioComponent'
import '../Css/SelectGenre.css'
import BsContext from '../Context/BsContext'

const SelectGenre = () => {
  const context = useContext(BsContext)
  const {genre,changeGenre} = context

  const handleChangeGenre = (valu)=>{
    changeGenre(valu)

    window.localStorage.setItem("genre",valu);// local storage
  }
    return (
    <>
    <h1 className='SM_heading'>Select a Genre</h1>
    <div className='SM_main_container'>
        {genreList.map((el,index)=>{
            return (
                <RadioComponent text={el} key={index}  data={genre} changeSelection={handleChangeGenre} />
            )
        })}
        </div>
        </>
  )
}

export default SelectGenre