import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { TField } from '../types/article'
import { createClient, Entry } from 'contentful'
import Layout from '../components/Layout'
import homeStyles from '../styles/home.module.css'

type THomeProps = {
	articles: Entry<TField>[]
}

const Home = ({ articles }: THomeProps): JSX.Element => {
	console.log('articles:', articles)
	return (
		<Layout>
			<>
				<Head>
					<title>Blog Articles List</title>
				</Head>
				<ul>
					{articles.map(({ fields, sys, metadata }) => (
						<li className="text-gray-900 mb-3 pb-3" key={sys.id}>
							<div className="bg-white">
								<Link href={`/posts/${fields.slug}`}>
									<a className="block rounded-sm p-6 border-[3px] border-gray-500 hover:border-gray-300 box-border">
										<span className="text-xl">{fields.title}</span>
										<div className="flex mt-4 text-sm">
											<span>Category:</span>
											<ul className={`flex ml-1 ${homeStyles.tagList}`}>
												{metadata.tags.map(({ sys }) => (
													<li className="text-gray-600" key={sys.id}>
														{sys.id}
													</li>
												))}
											</ul>
										</div>
									</a>
								</Link>
							</div>
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
