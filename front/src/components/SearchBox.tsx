import { useEffect, useState } from "react"



export function SearchBox() {
    const[search, setSearch] = useState<string>("")

    // edit this to allow for songs as well.
    async function fetchData() {
        try {
            let url = `http://localhost:3000/search_artist?artist=${encodeURIComponent(search)}`
            console.log(url)
          const response = await fetch(`http://localhost:3000/search_artist?artist=${encodeURIComponent(search)}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error during fetch:');
        }
      }
    
      useEffect(() => {
        console.log(search);
        fetchData();
      }, [search]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        
        <div className = "search-box">
            <input type = "search" placeholder="Beyonce" onChange = {handleChange}></input>
        </div>
    )
}