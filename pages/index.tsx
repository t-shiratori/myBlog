import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from 'contentful'
import { Layout } from './layout'

const Home: NextPage = ({ articles }) => {
	console.log('articles:', articles)
	return (
		<Layout>
			<>
				<Head>
					<title>Blog Articles List</title>
				</Head>
				<ul>
					{articles.map(({ fields, sys }) => (
						<li className="mb-3 pb-3 border-b-[1px]" key={sys.id}>
							<Link href={`/posts/${fields.slug}`}>
								<a className="underline">{fields.title}</a>
							</Link>
						</li>
					))}
				</ul>
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
