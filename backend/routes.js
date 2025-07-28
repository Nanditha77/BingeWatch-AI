const express=require('express')
const movies = require("./movies");
const router = express.Router();
const Ticket = require("./schema");
const cors = require("cors");
const app= express();

router.use(express.json()) //parse to json

router.use(cors()) // cross origin resource sharing enable kar raha hai

function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dot / (magA * magB || 1);
}

router.post("/suggestions",async (requ,resp)=>{
    const {genre,language,mood}= requ.body;
     
    try{
    if (!genre && !language && !mood) {
        return resp.status(400).json({ msg: "At least one filter (genre/language/mood) required" });
    }

    // Extract all unique values
    const allGenres = [...new Set(movies.flatMap((m) => m.genres))];
    const allLanguages = [...new Set(movies.map((m) => m.language))];
    const allMoods = [...new Set(movies.map((m) => m.mood))];

    const encode = (inputArr, allValues) =>
        allValues.map((v) => (inputArr.includes(v) ? 1 : 0));

    // Convert input filters to binary vector
    const inputGenres = genre ? Array.isArray(genre) ? genre : [genre] : [];
    const inputVec = [
        ...encode(inputGenres, allGenres),
        ...encode([language], allLanguages),
        ...encode([mood], allMoods)
    ];

    // Helper to vectorize movie
    const getMovieVector = (movie) => [
        ...encode(movie.genres, allGenres),
        ...encode([movie.language], allLanguages),
        ...encode([movie.mood], allMoods)
    ];

    // Calculate similarity
    const recommendations = movies
        .map((movie) => ({
        ...movie,
        similarity: cosineSimilarity(inputVec, getMovieVector(movie))
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5); // top 5

    
        const myData = new Ticket({genre,language,mood,recommendations}) // schema ke liye

        const saved = await myData.save();
        resp.status(200).json({data:myData,recommended: recommendations, message: "Suggestions according to your choices"}) // 200 success
    }
    catch(eror){
        resp.status(500).json({
            data:null,
            message:"Something went wrong! Please try again"
        })
    }//creating new ticket, jo bhi hamne data ---- hisaab se
}) //end point create kartha hai

router.get("/suggestions", async (requ,resp)=>{
    try{
        const myData = await Ticket.find().sort({_id:-1}).limit(1) //post data ko find karna hai, ham e retrieve kar rahe hai last booking data ko, saare nahi, sirf last ko
        if(myData.length===0){
            resp.status(200).json({data:null,message:"No previous booking found"})
        }
        else{
            resp.status(200).json({data:myData[0]})
        }
    }
    catch(eror){
         resp.status(500).json({
            data:null,
            message:"Something went wrong!"
         })
    }
})

module.exports = router 