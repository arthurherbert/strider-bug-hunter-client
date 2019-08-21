import React, { useEffect, useState } from 'react';
import './main.css';
import { Bar } from './bar';
import Axios from 'axios';

export const Container = () => {
  const [teams, setTeams] = useState([]);
  const [maxValue, setMaxValue] = useState([]);

  useEffect(() => {
    Axios.get('https://us-central1-strider-bug-hunters.cloudfunctions.net/app/events')
      .then(response => response.data)
      .then(events => {
        const teamsMapper = new Map();
        events.forEach(event => {
          let team = teamsMapper.get(event.team.id);
          if (!team) {
            team = {
              name: event.team.name,
              events: []
            };
            teamsMapper.set(event.team.id, team);
          }
          team.events.push(event);
        });
        let max = 0;
        teamsMapper.forEach(team => {
          if (team.events.length > max) {
            max = team.events.length;
          }
        });
        setTeams(Array.from(teamsMapper.values()));
        setMaxValue(max);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="app-y-axis">
        <p>Número de eventos reportados</p>
      </div>
      <div className="app-x-axis">
        <p>Times</p>
      </div>
      <div className="app-bars">
        {teams.map((team, index) => (
          <Bar key={index} team={team} maxHeight={((team.events.length / maxValue) * 100).toFixed(0) + `%`} />
        ))}
      </div>
    </div>
  );
};
