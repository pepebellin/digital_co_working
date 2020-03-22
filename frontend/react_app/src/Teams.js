import React from 'react';
import './index.css';

function Teams() {
    var content = [];
    var teamsJson = {"teams":[{"team_name":"Team1"},{"team_name":"Team2"},{"team_name":"Team3"},{"team_name":"Team4"}]}; 

    var i;
    for (i = 0; i < teamsJson.teams.length; i++) {
        content.push(
            <div class="group4" style={{float: "left", position: "initial"}}>
                <img alt="" anima-src="../img/register-copy-rectangle-8-copy-2@2x.png" class="rectangle8copy2" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
                <div class="team1marketing">
                    <span class="span1">{teamsJson.teams[i].team_name}</span>
                </div>
                <img alt="" anima-src="../img/register-copy-group@2x.png" class="group" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/>
            </div>)
    }

    return content;
}

export default Teams;