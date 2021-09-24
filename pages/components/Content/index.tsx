import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type TContent = {
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const Content = ({ mdxSource }: TContent) => {
	return (
		<div className="content">
			<MDXRemote {...mdxSource} />
		</div>
	)
}
