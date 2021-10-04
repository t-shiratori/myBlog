import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { createClient, Entry, EntryCollection } from 'contentful'
import { serialize } from 'next-mdx-remote/serialize'
import { formatISO9075 } from 'date-fns'
import { TField } from '../../types/article'
import mdToPrism from '../../lib/mdToPrism'
import Layout from '../../components/layout'
import titleStyles from '../../styles/article/title.module.css'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

type TPostProps = {
	article: Entry<TField>
	mdxSource: string
	highlightHtml: string
}

const Post = ({ article, mdxSource, highlightHtml }: TPostProps): JSX.Element => {
	const { fields, sys } = article
	const createdDate = formatISO9075(new Date(sys.createdAt))
	const updatedDate = formatISO9075(new Date(sys.updatedAt))

	return (
		<Layout>
			<>
				<Head>
					<title>{fields.title}</title>
				</Head>
				<section className="p-8 bg-white">
					<h1 className={`${titleStyles.articleTitle} mb-3`}>{fields.title}</h1>
					<div className="mb-9 flex flex-col items-end text-gray-600 text-sm">
						<span>Created: {createdDate}</span>
						<span>Updated: {updatedDate}</span>
					</div>
					<div className={'content'} dangerouslySetInnerHTML={{ __html: highlightHtml }} />
				</section>
			</>
		</Layout>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
	const res: EntryCollection<TField> = await client.getEntries({ content_type: 'article' })

	const paths = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug },
		}
	})

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { items } = await client.getEntries({ content_type: 'article', 'fields.slug': params?.slug })

	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const article = items[0] as Entry<TField>
	const mdxSource = await serialize(article.fields.markDownText)
	const highlightHtml = await mdToPrism(article.fields.markDownText)

	return {
		props: {
			article: items[0],
			mdxSource,
			highlightHtml,
		},
		revalidate: 1,
	}
}
