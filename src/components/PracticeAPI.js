import React,{useState} from 'react';

// The following are the steps to print data from REST API in React JS:

// Create React state to store the API response.
// Declare State to Component JSX code to display the API response.
// JS function where API call is through axios.get() or fetch().
// Add callback function to update the React state with API response.
// Add HTML button with JS function with onChange attribute.

export default function PracticeAPI(){
    const [data, setData] = useState();

    const getData = async()=>{
        try{
            const res = await fetch("https://official-joke-api.appspot.com/random_joke");
            const data = await res.json();
            setData(data.setup + "... " + data.punchline)    
        }
        catch(e){
            console.log(e)
        }
        

        
    }

    return(
        <div>
            <h2>Hello There</h2>
            <button onClick={getData}>Get some Jokes</button>
            <p>{data}</p>
        </div>
    )

}