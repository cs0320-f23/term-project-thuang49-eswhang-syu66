interface sharedProps {
    seedNames: string[], 
    setSeedNames: React.Dispatch<React.SetStateAction<never[]>>,
    seedsMap: Map<String, String>
  }

export function SelectSeedsPage(props :sharedProps) {
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