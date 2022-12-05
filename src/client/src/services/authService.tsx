import { useQuery } from "react-query";


type UserProperties = {
    isAuthenticated: boolean,
    username: string
};
const fetchCurrentUser = async () => {
    const response = await fetch('/auth/me', {
        credentials: 'include'
    });

    return await response.json();
}

export const useCurrentUser = () => {

	const query = useQuery('me', fetchCurrentUser, {
		staleTime: 10000
	});
    return query.data as UserProperties;
}