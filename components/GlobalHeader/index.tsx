import NavLink from '../NavLink'

const GlobalHeader = (): JSX.Element => {
	return (
		<header className="mb-4">
			<div className="p-4 w-full flex justify-center bg-gray-100 tablet:hidden">
				<h2 className="text-lg">Blog</h2>
			</div>
			<div className="hidden tablet:block w-full bg-indigo-600">
				<div className=" p-4 justify-between tablet:flex max-w-[1024px] mx-auto">
					<div>
						<NavLink href={'/'} name={'Blog'} />
					</div>
				</div>
			</div>
		</header>
	)
}

export default GlobalHeader
