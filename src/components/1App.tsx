import { useEffect, useState } from "react";
import { Quote } from "./2Quote";
import { ShareButton } from "./2ShareButton";

const shareButtons = [
	{ id: "tweet-quote", url: "", iconClass: "fab fa-twitter text-white" },
	{ id: "tumblr-quote", url: "", iconClass: "fab fa-tumblr text-white" },
];

export function App(props: any): JSX.Element {
	const generateRandomColor = () =>
		Math.round(Math.random() * Math.pow(256, 3)).toString(16);

	const generateRandomQuote = () =>
		Math.round(Math.random() * Array(null).length);

	const [bgColor, setBgColor] = useState(generateRandomColor());
	const [opacity, setOpacity] = useState("0");
	const [transition, setTransition] = useState("none");
	const [quote, setQuote] = useState(undefined);
	const [author, setAuthor] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const hexBgColor = `#${bgColor}`;

	useEffect(() => {
		setOpacity("0");
		async function fetchQuotes() {
			const response = await fetch(
				"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
			);
			const quotes = await response.json();

			const index = Math.round(Math.random() * (quotes["quotes"].length - 1));
			const quote = quotes["quotes"][index]["quote"];
			const author = quotes["quotes"][index]["author"];

			setQuote(quote);
			setAuthor(author);
			setLoading(false);
		}
		setTimeout(() => {
			setOpacity("1");
		}, 750);
		fetchQuotes();
	}, [bgColor]);

	return (
		<>
			{loading ? (
				<div id="loading">Loading...</div>
			) : (
				<div id="main-container" style={{ backgroundColor: hexBgColor }}>
					<main id="quote-box">
						{/* QUOTE */}
						<div style={{ color: hexBgColor, opacity: opacity, transition: transition }} id="text">
							<i
								style={{ color: hexBgColor, transition: transition }}
								className="fas fa-quote-left"
							></i>
							<Quote quote={quote} author={author} transition={transition} color={hexBgColor} />
						</div>

						<section id="buttons-container">
							<article id="share-buttons">
								{/* SHARE BUTTONS */}
								{shareButtons.map((button) => (
									<ShareButton
										id={button.id}
										key={button.id}
										backgroundColor={hexBgColor}
										iconClass={button.iconClass}
									/>
								))}
							</article>

							{/* NEW QUOTE BUTTON */}
							<button
								style={{ backgroundColor: hexBgColor }}
								className="text-white"
								id="new-quote"
								onClick={() => setBgColor(generateRandomColor())}
							>
								New quote
							</button>
						</section>
					</main>
				</div>
			)}

			<footer>
					Coded by {' '}
					<a href="https://github.com/Caiqueoak/Random-quote-generator-using-API" target='_blank'>
						Caiqueoak
					</a>
					.
			</footer>
		</>
	);
}
