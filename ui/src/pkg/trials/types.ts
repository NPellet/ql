
export type TrialRun = Array<string>

export type Trial = {
    TrialName: string
    Trial: TrialRun,
    Control: TrialRun,
}

export type Trials = Array<Trial>

