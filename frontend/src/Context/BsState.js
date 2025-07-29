import BsContext from "./BsContext"; 
import React, {  useEffect,useState } from "react";  {/* context ko import karke yaha pe jitne bhi state honge uske saath work karenge, vaise toh oh ham BsContext mein bhi kar sakthe hai */}

const BsState = (props) =>{
    
    const [errorPopup,setErrorPopup] = useState(false);

    const [errorMessage,setErrorMessage] = useState("")

    const [genre,changeGenre] = useState(''); // genres ke liye bana dete hai(genre state)

    const [language,changeLanguage] = useState(''); 

    const [mood,changeMood] = useState(''); 

    const [lastSuggestions,setlastSuggestions] = useState(null);
    
    const handlePostChoices = async () =>{
          const response = await fetch(`http://localhost:8080/api/suggestions`,{
              method:"Post",
              headers:{
                "Content-Type":"application/json",
          },
          body:JSON.stringify({genre:genre,language:language,mood:mood}),
         }) // yaha pe api request send karthe hai, backend pe, jo bhi user ne select kiya uske saab se

         const data = await response.json(); 

         setErrorPopup(true); //jab error hoga tho pop up dikhayega us error ka
         setErrorMessage(data.message);

         if(response.status === 200){
             changeLanguage("") // reset kar dete hai state ko vapas 
             changeGenre("")
             changeMood("")
             setlastSuggestions(data.data);

             window.localStorage.clear()
         }

    } // handle karna hai post request thaki ham booking data ko save kar sake backend mein

    const handleGetSuggestions = async () =>{
        const response = await fetch(
            `http://localhost:8080/api/suggestions`,{
                method:"Get"
            }
        )

        const data = await response.json();

        setlastSuggestions(data.data);
    }
     useEffect(()=>{
        const genre  = window.localStorage.getItem("genre")
        const language= window.localStorage.getItem("language")
        const mood = window.localStorage.getItem("mood")  //number mein chahiye so

        if(genre){
            changeGenre(genre);
        }
        if(language){
            changeLanguage(language)
        }
        if(mood){
            changeMood(mood)
        }
     },[]) // useefect karenge thaki update karthe samay local storage ke liye aur update kar sake state ko jab bhi page ko refresh kar rahe toh
     
    return (
        <BsContext.Provider value={{genre,changeGenre,language,changeLanguage,mood,changeMood,lastSuggestions,handleGetSuggestions,handlePostChoices,errorMessage,setErrorMessage,errorPopup,setErrorPopup}}>{props.children}</BsContext.Provider> // data pass karna hai toh yaha se pass karenge value ke zariye 
    )
}

export default BsState;




