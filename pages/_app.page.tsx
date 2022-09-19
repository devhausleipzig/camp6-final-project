import "../styles/globals.css";
import type { AppProps } from "next/app";
import BookDescription from "../components/BookDescription/BookDescription";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
