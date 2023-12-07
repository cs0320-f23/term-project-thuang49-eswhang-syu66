interface sharedProps {
    featNames : string[], 
    setFeatNames : React.Dispatch<React.SetStateAction<never[]>>, 
    featsMap: Map<String, Number>
  }

export function SelectFeatsPage(props :sharedProps) {
    return (
        <>
          <body>
            <main className="container-fluid">
              <nav className="row flex-nowrap">
                <h2>Amplify</h2>
              </nav>
            </main>
          </body>
        </>
      );
}