import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { createClient } from 'contentful'
import { serialize } from 'next-mdx-remote/serialize'
import { mdToPrism } from '../lib/mdToPrism'
import { Layout } from '../layout'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

const Post = ({ article, mdxSource, highlightHtml }) => {
	const { fields } = article

	console.log('article:', article)
	console.log('mdxSource:', mdxSource)
	console.log('highlightHtml:', highlightHtml)

	return (
		<Layout>
			<>
				<Head>
					<title>{fields.title}</title>
				</Head>
				<section>
					<h1 className="mb-4 text-2xl font-bold">{fields.title}</h1>
					<div className="MDContent" dangerouslySetInnerHTML={{ __html: highlightHtml }} />
				</section>
			</>
		</Layout>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await client.getEntries({ content_type: 'article' })

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
	const { items } = await client.getEntries({ content_type: 'article', 'fields.slug': params.slug })

	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const article = items[0]
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
