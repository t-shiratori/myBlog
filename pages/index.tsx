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

	const res = await client.getEntries({ content_type: 'article' })

	return {
		props: {
			articles: res.items,
		},
		revalidate: 1,
	}
}
