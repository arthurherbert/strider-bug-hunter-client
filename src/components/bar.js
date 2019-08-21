import React from 'react';
import './main.css';

const BarStack = ({ type, count }) => {
  const className = `app-bar-stack ${
    type === 'Problemas'
      ? 'app-bar-stack--problem'
      : type === 'Sugestões'
      ? 'app-bar-stack--suggestion'
      : 'app-bar-stack--bug'
  }`;
  return (
    <div className={className} style={{ height: count > 0 ? 100 * count + '%' : '10%' }}>
      <p>{type}</p>
      <p>{count}</p>
    </div>
  );
};

export const Bar = ({ team, maxHeight }) => {
  const bugs = [];
  const suggestions = [];
  const problems = [];
  team.events.forEach(event => {
    if (event.type === 'BUG') {
      bugs.push(event);
    }
    if (event.type === 'SUGGESTION') {
      suggestions.push(event);
    }
    if (event.type === 'PROBLEM') {
      problems.push(event);
    }
  });
  return (
    <div className="app-bar" style={{ height: maxHeight }}>
      <p className="app-bar-label">{team.name}</p>
      {problems.length > 0 && <BarStack type={'Problemas'} count={problems.length} />}
      {suggestions.length > 0 && <BarStack type={'Sugestões'} count={suggestions.length} />}
      {bugs.length > 0 && <BarStack type={'Bugs'} count={bugs.length} />}
    </div>
  );
};
