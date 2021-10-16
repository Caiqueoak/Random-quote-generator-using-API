export function Quote(props: any) {
	return (
		<>
			{props.quote}
			<p style={{ color: props.color, transition: props.transition }} id="author" className=" text-end">
				- {props.author}
			</p>
		</>
	);
}
