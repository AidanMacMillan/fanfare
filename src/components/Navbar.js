import styles from './Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
	return <nav className={styles.navbar}>
        <div className="container">
            <div className={styles.logo}>
				<Link href="/">
					<a><img src="/images/fanfare-logo.png" alt="Fanfare Logo" height="20px"/></a>
				</Link>
			</div>
            <ul className={styles.navlinks}>
				<li className={styles.navlink}>
					<Link href="/events">
						<a>Events</a>
					</Link>
                    <div className={styles.navmenuHider}>
                        <ul className={styles.navmenu}>
                            <Link href="/events">
                                <a>Live</a>
                            </Link>
                            <Link href="/events/upcoming">
                                <a>Upcoming</a>
                            </Link>
                            <Link href="/events/past">
                                <a>Past</a>
                            </Link>
                        </ul>
                    </div>
				</li>
                <li className={styles.navlink}>
					<Link href="/leaderboard">
						<a>Leaderboard</a>
					</Link>
				</li>
                <li className={styles.navlink}>
					<Link href="/faq">
						<a>FAQ</a>
					</Link>
				</li>
			</ul>
            <div className={styles.accountArea}>
                <Link href="/signup">
                    <a className={styles.signupButton}>
                        Sign Up
                    </a>
                </Link>
                <Link href="/login">
                    <a className={styles.signupButton}>
                        Log In
                    </a>
                </Link>
            </div>
        </div>
	</nav>
}