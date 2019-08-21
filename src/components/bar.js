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
    if (event.type === 'SUGGESTION') {
      suggestions.push(event);
    }
    if (event.type === 'ERROR') {
      errors.push(event);
    }
  });
  return (
    <div className="app-bar" style={{ height: maxHeight }}>
      <p className="app-bar-label">{team.name}</p>
      {errors.length > 0 && <BarStack type={'Erros'} count={errors.length} />}
      {suggestions.length > 0 && <BarStack type={'Sugestões'} count={suggestions.length} />}
      {bugs.length > 0 && <BarStack type={'Bugs'} count={bugs.length} />}
    </div>
  );
};
