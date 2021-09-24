import { NavLink } from '../NavLink'

export const GlobalFooter = () => {
	return (
		<footer className="fixed tablet:static box-border left-0 bottom-0 w-full tablet:mt-auto">
			<div className="p-4 flex justify-center bg-indigo-600 tablet:hidden">
				<NavLink href={'/'} name={'Home'} />
			</div>

			<div className="hidden p-2 tablet:flex justify-center border-t tablet:p-6">
				<span className="text-sm">© 2021 Tks Blog All rights reserved.</span>
			</div>
		</footer>
	)
}
