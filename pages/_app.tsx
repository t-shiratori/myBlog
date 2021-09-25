import { AppProps } from 'next/app'
import '../styles/global.css'
import '../styles/prism-night-owl.css'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
