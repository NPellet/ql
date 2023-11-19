import { useEffect, useMemo, useState } from "react";
import { Trials } from "./types";

export function useFetchTrials(): [ boolean, boolean, Trials ] {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [trials, setTrials] = useState<Trials>([]);

    useMemo(() => {
        fetch("http://localhost:8080/trays").then((response) => {
            setLoading(false)
            if (response.status > 399) {
                throw new Error("Bad status code")
            }

            return response.json()
        }).then((response: Trials) => {
            setTrials(response)
        }).catch((error) => {
            setError(true)
        })
    }, [])
    
    return [ loading, error, trials ]
}
