import NavLink from '../NavLink'

const GlobalHeader = (): JSX.Element => {
	return (
		<header className="tablet:mb-4">
			<div className="p-4 w-full flex justify-center bg-white tablet:hidden">
				<h1 className="text-lg text-black">tks-io</h1>
			</div>
			<div className="hidden tablet:block w-full bg-white">
				<div className=" p-4 justify-between tablet:flex max-w-[1024px] mx-auto">
					<div className="text-lg text-black">
						<NavLink href={'/'} name={'tks-io'} />
					</div>
				</div>
			</div>
		</header>
	)
}

export default GlobalHeader
