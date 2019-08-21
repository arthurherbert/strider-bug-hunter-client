import React from 'react';
import './main.css';

export const Event = ({ event }) => {
  const className = `app-event ${
    event.type === 'ERROR'
      ? 'app-event--error'
      : event.type === 'SUGGESTION'
      ? 'app-event--suggestion'
      : 'app-event--bug'
  }`;
  return (
    <div className={className}>
      {/* <div className="app-event-created-at">{`#${event.id}`}</div> */}
      <div className="app-event-created-at">{new Date(event.created_at.seconds * 1000).toLocaleString()}</div>
      <div className="app-event-user">
        <p>{event.name}</p>
        <p>{event.email}</p>
      </div>
      <div className="app-event-team">
        <p>{event.team.name}</p>
      </div>
      <div className="app-event-description">
        <p>{event.message}</p>
      </div>
    </div>
  );
};
