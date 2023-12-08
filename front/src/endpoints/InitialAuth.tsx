import { useNavigate } from "react-router-dom";
// import { sharedProps } from '../App';

export function InitialAuth() {
  const nav = useNavigate();
  let error: string = "";

  async function auth() {
    const authEndpoint: string = "http://localhost:3000/client_auth";

    const response = await fetch(authEndpoint).then((res) => res.json());

    console.log(response);

    if (response.status === "success") {
      nav("/feats");
    } else {
      error =
        "Could not proceed with user flow; please refresh or contact admin.";
    }
  }

  return (
    <div>
      <button onClick={auth}>Get Started</button>
      <p>{error}</p>
    </div>
  );
}
