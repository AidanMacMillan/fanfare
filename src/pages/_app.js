import Head from 'next/head'
import Navbar from '../components/Navbar';
import '../../public/main.css'

export default function App({ Component, pageProps }) {
	return <>
		<Head>
		</Head>
		<Navbar></Navbar>
		<div className="page">
			<Component {...pageProps} />
		</div>
	</>
}