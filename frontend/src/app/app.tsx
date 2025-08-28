import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api') // hoặc '/' nếu bạn set proxy
      .then(res => res.json())
      .then(json => setData(json.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend gọi backend:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
