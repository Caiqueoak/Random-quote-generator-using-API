export function ShareButton(props: any) {
	const url =
		props.id == "tweet-quote"
			? props.url + encodeURIComponent(`"${props.quote}" \n- ${props.author}\n`)
			: props.url +
			  encodeURIComponent(props.author) +
			  "&content=" +
			  encodeURIComponent(props.quote) +
			  "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

	return (
		<a id={props.id} href={url} target="_blank">
			<i
				style={{ backgroundColor: props.backgroundColor }}
				className={props.iconClass}
			></i>
		</a>
	);
}
