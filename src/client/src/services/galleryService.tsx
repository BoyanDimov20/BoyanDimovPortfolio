import { useQuery } from "react-query";
import { queryConfig } from "./queries";

type ImageProperties = {
    id: string,
    url: string,
    title: string,
    username: string
};

const fetchImages = async () => {

    const images = await fetch(queryConfig.getImages.url, {
        credentials: 'include'
    });

    return await images.json();
    
};

export const useImages = () => {
    const query = useQuery(queryConfig.getImages.queryKey, fetchImages, {
		staleTime: 10000,
        refetchOnWindowFocus: false
	});
    return query.data as ImageProperties[];
}