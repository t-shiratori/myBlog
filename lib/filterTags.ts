import { TagCollection, Tag } from 'contentful'

export const filterTags = (tags: TagCollection): Tag[] => {
	let filteredTags
	if (process && process.env.NODE_ENV === 'production') {
		// プロダクションの場合はダミーの記事を除外する
		filteredTags = tags.items.filter((item) => item.name !== 'DummyArticle')
	} else {
		filteredTags = tags.items
	}
	return filteredTags
}
