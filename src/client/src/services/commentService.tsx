import { useState } from "react";
import { useQuery } from "react-query";

export type CommentServiceProperties = {
    id: string,
    content: string,
    username: string,
    isEditable: boolean
};

const fetchComments = async (imageId : string) => {

    const images = await fetch(`/api/comment?imageId=${imageId}`, {
        credentials: 'include'
    });

    return await images.json();
    
};

export const useComments = (imageId : string) => {

    const query = useQuery(['comments', imageId, 'auth'], () => fetchComments(imageId), {
		staleTime: 10000,
        refetchOnWindowFocus: false
	});
    
    return query.data as CommentServiceProperties[];
}