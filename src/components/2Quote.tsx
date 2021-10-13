export function Quote(props: any) {
	return (
		<>
			{props.quote}
			<p style={{ color: props.color }} id="author" className=" text-end">
				- {props.author}
			</p>
		</>
	);
}
