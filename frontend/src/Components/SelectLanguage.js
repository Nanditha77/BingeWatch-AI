import React,{useContext} from 'react'
import RadioComponent from './RadioComponent'
import '../Css/SelectLanguage.css'
import { languageList } from '../data'
import BsContext from '../Context/BsContext'

const SelectLanguage = () => {

  const context = useContext(BsContext);
  const {language,changeLanguage} = context;

const handleChange= (valu)=>{
  changeLanguage(valu)
  window.localStorage.setItem("language",valu); // local storage mein language ko set karna hai
}
  return (
    <> {/*fragment wala iske andar pura wrap kaenge taki apko kuch add karna hotho nice  otherwise same thing*/}
    
    <div className='Slot_container'>
        <h1 className='TS_heading'>Select a language</h1>
        <div className='TS_main_container'>
          {languageList.map((el,index)=>{
            return(
              <RadioComponent text={el} data={language}  changeSelection={handleChange} key={index}/>

            )
          })}
        </div>
    </div>
    </>
  )
}

export default SelectLanguage