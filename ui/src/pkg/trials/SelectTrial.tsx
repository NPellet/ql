import { useContext } from "react";
import { CurrentTrialContext } from "./Context";
import { useFetchTrials } from "./hook";

export const WithTrial = (props: React.PropsWithChildren) => {
    const trialCtx = useContext(CurrentTrialContext);

    if ( trialCtx.trial == null ) {
        return (
            <div>
                <div>Please select a tray</div>
                <TrialSelection />
            </div>
        )
    }

    return <>{props.children}</>
}

export const TrialSelection = () => {
    const [ loadingTrials, errorLoadingTrials, trials ] = useFetchTrials()
    const currentTrialCtx = useContext( CurrentTrialContext )
    if (loadingTrials) {
        return <p>Loading trials...</p>
    } else if (errorLoadingTrials) {
        return <p>There was an error loading trials</p>
    } else {
        return <ul className="list-group">
            {
                trials.map((trial ) => {
                    return <li className="list-group-item" onClick={() => {
                        currentTrialCtx.setTrial(trial)
                    }}>Tray: {trial.TrialName} </li>  
                })
            }
        </ul>
    }
}
