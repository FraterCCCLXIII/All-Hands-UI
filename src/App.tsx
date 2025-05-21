import { useState } from 'react';
import './styles/App.css';
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>OpenHands UI Modifications</h1>
        <p>
          This is a sandbox for UI modifications to the OpenHands project.
        </p>
        <div className="card">
          <Button 
            text={`count is ${count}`} 
            onClick={() => setCount((count) => count + 1)} 
            variant="primary"
            size="medium"
          />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <div className="button-showcase" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button text="Primary Button" variant="primary" />
          <Button text="Secondary Button" variant="secondary" />
          <Button text="Danger Button" variant="danger" />
          <Button text="Small Button" size="small" />
          <Button text="Large Button" size="large" />
          <Button text="Disabled Button" disabled={true} />
        </div>
      </header>
    </div>
  );
}

export default App;