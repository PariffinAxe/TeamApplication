import React, {useState, useEffect} from 'react';
import Request from '../helpers/Request.js'

const TeamForm = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const request = new Request();
    request.get('/api/events')
    .then((data) => {
      setEvents(data);
    })
  }, [])

  const [team, setTeam] = useState({
    name:"",
    event:"",
    paid:false,
    notes:"",
    homeColour:"#000000",
    awayColour:"#FFFFFF"
  })

  const handleChange = function(event){
    let propertyName = event.target.name;
    let copiedTeam = {...team};
    copiedTeam[propertyName] = event.target.value;
    setTeam(copiedTeam);
  }

  const [players, setPlayers] = useState(
    [{name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}, 
    {name:"", teamNumber: "", scaNumber: ""}])
    

  const handlePlayerChange = function(event){
    let propertyName = event.target.name;
    let copiedPlayers = [...players];
    copiedPlayers[event.target.id][propertyName] = event.target.value;
    setPlayers(copiedPlayers);
  }

  const handleSubmit = function(event){
    event.preventDefault();
    const request = new Request();
    request.post("/api/team_applications", team)
    .then((res) => res.json())
    .then((data) => {
      delete data["playerApplications"];
      for (let player of players){
        if (player.name){
          player.teamApplication = data;
          request.post("/api/player_applications", player)
        }
      }
    })
    .then(() => {
      alert("Thank you for submitting your team, please don't re-submit the form.")
      window.location.reload();
    })
    
  }

  const eventOptions = events.map((event, index) => {
    return <option key={index} value={event.name}>{event.name}</option>
  })

  const playersNodes = players.map((player, index) => {
    return(
      <div className="player-info" key={index}>
        <input type="text" name="name" onChange={handlePlayerChange} value={players[index].name} id={index}/>
        <input type="number" name="teamNumber" onChange={handlePlayerChange} value={players[index].teamNumber} id={index}/>
        <input type="text" name="scaNumber" onChange={handlePlayerChange} value={players[index].scaNumber} id={index}/>
      </div>
    ) 
  })

  
  
  

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Team Name:</label>
        <input className="team-input" type="text" name="name" onChange={handleChange} value={team.name} required/>
        <label htmlFor="event">Event:</label>
        <select className="team-input" name="event" onChange={handleChange} value={team.event} required>
          <option disabled value="">Please Select</option>
          {eventOptions}
        </select>
        <label htmlFor="notes">Any Requests?</label>
        <input className="team-input" type="text" name="notes" onChange={handleChange} value={team.notes}/>
        <label htmlFor="homeColour">Home Colours:</label>
        <input className="team-input" type="color" name="homeColour" onChange={handleChange} value={team.homeColour} required/>
        <label htmlFor="awayColour">Away Colours:</label>
        <input className="team-input" type="color" name="awayColour" onChange={handleChange} value={team.awayColour} required/>
        <div className="player-info">
          <label>Player Name:</label>
          <label>Team Number:</label>
          <label>SCA Number:</label>
        </div>
        {playersNodes}
        <button type="submit">Submit Team</button>
        


      </form>
    </div>
  )

}

export default TeamForm;