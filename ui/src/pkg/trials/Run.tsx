import { useContext, useMemo, useState } from "react";
import { CurrentTrialContext } from "./Context";
import type {  TrialRun } from "./types";
import { logToServer } from "../utils/uselog";
import { UserContext } from "../username/Username";

export const Run = (props: { run: TrialRun, done: () => void }) => {
  const trialSelectedCtx = useContext(CurrentTrialContext);
  const trialSelected = trialSelectedCtx.trial;

  const [started, setStarted] = useState<boolean>(false);
  const [countDown, setCountdown] = useState<number>(5);

  if (countDown == 0) {
    props.done()
  }

  return <div className="d-flex justify-content-center">{
    !started ?
      <button
        className="btn btn-primary"
        onClick={() => {
          setStarted(true);
          setInterval(() => {
            setCountdown((val: number) => {
              return val - 1;
            });
          }, 1000);
        }}
      >
        Start
      </button>
      : (countDown > 0 ? <p>Starting in {countDown}s...</p> : null)
  }</div>
};

export const ImagesForRun = (props: {
  run: TrialRun;
  enable: number | false;
  next: () => void;
}) => {
  return <div className="" style={{ height: "1000px" }} onClick={() => { if (props.enable === false) return; props.next() }}><div className="d-flex justify-content-center">{props.run.map((image, index) => {
    return (
      <img
        src={"images/" + image}
        style={{ width: "30%"}}
        className={props.enable !== false && props.enable == index ? "d-block" : "d-none"}
      />
    )
  })}</div></div>
};

export const RunLogic = (props: {
  type: string;
  run: TrialRun;
  done: () => void;
}) => {
  const num = props.run.length;
  // Make an array of num elements from 0 to num-1, shuffled
  const shuffled = useMemo(() => {
    return Array.from(Array(num).keys()).sort(() => Math.random() - 0.5);
  }, []);

  const [position, setPosition] = useState<number>(-1);
  const [time, setTime] = useState<number>(Date.now());
  const currentUser = useContext(UserContext);
  const next = () => {
    if (position == 8) {
      props.done();
    }
    const newDate = Date.now();
    const ellapsed = newDate - time;

    logToServer(
      `User ${currentUser.username}\timg ${props.run[position]}}\t${ellapsed}ms`
    );

    setPosition((pos) => pos + 1);
    setTime(newDate);
  };
  return (
    <>
      <h2>Selecting from the {props.type} tray</h2>
      {position == -1 ?
        <Run key={ props.type } run={props.run} done={next} /> : null}
      <ImagesForRun run={props.run} enable={position == -1 ? false : shuffled[position]} next={next} />
     
    </>
  );
};
