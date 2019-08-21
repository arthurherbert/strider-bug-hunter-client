import React from 'react';
import './main.css';

const BarStack = ({ type, count }) => {
  const className = `app-bar-stack ${
    type === 'Erros'
      ? 'app-bar-stack--error'
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
  const errors = [];
  team.events.forEach(event => {
    if (event.type === 'BUG') {
      bugs.push(event);
    }
    if (event.type === 'SUGGESTIONS') {
      suggestions.push(event);
    }
    if (event.type === 'ERROR') {
      errors.push(event);
    }
  });
  return (
    <div className="app-bar" style={{ height: maxHeight }}>
      <p className="app-bar-label">{team.name}</p>
      <BarStack type={'Erros'} count={errors.length} />
      <BarStack type={'Sugestões'} count={suggestions.length} />
      <BarStack type={'Bugs'} count={bugs.length} />
    </div>
  );
};
