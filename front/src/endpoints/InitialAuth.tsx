import { useEffect, useState } from "react";

export function InitialAuth() {
  const [authUrl, setAuthUrl] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchAuthUrl() {
      const authEndpoint: string = "http://localhost:3000/client_auth";

      const response = await fetch(authEndpoint).then((res) => res.json());

      console.log(response);

      if (response.status === "success") {
        setAuthUrl("http://localhost:3000/auth");
      } else {
        setError(
          "Could not proceed with the user flow; please refresh or contact admin."
        );
        setAuthUrl("#");
      }
    }

    fetchAuthUrl();
  }, []); //runs once upon rendering

  return (
    <div>
      <a href={authUrl}>
        <button className="get-started-button">Get started</button>
      </a>
      <p>{error}</p>
    </div>
  );
}
