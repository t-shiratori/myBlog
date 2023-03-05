import { Entry } from 'contentful'
import { formatISO9075 } from 'date-fns'
import Link from 'next/link'
import { TField } from '../../types/article'

type TArticlesProps = {
	articles: Entry<TField>[]
}

export const Articles = ({ articles }: TArticlesProps): JSX.Element => {
	return (
		<ul>
			{articles.map(({ fields, sys }) => {
				const createdDate = formatISO9075(new Date(sys.createdAt), { representation: 'date' })

				return (
					<li className="text-gray-900 mb-3" key={sys.id}>
						<div className="bg-white">
							<Link href={`/posts/${fields.slug}`}>
								<a className="block rounded-sm p-4 border-[3px] border-gray-500 hover:border-gray-300 box-border">
									<span className="text-xl">{fields.title}</span>
									<div className="mt-4 flex flex-col items-end text-gray-600 text-sm">
										<span>{createdDate}</span>
									</div>
								</a>
							</Link>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
