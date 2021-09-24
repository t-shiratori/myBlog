import React from 'react'
import { GlobalHeader } from './components/GlobalHeader'
import { GlobalFooter } from './components/GlobalFooter'

type TLayout = {
	children: React.ReactElement
}

export const Layout = ({ children }: TLayout) => {
	return (
		<div className="tablet:flex tablet:flex-col min-h-[100vh]">
			<GlobalHeader />
			<div className="p-4 pb-[69px] mx-auto tablet:max-w-[980px]">{children}</div>
			<GlobalFooter />
		</div>
	)
}
