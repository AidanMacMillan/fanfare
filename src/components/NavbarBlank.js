import styles from './NavbarBlank.module.css'
import Link from 'next/link'

export default function NavbarBlank() {
	return <nav className={styles.navbar}>
        <div className="container">
            <div className={styles.logo}>
				<Link href="/">
					<a><img src="/images/fanfare-logo.png" alt="Fanfare Logo" height="20px"/></a>
				</Link>
			</div>
        </div>
	</nav>
}