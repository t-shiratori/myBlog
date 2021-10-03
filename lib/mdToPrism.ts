import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import rehypeStringify from 'rehype-stringify'

const mdToPrism = async (markdown: string): Promise<string> => {
	const result = await unified()
		.use(remarkParse) // マークダウンのパーサー
		.use(remarkGfm) // Autolink literals、Strikethrough、Table、Tasklist、に対応するためのremarkのプラグイン。
		.use(remarkRehype, { allowDangerousHtml: true }) // マークダウンをhtmlに変換するremarkのプラグイン
		.use(rehypeRaw) // 最初からHTMLで書かれていた生のHTML部分をパースするためのプラグイン
		.use(rehypeFormat) // htmlをきれいに整形するrehypeプラグイン
		.use(rehypeStringify) // htmlをシリアライズするunified用のコンパイラ
		.use(rehypePrismPlus) // PrismでHTMLのコードブロックを強調表示するrehypeプラグイン
		.process(markdown)
	return String(result)
}

export default mdToPrism
