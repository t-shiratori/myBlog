import { ContentfulClientApi, TagCollection, Tag } from 'contentful'

export const filterTagsForEnv = (tags: TagCollection): Tag[] => {
	let filteredTags
	if (process && process.env.NODE_ENV === 'production') {
		// プロダクションの場合はダミーの記事を除外する
		filteredTags = tags.items.filter((item) => item.name !== 'DummyArticle')
	} else {
		filteredTags = tags.items
	}
	return filteredTags
}

type TArticleLengthPerTag = {
	tagId: string
	length: number
}

export const getArticleLengthPerTag = async (
	client: ContentfulClientApi,
	tags: Tag[],
): Promise<TArticleLengthPerTag[]> => {
	const result: TArticleLengthPerTag[] = await Promise.all(
		tags.map(async (tag) => {
			const getArticleParams: { [key: string]: string | string[] | undefined } = {
				content_type: 'article',
				'metadata.tags.sys.id[all]': tag.sys.id,
			}
			const result = await client.getEntries(getArticleParams)
			return { tagId: tag.sys.id, length: result.items.length }
		}),
	)
	return result
}

export const getHaveArticleTags = async (client: ContentfulClientApi, tags: Tag[]): Promise<TArticleLengthPerTag[]> => {
	const articleLengthPerTag = await getArticleLengthPerTag(client, tags)
	const haveArticleTags = articleLengthPerTag.filter(({ length }) => length > 0)
	return haveArticleTags
}
