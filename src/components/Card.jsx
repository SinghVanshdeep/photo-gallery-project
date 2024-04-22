import React, {useState, useEffect} from "react";
import Photo from "./Photo";


function Card(){
    // const myKey = process.env.REACT_APP_IMG_KEY;
    // console.log(myKey);
    const [userInput, setUserInput] = useState(2);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    async function getData(){
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_IMG_KEY}&count=${userInput}`);
        const imgData = await response.json();
        setData(imgData);
    }

    function handleChange(event){
        const {value} = event.target; // object de-construction (event.target is an object)
        
        setUserInput(Number(value));
        console.log(value);
    }

    function handleSubmit(){
        console.log(userInput);
        if(userInput < 1 || userInput > 10){
            setError(true);
        }
        else{
            setError(false);
            getData();
            
        }
    }

    // useEffect(() => {
    //     fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_IMG_KEY}&count=${userInput}`)
    //     .then(response => response.json())
    //     .then(json => setData(json))
    //     .catch(error => console.error(error));
    // }, [!error]);

    return (
        <div className="photo-card">
            <h1 className="spaced">Photo Gallery</h1>
            <h3 className="spaced">Enter the number of photos</h3>
            <input className="spaced" type="number" min="1" max="10" defaultValue={userInput} onChange={handleChange}/>
            {error && <p className="text-danger spaced">Please enter a number between 1 and 10</p>}
            <button className="btn btn-outline-dark spaced" type="submit" onClick={handleSubmit}>GET PHOTOS</button>
            <div className="photos">{data.map((d) => <Photo key={d.id} imgUrl={d.urls.thumb} />)}</div>
        </div> 
    );
}

export default Card;