import { UserAuth } from "../endpoints/UserAuth";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function ResultsPage() {

    let [searchParams] = useSearchParams();

    useEffect(() => {
      const authToken = searchParams.get("success")
      if (authToken == null) {
        console.log("don't do anything")
      } else {
        console.log("do something with the token ")
      }
    })

    return (
      <>
        <body>
          <main className="container-fluid">
            <nav className="row flex-nowrap">
              <a href = "/">
                <h2>Amplify</h2>
              </a>
              <UserAuth></UserAuth>
            </nav>
          </main>
        </body>
      </>
    );
  }