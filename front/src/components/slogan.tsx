import { useEffect, useState } from "react";


export function Slogan() {
    type FadeProp = { fade: 'fade-in' | 'fade-out' } 

    const [i, setI] = useState(0);
    const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: 'fade-in' })

    const purposes: string[] = [ "dancing", "studying",  "running", "everything"]

    useEffect(() => {
        const fadeTimeout = setInterval(() => {
            if (i < purposes.length - 1) {
                setFadeProp((prevFadeProp) => ({
                    fade: prevFadeProp.fade === 'fade-in' ? 'fade-out' : 'fade-in',
                  }));
            } else {
                clearInterval(fadeTimeout)
            }

        }, 1000)

        return () => clearInterval(fadeTimeout)
    }, [fadeProp])

    useEffect(() => {
        const wordTimeout = setInterval(() => {
            if (i < purposes.length - 1) {
                setI( i + 1)
            } else {
                clearInterval(wordTimeout)
            }
        }, 2000)

        return () => clearInterval(wordTimeout)
    }, [i])

  
    return (
        <h1>A playlist for: <span className = {fadeProp.fade}>{purposes[i]}</span></h1>
    );
  }
