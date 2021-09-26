import NavLink from '../NavLink'

const GlobalHeader = (): JSX.Element => {
	return (
		<header className="mb-4">
			<div className="p-4 w-full flex justify-center bg-gray-100 tablet:hidden">
				<h2 className="text-lg">Blog</h2>
			</div>

			<div className="hidden p-4 justify-between bg-indigo-600 tablet:flex">
				<div>
					<NavLink href={'/'} name={'Blog'} />
				</div>
			</div>
		</header>
	)
}

export default GlobalHeader
