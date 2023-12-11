import { useEffect, useState } from "react";

interface prop {
  toAdd: string;

  list: string[];

  listSetter: React.Dispatch<React.SetStateAction<string[]>>;
}

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

  return (
    <button className={"select-button" + clicked} onClick={onButtonClick}>
      {props.toAdd}
    </button>
  );
}
