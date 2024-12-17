import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchComments, likeCommentOnAStrategy } from './apis';

const useComments = (strategyId: string) => {
  return useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => fetchComments(strategyId, pageParam),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
    initialPageParam: '',
  });
};

const useLikeCommentMutation = (strategyId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeCommentOnAStrategy(commentId),
    onMutate: async () => {
      const queryKey: any = ['feedDetail', strategyId];

      await queryClient.cancelQueries(queryKey);

      const previousFeed = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          comments: oldData.comments?.map((comment: any) =>
            comment.id === commentId
              ? {
                  ...comment,
                  isLiked: true,
                  likesCount: comment.likesCount + 1,
                }
              : comment
          ),
        };
      });

      return { previousFeed };
    },
    onError: (err, _, context) => {
      const queryKey = ['feedDetail', strategyId];

      if (context?.previousFeed) {
        queryClient.setQueryData(queryKey, context.previousFeed);
      }

      console.log('Error liking comment:', err);
    },
    onSettled: () => {
      const queryKey: any = ['feedDetail', strategyId];

      queryClient.invalidateQueries(queryKey);
    },
  });
};

export { useComments, useLikeCommentMutation };
