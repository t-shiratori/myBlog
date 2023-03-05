import Link from 'next/link'

const GlobalFooter = (): JSX.Element => {
	return (
		<footer className="fixed tablet:static box-border left-0 bottom-0 w-full tablet:mt-auto">
			<div className="p-4 flex justify-center bg-black tablet:hidden">
				<Link href={'/'} passHref>
					<a className="text-white text-xl">{'Home'}</a>
				</Link>
			</div>

			<div className="hidden text-gray-900 p-2 tablet:flex justify-center border-t border-gray-500 tablet:p-6">
				<small className="text-sm">&copy; 2021 tks-io</small>
			</div>
		</footer>
	)
}

export default GlobalFooter
