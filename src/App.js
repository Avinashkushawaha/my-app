
import React, { useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client"

const style = {
    letterContainer: {
        overflow: "auto",
        marginBottom: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    letter: {
        float: "left",
        padding: "10px 10px",
        background: "#c9e4ed",
        borderRadius: "5px",
        marginRight: "5px",
        marginTop: "5px",
        cursor: "pointer",
    },
    outputString: {
        marginTop: "20px",
        textAlign: "center",
    },
}

const Tile = ({ letter, outputArray, setOutputArray, tally, setTally }) => {
    const onClick = useCallback(() => {
        setTally((prevTally) => {
            const newTally = { ...prevTally }
            if (!newTally[letter]) {
                newTally[letter] = 1
                setOutputArray((prevArray) => [...prevArray, letter])
            } else if (newTally[letter] === 2) {
                newTally[letter] = 0
                setOutputArray((prevArray) => [...prevArray.slice(0, prevArray.length - 2), "_"])
            } else {
                newTally[letter] += 1
                setOutputArray((prevArray) => [...prevArray, letter])
            }
            return newTally
        })
    }, [letter, setOutputArray, setTally])

    return (
        <button type="button" onClick={onClick} style={style.letter}>
            {letter}
        </button>
    )
}

const Application = () => {
    const [outputArray, setOutputArray] = useState([])
    const [tally, setTally] = useState({})

    const alphabetArray = useMemo(() => {
        return Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65))
    }, [])

    return (
        <section>
            <aside style={style.letterContainer} id="letterContainer">
                {alphabetArray.map((letter) => (
                    <Tile
                        key={letter} // Use the letter itself as the key
                        tally={tally}
                        setTally={setTally}
                        letter={letter}
                        outputArray={outputArray}
                        setOutputArray={setOutputArray}
                    />
                ))}
            </aside>
            <div style={style.outputString} id="outputString">
                {outputArray.join("")}
            </div>
        </section>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Application />)
export default Application;

