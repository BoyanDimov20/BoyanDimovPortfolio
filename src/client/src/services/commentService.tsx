import { useState } from "react";
import { useQuery } from "react-query";
import { queryConfig } from './queries';


export type CommentServiceProperties = {
    id: string,
    content: string,
    username: string,
    name: string,
    isEditable: boolean
};

const fetchComments = async (imageId: string) => {

    const images = await fetch(queryConfig.getCommentByImageId.url(imageId), {
        credentials: 'include'
    });

    return await images.json();

};

export const useComments = (imageId: string) => {

    const query = useQuery(queryConfig.getCommentByImageId.queryKey(imageId), () => fetchComments(imageId), {
        staleTime: 10000,
        refetchOnWindowFocus: false
    });

    return query.data as CommentServiceProperties[];
}