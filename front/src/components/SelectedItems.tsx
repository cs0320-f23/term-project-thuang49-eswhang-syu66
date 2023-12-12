// import React, { useState, useEffect } from 'react';

interface prop {
  seedsMap: Map<string, string[]>;
  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;

  seedInfo: string[];
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
export function SelectedItems(props: prop) {
  /**
   * unselects something (removes a track or a song) from the shared state objects.
   * @param category track or artist
   * @param id the id of the object.
   */
  function unselect(category: string, id: string) {
    props.setSelectedSeeds(
      props.selectedSeeds.filter((obj) => !obj.includes(id))
    );
    const existing = props.seedsMap.get(category);
    console.log(category);
    console.log(existing);
    if (existing !== undefined) {
      props.seedsMap.set(
        category,
        existing.filter((obj) => obj != id)
      );
    }
  }

  return (
    <div
      className={"selected-seed-" + props.seedInfo[1] + " selected-seed"}
      onClick={() => {
        unselect(props.seedInfo[1], props.seedInfo[0]);
      }}
    >
      <img src={props.seedInfo[3]} alt="Item" />
      <p>{props.seedInfo[2]}</p>
      <div>
        <b className="close">✕</b>
      </div>
    </div>
  );
}
