import React, { useState } from 'react';
import { logToServer } from '../utils/uselog';

export const UserContext = React.createContext({
    username: '',
    setUsername: (username: string) => { }
});

export const WithUserContext = ( props: React.PropsWithChildren ) => {
    const [username, setUsername] = useState<string>('')
    return (
            <UserContext.Provider value={
                {
                    username: username,
                    setUsername: setUsername
                }
            }>
                { props.children }
            </UserContext.Provider>
)}

export const UsernameField = () => {
    const userCtx = React.useContext(UserContext);
    const [ localUsername, setUsername ] = useState<string>('');
    return (
        <form>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" placeholder="Username" value={localUsername} onChange={(e) => { setUsername(e.target.value) }} />
                <label>Username: </label>
            </div>
            {localUsername.length > 0 ? <button type="button" className="btn btn-primary"  onClick={() => {
                userCtx.setUsername(localUsername);
                logToServer(`New user: ${localUsername}`)
                }} >Submit</button> : null}
                </form>
    )
}

export const WithUsername = ( props: React.PropsWithChildren) => {
    const userCtx = React.useContext(UserContext);

    if ( userCtx.username == '' ) {
        return (
            <div>
                <UsernameField />
            </div>
        )
    }

    return <>{props.children}</>
}
