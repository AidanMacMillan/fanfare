import styles from "./Layout.module.css"

export default function Layout({ children, ...props }) {
	return <>
		<div className={styles.layout}>
			{children}
		</div>
	</>
}