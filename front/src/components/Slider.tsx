import { useEffect, useState } from "react";

interface prop {
    feat: string,
    featMap: Map<String, Number>
}

export function Slider(props: prop) {
    const [min, setMin] = useState<number>(30);
    const [max, setMax] = useState<number>(60);

    useEffect(() => {

        console.log(min);
        console.log(max);
        props.featMap.set("max_" + props.feat, Math.max(min, max)/100)
        props.featMap.set("min_"+ props.feat, Math.min(min, max)/100)
        console.log(props.featMap)
    }, [min, max]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMin(Number(event.target.value));
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMax(Number(event.target.value));
    };

    return (
    
            <div className = "slide-container">
                <label>{Math.min(min, max)}</label>
                <div className = "double-slider">
                    <input type="range" min="0" max="100" value={min} onChange={handleMinChange}
                    style = {{background: `linear-gradient(to right, transparent ${Math.min(min, max)}%, #C5C5C5 ${Math.min(min, max)}% ${Math.max(min, max)}%, transparent ${Math.max(min, max)}%)`}}></input>
                    <input type="range" min="0" max="100" value={max} onChange={handleMaxChange}
                    style = {{background: `linear-gradient(to right, transparent ${Math.min(min, max)}%, #C5C5C5 ${Math.min(min, max)}% ${Math.max(min, max)}%, transparent ${Math.max(min, max)}%)`}}></input>
                </div>
                <label>{Math.max(min,max)}</label>
            </div>

        
    );
}