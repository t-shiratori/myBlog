import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { createClient, Entry, TagCollection } from 'contentful'
import { TField } from '../../types/article'
import Layout from '../../components/Layout'
import { Articles } from '../../components/Articles'

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
				<Articles articles={articles} />
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
	// params.tag には [tag].tsx の tag の値が入ってくる
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
