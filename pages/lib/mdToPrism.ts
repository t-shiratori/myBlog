import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'

export const mdToPrism = async (markdown) => {
	const result = await unified()
		.use(remarkParse) // マークダウンのパーサー
		.use(remarkGfm) // Autolink literals、Strikethrough、Table、Tasklist、に対応するためのremarkのプラグイン。
		.use(remarkRehype) // マークダウンをhtmlに変換するremarkのプラグイン
		.use(rehypeFormat) // htmlをきれいに整形するrehypeプラグイン
		.use(rehypeStringify) // htmlをシリアライズするunified用のコンパイラ
		.use(rehypePrismPlus) // PrismでHTMLのコードブロックを強調表示するrehypeプラグイン
		.process(markdown)
	return String(result)
}

export const mdToPrism3 = async (markdown) => {
	const result = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(markdown)
	return String(result)
}
