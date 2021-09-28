import { AppProps } from 'next/app'
import '../styles/global.css'
import '../styles/prism-night-owl.css'
import '../styles/article/content.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return <Component {...pageProps} />
}
