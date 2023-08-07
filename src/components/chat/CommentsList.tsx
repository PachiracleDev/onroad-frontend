import Message from "./Message";

import { MessageT } from "@/pages/panel/chat";

function CommentsList({ messages }: { messages: MessageT[] }) {
	return (
		<>
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</>
	);
}

export default CommentsList;
