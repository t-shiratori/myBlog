import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/global.css'
import '../styles/prism-night-owl.css'
import '../styles/article/content.css'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	// Google Analytics用の処理
	const router = useRouter()
	useEffect(() => {
		const handleRouteChange = (url: string) => {
			gtag.pageview(url)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return <Component {...pageProps} />
}
