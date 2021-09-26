import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import styles from '../../styles/article/content.module.css'

type TContent = {
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

const MDXContent = ({ mdxSource }: TContent): JSX.Element => {
	return (
		<div className={styles.content}>
			<MDXRemote {...mdxSource} />
		</div>
	)
}

export default MDXContent
