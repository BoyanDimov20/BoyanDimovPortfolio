import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";


const useHubConnection = (hubName: string, afterStartedConnection?: (connection: HubConnection) => void) => {

    const [connection, setConnection] = useState<HubConnection>();

    useEffect(() => {
        try {
            const connectionBuilder = new HubConnectionBuilder()
                .withUrl('https://localhost:7186/' + hubName)
                .configureLogging(LogLevel.Information)
                .build();

            connectionBuilder.start().then(() => {
                console.log('Connection started');
                setConnection(connectionBuilder);

                if (afterStartedConnection)
                    afterStartedConnection(connectionBuilder);

            });

            return () => {
                connectionBuilder.stop();
            }

        } catch (error) {
            console.log(error);
        }


    }, []);

    return connection;
};

export default useHubConnection;