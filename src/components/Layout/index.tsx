import React from 'react'
import GlobalHeader from '../GlobalHeader'
import GlobalFooter from '../GlobalFooter'

type TLayout = {
	children: React.ReactElement
}

const Layout = ({ children }: TLayout): JSX.Element => {
	return (
		<div className="tablet:flex tablet:flex-col min-h-[100vh]">
			<GlobalHeader />
			<main className="p-4 pb-[80px] mx-auto tablet:w-[980px] tablet:max-w-[980px]">{children}</main>
			<GlobalFooter />
		</div>
	)
}

export default Layout
