import { graphqlClient } from "@/clients/api"
import { getCurrentuserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['curent-user'],
        queryFn: () => graphqlClient.request(getCurrentuserQuery)
    })

    return {...query, user: query.data?.getCurrentUser};
};