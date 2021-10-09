import { GetStaticProps } from 'next'
import Head from 'next/head'
import { TField } from '../types/article'
import { createClient, Entry } from 'contentful'
import Layout from '../components/Layout'
import { Articles } from '../components/Articles'

type THomeProps = {
	articles: Entry<TField>[]
}

const Home = ({ articles }: THomeProps): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>Blog Articles List</title>
				</Head>
				<Articles articles={articles} />
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
