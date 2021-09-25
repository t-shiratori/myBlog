import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type TContent = {
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const MDXContent = ({ mdxSource }: TContent) => {
	return (
		<div className="MDXContent">
			<MDXRemote {...mdxSource} />
		</div>
	)
}
