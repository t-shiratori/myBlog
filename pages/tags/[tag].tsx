import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { createClient, Entry, TagCollection } from 'contentful'
import { filterTagsForEnv, getHaveArticleTags } from '../../lib/filterTags'
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
				<header className="bg-white p-6 mb-8 rounded-sm">
					<h1 className="text-xl">「{tagName}」に関する記事一覧</h1>
				</header>
				<Articles articles={articles} />
			</>
		</Layout>
	)
}

export default Tags

export const getStaticPaths: GetStaticPaths = async () => {
	const allTags: TagCollection = await client.getTags()
	const filteredForEnvTags = filterTagsForEnv(allTags)
	const haveArticleTags = await getHaveArticleTags(client, filteredForEnvTags)

	const paths = haveArticleTags.map(({ tagId }) => ({
		params: { tag: tagId },
	}))

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// params.tag には [tag].tsx の tag の値が入ってくる

	const getArticleParams: { [key: string]: string | string[] | undefined } = {
		content_type: 'article',
		'metadata.tags.sys.id[all]': params?.tag,
	}

	if (process && process.env.NODE_ENV === 'production') {
		// プロダクションの場合はダミーの記事を除外する
		getArticleParams['metadata.tags.sys.id[nin]'] = 'dummyArticle'
	}

	const { items } = await client.getEntries(getArticleParams)

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
			tagName: params?.tag,
		},
		revalidate: 1,
	}
}
