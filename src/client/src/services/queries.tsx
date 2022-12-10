
export const queryConfig = {
    getImages: {
        queryKey: 'images',
        url: '/api/image'
    },

    getCommentByImageId: {
        queryKey: (imageId : string) => ['comments', imageId, 'auth'],
        url: (imageId : string) => `/api/comment?imageId=${imageId}`,
        invalidationQueryKey: 'comments'
    },

    getCurrentUser: {
        queryKey: 'me',
        url: '/auth/me'
    }
}