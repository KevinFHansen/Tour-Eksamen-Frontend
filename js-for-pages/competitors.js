import {URL} from "../../settings.js";
import {handleHttpErrors} from "../fetchUtils.js"


const competitorURL = URL + "/competitors/"

export function setupCompetitorHandlers(){
    getCompetitors();
    document.getElementById("btn-search").onclick = getCompetitorsByTeam;
    
}

 async function getCompetitors (){
    try{

    const competitors = await fetch("https://cykelholdetbackend.azurewebsites.net/api/competitors/").then(res => handleHttpErrors(res))
    competitors.sort((a, b) => parseFloat(a.totalTime) - parseFloat(b.totalTime));
    const rows = competitors.map(c=>
        `
        <tr>
        
        <td> ${c.id}</td>
        <td> ${c.firstName}</td>
        <td> ${c.lastName}</td>
        <td> ${c.age}</td>
        <td> ${c.nationality}</td>
        <td> ${c.climberPoints}</td>
        <td> ${c.sprintPoints}</td>
        <td> ${c.totalTime}</td>
        <td> ${c.teamResponse.name}</td>
        <td> <img src = "${c.imageUrl}"></img> </td>
        
        </tr>
        
        `)
        .join("")
        document.getElementById("tbl-body").innerHTML = rows   
} 
catch(err){
    console.log(err.message)
}
}

 async function getCompetitorsByTeam (){
    try{
        
    document.getElementById("tbl-body").innerHTML = ""
    
    let select = document.getElementById('team');
    let value = select.options[select.selectedIndex].value;

    const competitorsByTeamName = await fetch(competitorURL + "?team=" + value).then(res => handleHttpErrors(res))
    competitorsByTeamName.sort((a, b) => parseFloat(a.totalTime) - parseFloat(b.totalTime));
const rows = competitorsByTeamName.map(c=>
    `
    <tr data-id=${c.id}>
    
    <td> ${c.id}</td>
    <td> ${c.firstName}</td>
    <td> ${c.lastName}</td>
    <td> ${c.age}</td>
    <td> ${c.nationality}</td>
    <td> ${c.climberPoints}</td>
    <td> ${c.sprintPoints}</td>
    <td> ${c.totalTime}</td>
    <td> ${c.teamResponse.name}</td>
    <td> <img src = "${c.imageUrl}"></img> </td>
    <td> <button id="competitor-delete-btn" class="competitor-delete">Delete</button></td>
    
    </tr>
    
    `).join("")
    document.getElementById("tbl-body").innerHTML = rows
    document.getElementById("headerTitle").innerHTML = value;    
  
    const tbody = document.querySelectorAll(".competitor-delete").forEach((element ) =>{
        element.addEventListener("click", (e)=> {
            e.preventDefault();
            let id = e.target.parentElement.parentElement.dataset.id
            fetch("https://cykelholdetbackend.azurewebsites.net/api/competitors/" + id, {
                method: "DELETE",
            })
              
    })
    })
}
catch(err){
    console.log(err.message)
}
}



export function addNewCompetitor(){
    const firstName = document.getElementById("firstname-competitor").value
    const lastName = document.getElementById("lastname-competitor").value
    const age = document.getElementById("age-competitor").value
    const nationality = document.getElementById("nationality-competitor").value
    const climberPoints = document.getElementById("climberpoints-competitor").value
    const sprintPoints = document.getElementById("sprintpoints-competitor").value
    const totalTime = document.getElementById("totaltime-competitor").value
    const imageUrl = document.getElementById("imageurl-competitor").value
    const team = document.getElementById("team-competitor").value
    const teamId = {id: team}
    fetch("https://cykelholdetbackend.azurewebsites.net/api/competitors/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
            "nationality": nationality,
            "climberPoints": climberPoints,
            "sprintPoints": sprintPoints,
            "totalTime": totalTime,
            "imageUrl": imageUrl,
            "team": teamId,
        })
    })
    
}

export function editCompetitor(){
    const id = document.getElementById("id-competitor-edit").value
    const firstName = document.getElementById("firstname-competitor-edit").value
    const lastName = document.getElementById("lastname-competitor-edit").value
    const age = document.getElementById("age-competitor-edit").value
    const nationality = document.getElementById("nationality-competitor-edit").value
    const climberPoints = document.getElementById("climberpoints-competitor-edit").value
    const sprintPoints = document.getElementById("sprintpoints-competitor-edit").value
    const totalTime = document.getElementById("totaltime-competitor-edit").value
    const imageUrl = document.getElementById("imageurl-competitor-edit").value
    const team = document.getElementById("team-competitor-edit").value
    const teamId = {id: team}
    
    fetch("https://cykelholdetbackend.azurewebsites.net/api/competitors/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
            "nationality": nationality,
            "climberPoints": climberPoints,
            "sprintPoints": sprintPoints,
            "totalTime": totalTime,
            "team": teamId,
            "imageUrl": imageUrl
        })
    })
    
}