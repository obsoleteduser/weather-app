import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'

import './App.css'

function App() {
 const [data, setData] = useState()
 const [city, setCity] = useState('Baku')
 const [search, setSearch] = useState(false)

 useEffect(()=>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=8ba0aa326baf4b97b7d101444222212&q=${city}&aqi=no`)
    .then(response => response.json())
    .then(data => setData(data))
    .then(console.log(data?.location))
 }, [search])

 const cityHandler = event =>{
  setCity(event.target.value)
 }


 const getCity = ()=>{
    setSearch(!search)
 }


 

  return (
    <div className="App">
      <div className="controller">
      <input onChange={cityHandler} type="text" on placeholder='Enter the city'/>
      <button onClick={getCity}>Get Forecast</button>
      </div>
      {data ? 
      <div className="display">
      <div className="country">{data?.location?.country}/{data?.location?.name}</div>
      <div className="image"><img src={'https:'+data?.current?.condition?.icon} /></div>
      <div className="temp-c">{data?.current?.temp_c}°C</div>
      <div className="temp-f">{data?.current?.temp_f}°F</div>
      <div className="wind-dir">{data?.current?.wind_dir}</div>
      <div className="wind-kph">{data?.current?.wind_kph}</div>
      <div className="wind-mph">{data?.current?.wind_mph}</div>
    </div> : <div style={{marginTop: '5%'}}><PuffLoader color="#36d7b7" /></div>
      }
    </div>
  )
}

export default App
