import React, { useContext, useState } from "react";
import { Trial } from "./types";

export const CurrentTrialContext = React.createContext<{
    trial: Trial | null,
    setTrial: (trial: Trial| null) => void
}>({
    trial: {
        TrialName: "",
        Control: [],
        Trial: []
    },
    setTrial: (trial: Trial | null) => {
        return;
    }
});


export const WithTrialContext = (props: React.PropsWithChildren) => {
    const [trial, setTrial] = useState<Trial | null>(null)
    return (
            <CurrentTrialContext.Provider value={
                {
                    trial: trial,
                    setTrial: setTrial
                }
            }>
                { props.children }
            </CurrentTrialContext.Provider>
)}

export const ResetCurrentTrial = () => {
    const currentTrialCtx = useContext( CurrentTrialContext )
    return <button type="button" className="btn btn-warning" onClick={() => {
        currentTrialCtx.setTrial(null)
    }}>Reset Trial</button>
}
