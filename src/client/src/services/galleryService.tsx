import { useQuery } from "react-query";

type ImageProperties = {
    id: string,
    url: string
};

const fetchImages = async () => {

    const images = await fetch('/api/image', {
        credentials: 'include'
    });

    return await images.json();
    
};

export const useImages = () => {
    const query = useQuery('images', fetchImages, {
		staleTime: 10000,
        refetchOnWindowFocus: false
	});
    return query.data as ImageProperties[];
}