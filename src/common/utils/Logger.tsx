type LoggerType = "info" | "warn" | "error" 

const logMessage = (logType:LoggerType, message : string) => {
    const timestamp = new Date().toISOString();
    const formattedMsg = `[${logType.toUpperCase()}] ${timestamp} — ${message}`;
    switch(logType) {
        case "info":
            console.log(formattedMsg);
            break;
        case "warn":
            console.warn(formattedMsg);
            break;
        case "error":
            console.error(formattedMsg)
            break
    }
}

export const logger =  {
    "info" : (message:string) => {
        logMessage("info", message)
    },
    "warn" : (message:string) => {
        logMessage("warn", message)
    },
    "error" : (message:string) => {
        logMessage("error", message)
    }
}