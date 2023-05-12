import { useState } from "react";
import { Avatar } from "../mainComponents/user";
import { Reply, Repost, Quote, Post } from "../widgets/posType";
import { TextInput } from "../widgets/modalsWidget";
import { MediaButtons } from "../widgets/myButtons";

import "./TLElements.css";

export const Status = ({ userProfile }) => {
	return (
		<div className="status-container">
			<div className="user-status">
				<Avatar userProfile={userProfile} />
			</div>
			<div className="form-container">
				<form action="">
					<TextInput />
					<div className="selected-files"></div>
					<div className="status-btn">
						<MediaButtons />
						<input type="submit" value="Tweet" />
					</div>
				</form>
			</div>
		</div>
	);
};

export const Fleet = ({ userProfile }) => {
	return (
		<div className="fleet">
			<Avatar userProfile={userProfile} />
		</div>
	);
};

export const Feed = () => {
	const [userTL, setUserTL] = useState(null);

	fetch("/feed", {
		method: "Get",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setUserTL(data);
		});

	function renderTL() {
		const { user, posts, replies, quotes, reposts } = userTL;

		const allPosts = posts.concat(replies, quotes, reposts);

		for (let i = allPosts.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
		}

		return (
			<>
				{allPosts &&
					allPosts.map((singlePost) => {
						if (singlePost.is_post === true) {
							return <Post post={singlePost} />;
						} else if (singlePost.is_reply === true) {
							return <Reply reply={singlePost} />;
						} else if (singlePost.is_quote === true) {
							return <Quote quote={singlePost} />;
						} else if (singlePost.is_repost === true) {
							return <Repost repost={singlePost} />;
						}
						return null;
					})}
			</>
		);
	}
	return renderTL();
};
