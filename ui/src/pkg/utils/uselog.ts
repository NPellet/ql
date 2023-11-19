
export function logToServer( message: string ) {
    fetch("http://localhost:8080/log", {
        method: "POST",
        body: message
    } )
}
