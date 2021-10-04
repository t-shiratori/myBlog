import NavLink from '../NavLink'

const GlobalFooter = (): JSX.Element => {
	return (
		<footer className="fixed tablet:static box-border left-0 bottom-0 w-full tablet:mt-auto">
			<div className="p-4 flex justify-center bg-black tablet:hidden">
				<NavLink href={'/'} name={'Home'} />
			</div>

			<div className="hidden text-gray-900 p-2 tablet:flex justify-center border-t border-gray-500 tablet:p-6">
				<span className="text-sm">© 2021 tks-io All rights reserved.</span>
			</div>
		</footer>
	)
}

export default GlobalFooter
