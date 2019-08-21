import React, { useEffect, useState } from 'react';
import './main.css';
import { Bar } from './bar';
import Axios from 'axios';
import { Event } from './event';

const sortTeams = (a, b) => {
  if (a.events.length < b.events.length) {
    return 1;
  }
  if (a.events.length > b.events.length) {
    return -1;
  }
  return 0;
};

const sortEvents = (a, b) => {
  if (a.created_at.seconds < b.created_at.seconds) {
    return 1;
  }
  if (a.created_at.seconds > b.created_at.seconds) {
    return -1;
  }
  return 0;
};

export const Container = () => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [eventsInOrder, setEvents] = useState([]);
  const [maxValue, setMaxValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(!refresh);
    let a = true;
    setInterval(() => {
      setRefresh(!a);
      a = !a;
    }, 10000);
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
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
          const teams = Array.from(teamsMapper.values());
          setEvents(events.sort(sortEvents));
          setTeams(teams.sort(sortTeams));
          setMaxValue(max);
          setLoading(false);
        });
    }
  }, [refresh]);

  const createTeam = () => {
    var name = prompt('Nome do Time:', '');
    if (!(name == null || name == '')) {
      Axios.post('https://us-central1-strider-bug-hunters.cloudfunctions.net/app/teams', { name })
        .then(() => alert('Time criado!'))
        .catch(() => {
          alert('Falha ao criar o time');
        });
    }
  };

  return (
    <div className="app-container">
      <div className="app-axis-container">
        <button onClick={createTeam}>Create Team</button>
        {loading && (
          <button disabled style={{ marginBottom: 25 }}>
            Loading
          </button>
        )}
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
      <div className="app-last-events-container">
        <h3>Últimos eventos reportados</h3>
        {eventsInOrder.map((event, index) => (
          <Event key={index} event={event} />
        ))}
      </div>
    </div>
  );
};
