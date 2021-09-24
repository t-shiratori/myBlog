import Link from 'next/link'

type TNavLink = {
	href: string
	name: string
}

export const NavLink = ({ href, name }: TNavLink) => {
	return (
		<Link href={href} passHref>
			<a className="text-white tablet:text-gray-900 tablet:text-2xl">{name}</a>
		</Link>
	)
}
