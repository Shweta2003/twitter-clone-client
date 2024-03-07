import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutations } from "@/graphql/mutations/tweet";
import { getAllTweetQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: () => graphqlClient.request(getAllTweetQuery),
    });
    return {...query, tweets: query.data?.getAllTweets}
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutations, {payload}),
        onMutate: () => toast.loading('Creating Tweet', {id: '1'}),
        onSuccess: async() => {await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
        toast.success('Created Successfully', {id: '1'})}
    })

    return mutation;
}