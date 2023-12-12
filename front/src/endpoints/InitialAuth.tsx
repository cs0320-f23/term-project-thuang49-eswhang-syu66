import { useEffect, useState } from 'react';

export function InitialAuth() {
  const [authUrl, setAuthUrl] = useState('');
  const[error, setError] = useState<string>('')

  useEffect(() => {
    async function fetchAuthUrl(){
      const authEndpoint: string = 'http://localhost:3000/client_auth';

      const response = await fetch(authEndpoint).then((res) => res.json());

      console.log(response);

      if (response.status === 'success') {
        setAuthUrl('http://localhost:3000/auth');
      } else {
        setError('Could not proceed with the user flow; please refresh or contact admin.')
        setAuthUrl('#');
      }
    };

    fetchAuthUrl();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <a href={authUrl}>
        <button className="get-started-button">Authenticate</button>
      </a>
      <p>{error}</p>
    </div>
  );
}
