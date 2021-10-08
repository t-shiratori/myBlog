import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient, Entry, TagCollection } from 'contentful'
import { TField } from '../../types/article'
import Layout from '../../components/Layout'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

type TTagPostProps = {
	articles: Entry<TField>[]
	tagName: string
}

const Tags = ({ articles, tagName }: TTagPostProps): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>{tagName}</title>
				</Head>
				<ul>
					{articles.map(({ fields, sys }) => (
						<li className="text-gray-900 mb-3 pb-3 border-b-[1px]" key={sys.id}>
							<Link href={`/posts/${fields.slug}`}>
								<a className="underline hover:no-underline">{fields.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</>
		</Layout>
	)
}

export default Tags

export const getStaticPaths: GetStaticPaths = async () => {
	const tags: TagCollection = await client.getTags()

	const paths = tags.items.map(({ sys }) => ({
		params: { tag: sys.id },
	}))

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { items } = await client.getEntries({ content_type: 'article', 'metadata.tags.sys.id[all]': params?.tag })

	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			articles: items,
		},
		revalidate: 1,
	}
}
