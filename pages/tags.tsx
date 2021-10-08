import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient, TagCollection } from 'contentful'
import Layout from '../components/Layout'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

type TTagsProps = {
	tags: TagCollection
}

const Tags = ({ tags }: TTagsProps): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>タグ一覧ページ</title>
				</Head>
				<ul>
					{tags.items.map(({ sys, name }) => (
						<li className="text-gray-900 mb-3 pb-3 border-b-[1px]" key={sys.id}>
							<Link href={`/tags/${sys.id}`}>
								<a className="underline hover:no-underline">{name}</a>
							</Link>
						</li>
					))}
				</ul>
			</>
		</Layout>
	)
}

export default Tags

export const getStaticProps: GetStaticProps = async () => {
	//const { items } = await client.getEntries({ 'metadata.tags.sys.id[all]': params.name })
	const tags: TagCollection = await client.getTags()

	if (!tags.items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			tags,
		},
		revalidate: 1,
	}
}
