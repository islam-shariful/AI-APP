import { useEffect, useState } from 'react'
import { Button } from './components/ui/button';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div className='p-4'>
      <h1>Client Application</h1>
      <p className='font-bold text-3xl'>{message || 'Loading message...'}</p>
      <Button variant="outline">Click Me</Button>
    </div>
  );
}

export default App
