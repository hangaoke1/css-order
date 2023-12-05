import React from 'react';
import ReactDOM from 'react-dom';
import LibB from './LibB';

const App: React.FC<{}> = () => {
  return (
    <div className="app">
      <h1 className="app-title">hello world</h1>
      <LibB></LibB>
    </div>
  );
};

const container = document.getElementById('root');
ReactDOM.render(<App />, container);
