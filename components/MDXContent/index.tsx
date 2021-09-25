import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type TContent = {
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

const MDXContent = ({ mdxSource }: TContent): JSX.Element => {
	return (
		<div className="MDXContent">
			<MDXRemote {...mdxSource} />
		</div>
	)
}

export default MDXContent
