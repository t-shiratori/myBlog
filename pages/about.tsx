import { GetStaticProps } from 'next'
import Head from 'next/head'
import { TField } from '../types/article'
import { createClient, Entry } from 'contentful'
import Layout from '../components/Layout'
import AboutStyles from '../styles/about.module.css'

type THomeProps = {
	articles: Entry<TField>[]
}

const Home = ({ articles }: THomeProps): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>About</title>
				</Head>
				<div className={AboutStyles.about}>
					<p>こちらのサイトは以下の技術スタックで作成されてます。</p>
					<ul>
						<li>Next.js</li>
						<li>TypeScript</li>
						<li>tailwindcss</li>
						<li>Cotentful</li>
					</ul>
					<h3>[SNS]</h3>
					<ul>
						<li>
							<a href="https://twitter.com/bird_wt" target="_blank" rel="noreferrer">
								Twitter
							</a>
						</li>
						<li>
							<a href="https://codepen.io/tksiiii/" target="_blank" rel="noreferrer">
								Code Pen
							</a>
						</li>
					</ul>
				</div>
			</>
		</Layout>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID as string,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
	})

	const getArticleParams: { [key: string]: string } = { content_type: 'article' }

	if (process && process.env.NODE_ENV === 'production') {
		// プロダクションの場合はダミーの記事を除外する
		getArticleParams['metadata.tags.sys.id[nin]'] = 'dummyArticle'
	}

	const { items } = await client.getEntries(getArticleParams)

	return {
		props: {
			articles: items,
		},
		revalidate: 1,
	}
}
