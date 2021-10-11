import Head from 'next/head'
import Layout from '../components/Layout'
import AboutStyles from '../styles/about.module.css'

const About = (): JSX.Element => {
	return (
		<Layout>
			<>
				<Head>
					<title>tks-io blog About</title>
				</Head>
				<div className={AboutStyles.about}>
					<p>こちらのサイトは以下の技術スタックで作成されてます。</p>
					<ul>
						<li>Next.js</li>
						<li>TypeScript</li>
						<li>tailwindcss</li>
						<li>Cotentful</li>
					</ul>
					<h3>[SNS]</h3>
					<ul>
						<li>
							<a href="https://twitter.com/bird_wt" target="_blank" rel="noreferrer">
								Twitter
							</a>
						</li>
						<li>
							<a href="https://codepen.io/tksiiii/" target="_blank" rel="noreferrer">
								Code Pen
							</a>
						</li>
					</ul>
				</div>
			</>
		</Layout>
	)
}

export default About
