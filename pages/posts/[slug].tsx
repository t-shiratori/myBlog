import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient, Entry, EntryCollection } from 'contentful'
import { serialize } from 'next-mdx-remote/serialize'
import { formatISO9075 } from 'date-fns'
import { TField } from '../../types/article'
import mdToPrism from '../../lib/mdToPrism'
import Layout from '../../components/Layout'
import titleStyles from '../../styles/article/title.module.css'
import articleStyles from '../../styles/article.module.css'

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
	const { fields, sys, metadata } = article
	const createdDate = formatISO9075(new Date(sys.createdAt))
	const updatedDate = formatISO9075(new Date(sys.updatedAt))

	return (
		<Layout>
			<>
				<Head>
					<title>{fields.title}</title>
				</Head>
				<article>
					<header className="p-8 pb-6 rounded-sm bg-white">
						<h1 className={`${titleStyles.articleTitle} mb-3`}>{fields.title}</h1>
						<div className="flex mt-4 text-sm">
							<span>Tags: </span>
							<ul className={`flex ml-1 ${articleStyles.tagList}`}>
								{metadata.tags.map(({ sys }) => (
									<li className="text-gray-600" key={sys.id}>
										<Link href={`/tags/${sys.id}`}>{sys.id}</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="flex flex-col items-end text-gray-600 text-sm">
							<span>Created: {createdDate}</span>
							<span>Updated: {updatedDate}</span>
						</div>
					</header>
					<div className="mt-4 tablet:mt-8 py-4 px-8 rounded-sm bg-white">
						<div className={'content'} dangerouslySetInnerHTML={{ __html: highlightHtml }} />
					</div>
				</article>
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
	// params.slug には [slug].tsx の tag の値が入ってくる
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
