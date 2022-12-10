import { useQuery, useQueryClient } from "react-query";
import { queryConfig } from "./queries";

type UserProperties = {
    id: string,
    isAuthenticated: boolean,
    name: string,
    username: string
};
const fetchCurrentUser = async () => {
    const response = await fetch(queryConfig.getCurrentUser.url, {
        credentials: 'include'
    });

    return await response.json();
}

export const useCurrentUser = () => {
    const queryClient = useQueryClient();

    const query = useQuery(queryConfig.getCurrentUser.queryKey, fetchCurrentUser, {
        staleTime: 10000,
        refetchOnWindowFocus: false
    });

    if (query.isSuccess) {
        queryClient.invalidateQueries('auth');
    }

    return query.data as UserProperties;
}