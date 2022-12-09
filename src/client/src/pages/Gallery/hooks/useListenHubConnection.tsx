import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";


const useListenHubConnection = (connection : HubConnection | undefined, methodName: string, callback: (...params : any[]) => void) => {
    useEffect(() => {
        connection?.on(methodName, callback);

    }, [connection]);
};

export default useListenHubConnection;