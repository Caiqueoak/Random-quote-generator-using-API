import { useEffect, useState } from "react";
import { Quote } from "./2Quote";
import { ShareButton } from "./2ShareButton";

const shareButtons = [
	{ id: "tweet-quote", url: "", iconClass: "fab fa-twitter text-white" },
	{ id: "tumblr-quote", url: "", iconClass: "fab fa-tumblr text-white" },
];

const colors = [
	"#16a085",
	"#27ae60",
	"#2c3e50",
	"#f39c12",
	"#e74c3c",
	"#9b59b6",
	"#FB6964",
	"#342224",
	"#472E32",
	"#BDBB99",
	"#77B1A9",
	"#73A857",
];

export function App(props: any): JSX.Element {
	const generateRandomColor = () =>
		colors[Math.round(Math.random() * colors.length)];

	const [bgColor, setBgColor] = useState(generateRandomColor());
	const [opacity, setOpacity] = useState("0");
	const [quote, setQuote] = useState(undefined);
	const [author, setAuthor] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setOpacity("0");
		setTimeout(() => {
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
			fetchQuotes();
		}, 500);
		setTimeout(() => {
			setOpacity("1");
		}, 500);
	}, [bgColor]);

	return (
		<>
			{loading ? (
				<div id="loading">Loading...</div>
			) : (
				<div id="main-container" style={{ backgroundColor: bgColor }}>
					<main id="quote-box">
						{/* QUOTE */}
						<div
							style={{
								color: bgColor,
								opacity: opacity,
							}}
							id="text"
						>
							<i style={{ color: bgColor }} className="fas fa-quote-left"></i>
							<Quote quote={quote} author={author} color={bgColor} />
						</div>

						<section id="buttons-container">
							<article id="share-buttons">
								{/* SHARE BUTTONS */}
								{shareButtons.map((button) => (
									<ShareButton
										id={button.id}
										key={button.id}
										backgroundColor={bgColor}
										iconClass={button.iconClass}
									/>
								))}
							</article>

							{/* NEW QUOTE BUTTON */}
							<button
								style={{ backgroundColor: bgColor }}
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
				Coded by{" "}
				<a
					href="https://github.com/Caiqueoak/Random-quote-generator-using-API"
					target="_blank"
				>
					Caiqueoak
				</a>
				.
			</footer>
		</>
	);
}
