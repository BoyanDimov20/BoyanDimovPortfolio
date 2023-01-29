import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";


const useHubConnection = (hubName: string, afterStartedConnection?: (connection: HubConnection) => void) => {

    const [connection, setConnection] = useState<HubConnection>();

    const url = process.env.NODE_ENV == 'production' ? process.env.PUBLIC_URL : 'https://localhost:7186/';

    useEffect(() => {
        try {
            const connectionBuilder = new HubConnectionBuilder()
                .withUrl(url + hubName)
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