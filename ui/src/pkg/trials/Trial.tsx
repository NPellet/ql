import { useContext, useState } from "react";
import { Trial } from "./types";
import { RunLogic } from "./Run";
import { TrialSelection } from "./SelectTrial";
import { CurrentTrialContext } from "./Context";
import { logToServer } from "../utils/uselog";

export const TrialLogic = ( props: React.PropsWithChildren) => {
  const [controlDone, setControlDone] = useState<boolean>(false);
  const selectedTrial = useContext(CurrentTrialContext);
  logToServer(`Using now control images`);

  if (controlDone == false) {
    return (
      <RunLogic
        key="Control"
        type="Control"
        run={selectedTrial.trial!.Control}
        done={() => {
          logToServer(`Using now test images`);
          setControlDone(true);
        }}
      ></RunLogic>
    );
  }

  return (
    <RunLogic
    key="Trial"

      type="Test"
      run={selectedTrial.trial!.Trial}
      done={() => {
        logToServer(`Resetting tray`);
        selectedTrial.setTrial(null);
      }}
    ></RunLogic>
  );
};
