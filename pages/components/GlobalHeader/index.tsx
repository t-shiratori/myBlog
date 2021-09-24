import { NavLink } from '../NavLink'

export const GlobalHeader = () => {
	return (
		<header className="mb-4">
			<div className="p-4 w-full flex justify-center border-indigo-200 bg-gray-100 tablet:hidden">
				<h2 className="text-lg">Blog</h2>
			</div>

			<div className="hidden p-4 justify-between border-t-8 border-indigo-600 border-b tablet:flex">
				<div>
					<NavLink href={'/'} name={'Blog'} />
				</div>
			</div>
		</header>
	)
}
