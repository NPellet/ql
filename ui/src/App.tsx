import React, { useContext, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext, WithUserContext, WithUsername } from './pkg/username/Username';
import { useFetchTrials } from './pkg/trials/hook';
import { CurrentTrialContext, ResetCurrentTrial, WithTrialContext } from './pkg/trials/Context';
import { WithTrial } from './pkg/trials/SelectTrial';
import { TrialLogic } from './pkg/trials/Trial';

const Main = () => {
  return <TrialLogic> </TrialLogic>
}

function App() {
  return <div className="container-fluid"><WithTrialContext>
    <WithUserContext>
      <WithUsername>
      <Restart></Restart>
        <WithTrial>
          <div className="btn-group">
        
            <ResetCurrentTrial></ResetCurrentTrial>
            </div>
          <Main></Main>
          </WithTrial>
      </WithUsername>
    </WithUserContext>
  </WithTrialContext>
  </div>
}


const Restart = () => {
  const currentTrialCtx = useContext(CurrentTrialContext)
  const currentUserCtx = useContext(UserContext)

  return <button  type="button" className="btn btn-secondary"  onClick={
    () => {
      currentTrialCtx.setTrial(null)
      currentUserCtx.setUsername('')
    }
  }>Restart</button>
}

export default App;
