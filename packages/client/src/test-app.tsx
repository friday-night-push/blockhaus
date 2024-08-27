import { useEffect } from 'react';

import styles from './test-app.module.css';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:3001/api/v1`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <div className={styles.title}>Hello world :)</div>;
}

export default App;
