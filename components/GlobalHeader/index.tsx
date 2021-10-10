import Link from 'next/link'

const GlobalHeader = (): JSX.Element => {
	return (
		<header className="tablet:mb-4">
			<div className="w-full bg-white">
				<div className=" p-4 flex justify-between items-center max-w-[1024px] mx-auto">
					<div>
						<Link href={'/'} passHref>
							<a className="text-black text-2xl">{'tks-io'}</a>
						</Link>
					</div>
					<div>
						<Link href={'/about'} passHref>
							<a className="text-black text-sm tablet:text-base">{'About'}</a>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default GlobalHeader
