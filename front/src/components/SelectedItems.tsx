// import React, { useState, useEffect } from 'react';



interface prop {
    seedsMap: Map<String, String[]>, 
    selectedSeeds: string[][]
    setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>

    seedInfo: string[] 
    // in the following format: 
    // seedInfo[0] = id
    // seedInfo[1] = category 
    // seedInfo[2] = name
    // seedInfo[3] = picture link
}
/**
 * A component that displays a selected item on the bottom of the screen.
 * @param props an object containing all of the shared states as defined above.
 * @returns component 
 */
export function SelectedItems( props: prop ) {
//   const [queryResult, setQueryResult] = useState<queryResponse | null>(null);

//   useEffect(() => {
//     fetchCall(props.category, props.id);
//     console.log(queryResult)
//   }, []); // Empty dependency array to run only once when the component mounts


//   async function fetchCall(category: String, id: String) {
//     try {
//       const url = `http://localhost:3000/search_id?category=${category}&id=${id}`;
//       const response = await fetch(url).then(res => res.json());

//       console.log(response)

//       if (response.status === "success") {
//         setQueryResult(response);
//       } else {
//         console.error("Faulty request");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

  /**
   * unselects something (removes a track or a song) from the shared state objects.
   * @param category track or artist
   * @param id the id of the object.
   */
  function unselect(category: string, id: string) {
    props.setSelectedSeeds(props.selectedSeeds.filter(obj => !(obj.includes(id))))
    let existing = props.seedsMap.get(category);
    console.log(category)
    console.log(existing)
    if ( existing !== undefined) {
        props.seedsMap.set(category, existing.filter(obj => obj!= id))
    }
}

  return (
        <div className = "selected-seed" onClick = {() => {unselect(props.seedInfo[1], props.seedInfo[0])}}>
          <img src={props.seedInfo[3]} alt="Item" />
          {/* <category : name> */}
          <p>{props.seedInfo[1]} : {props.seedInfo[2]}</p>
          <div><b>✕</b></div>
        </div>
      ) 

}
