import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient, Entry, EntryCollection } from 'contentful'
import { serialize } from 'next-mdx-remote/serialize'
import { formatISO9075 } from 'date-fns'
import { TField } from '../../types/article'
import mdToPrism from '../../lib/mdToPrism'
import Layout from '../../components/Layout'
import ShareButtons from '../../components/ShareButtons'
import articleStyles from '../../styles/article/index.module.css'
import { BLOG_URL } from '../../const'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

type TPostProps = {
	article: Entry<TField>
	mdxSource: string
	highlightHtml: string
}

const Post = ({ article, highlightHtml }: TPostProps): JSX.Element => {
	const { fields, sys, metadata } = article
	const createdDate = formatISO9075(new Date(sys.createdAt))
	const updatedDate = formatISO9075(new Date(sys.updatedAt))
	const router = useRouter()
	return (
		<Layout>
			<>
				<Head>
					<title>{`${fields.title} | tks-io blog`}</title>
					<meta name="description" content={`${fields.title} | tks-io blog`} />
					<meta property="og:title" content={`${fields.title} | tks-io blog`} />
					<meta property="og:description" content={`${fields.title} | tks-io blog`} />
				</Head>

				{/* パンくず */}
				<div className="text-sm mb-4 flex">
					<span className="mr-1">&#062;</span>
					<Link href={`/`}>
						<span className="underline hover:no-underline cursor-pointer">Home</span>
					</Link>
				</div>

				<article>
					{/* 記事ヘッダー */}
					<header className="p-5 rounded-sm bg-white">
						{/* 記事タイトル */}
						<h1 className={`${articleStyles.articleTitle} mb-3`}>{fields.title}</h1>
						{/* タグリスト */}
						<div className="flex mt-4 text-sm">
							<span>Tags: </span>
							<ul className={`flex ml-1 ${articleStyles.tags}`}>
								{metadata.tags.map(({ sys }) => (
									<li className="text-gray-600" key={sys.id}>
										<Link href={`/tags/${sys.id}`}>{sys.id}</Link>
									</li>
								))}
							</ul>
						</div>
						{/* シェアボタン */}
						<ShareButtons url={`${BLOG_URL}${router.asPath}`} title={fields.title} />
						{/* 日付 */}
						<div className="flex flex-col mt-2 tablet:items-end text-gray-600 text-sm">
							<span>Created: {createdDate}</span>
							<span>Updated: {updatedDate}</span>
						</div>
					</header>
					{/* 記事内容 */}
					<div className="mt-4 tablet:mt-8 py-4 px-5 tablet:p-8 rounded-sm bg-white">
						<div className={'content'} dangerouslySetInnerHTML={{ __html: highlightHtml }} />
					</div>
				</article>

				{/* Home Link */}
				<div className="text-sm mt-8 hidden tablet:flex justify-center ">
					<Link href={`/`}>
						<span className="underline hover:no-underline cursor-pointer">Home</span>
					</Link>
				</div>
			</>
		</Layout>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
	const articleQueryParams: { [key: string]: string } = { content_type: 'article', order: '-sys.createdAt' }

	if (process && process.env.NODE_ENV === 'production') {
		// プロダクションの場合はダミーの記事を除外する
		articleQueryParams['metadata.tags.sys.id[nin]'] = 'dummyArticle'
	}

	const { items }: EntryCollection<TField> = await client.getEntries(articleQueryParams)

	const paths = items.map((item) => {
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
	const { items } = await client.getEntries({
		content_type: 'article',
		order: '-sys.createdAt',
		'fields.slug': params?.slug,
	})

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
