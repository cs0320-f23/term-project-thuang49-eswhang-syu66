import { useEffect, useState } from "react";

interface prop {
  toAdd: string;

  list: string[];

  listSetter: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Component that shows whether a feature parameter has been selected by the
 * user. Used on the Features parameter page.
 * @param props containing shared states
 * @returns component
 */
export function SelectButton(props: prop) {
  const [clicked, setClicked] = useState<string>("");

  useEffect(() => {
    console.log(props.list);
  }, [clicked]);

  function onButtonClick() {
    if (clicked == "") {
      props.listSetter([...props.list, props.toAdd]);
      setClicked("-clicked");
    } else {
      props.listSetter(props.list.filter((obj) => obj != props.toAdd));
      setClicked("");
    }
  }

  // TODO for future: can add the tooltip/feature description here
  return (
    <button
      className={"select-button" + clicked}
      onClick={onButtonClick}
      aria-label={"Feature: " + props.toAdd}
    >
      {props.toAdd}
    </button>
  );
}
