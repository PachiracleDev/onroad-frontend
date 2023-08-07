import { MessageT } from "@/pages/panel/chat";
import { apiChat } from ".";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getOldMessages = async ({ queryKey, pageParam }: any) => {
	const [_key, { conversationId }] = queryKey;

	const response = await apiChat.get(
		`/chats/get-messages?conversationId=${conversationId}&lastId=${pageParam}`
	);
	return response.data;
};

export const useGetOldMessages = (conversationId: string | null) => {
	return useInfiniteQuery<MessageT[]>({
		queryKey: ["conversations", { conversationId }],
		queryFn: getOldMessages,
		enabled: !!conversationId,
		refetchOnWindowFocus: false,
		getPreviousPageParam: (lastPage) => {
			return lastPage[0]?.id ?? undefined;
		},
	});
};
