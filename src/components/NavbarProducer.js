import styles from './Navbar.module.css'
import Link from 'next/link'

export default function NavbarProducer() {
	return <nav className={styles.navbar}>
        <div className="container">
            <div className={styles.logo}>
				<Link href="/">
					<a><img src="/images/fanfare-logo.png" alt="Fanfare Logo" height="20px"/></a>
				</Link>
			</div>
            <ul className={styles.navlinks}>
				<li className={styles.navlink}>
					<Link href="/producer/event/create">
						<a>Create Event</a>
					</Link>
				</li>
			</ul>
        </div>
	</nav>
}