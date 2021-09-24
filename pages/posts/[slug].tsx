import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { createClient } from 'contentful'
import { serialize } from 'next-mdx-remote/serialize'
import { Layout } from '../layout'
import { Content } from '../components/Content'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

const Post = ({ article, mdxSource }) => {
	const { fields } = article

	return (
		<Layout>
			<>
				<Head>
					<title>{fields.title}</title>
				</Head>
				<section>
					<h1 className="mb-4 text-2xl font-bold">{fields.title}</h1>
					<div className="">
						<Content mdxSource={mdxSource} />
					</div>
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

	return {
		props: {
			article: items[0],
			mdxSource,
		},
		revalidate: 1,
	}
}
