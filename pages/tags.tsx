import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient, TagCollection, Tag } from 'contentful'
import { filterTags } from '../lib/filterTags'
import Layout from '../components/Layout'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

type TTagsProps = {
	tagItems: Tag[]
}

const Tags = ({ tagItems }: TTagsProps): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>タグ一覧ページ</title>
				</Head>
				<ul>
					{tagItems.map(({ sys, name }) => (
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
	const allTags: TagCollection = await client.getTags()
	const filteredTags = filterTags(allTags)

	if (!filteredTags.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			tagItems: filteredTags,
		},
		revalidate: 1,
	}
}
