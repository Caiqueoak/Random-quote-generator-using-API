export function ShareButton(props: any) {
	return (
		<a id={props.id} href="http://twitter.com/intent/tweet" target='_blank'>
			<i
				style={{ backgroundColor: props.backgroundColor }}
				className={props.iconClass}
			></i>
		</a>
	);
}
