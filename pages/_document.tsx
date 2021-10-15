import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render(): JSX.Element {
		return (
			<Html className="bg-gray-200">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
						rel="stylesheet"
					/>

					{/* Google Analytics */}
					{GA_TRACKING_ID && (
						<>
							<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
							<script
								dangerouslySetInnerHTML={{
									__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${GA_TRACKING_ID}', {
									page_path: window.location.pathname,
								});
							`,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
