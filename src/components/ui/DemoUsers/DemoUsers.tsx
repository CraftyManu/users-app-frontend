import styles from "./DemoUsers.module.css"

type DemoAccount = {
    label: string
    email: string
    password: string
}

type DemoUsersProps = {
    onSelect: (email: string, password: string) => void
}

const DemoAccounts: DemoAccount[] = [
    {
        label: "ROOT",
        email: "root@email.com",
        password: "123456root",
    },
    {
        label: "ADMIN",
        email: "admin@email.com",
        password: "123456admin",
    },

    {
        label: "USER",
        email: "user@email.com",
        password: "123456user",
    },
    {
        label: "GUEST",
        email: "guest@email.com",
        password: "123456guest",
    },
]

/* console.log('DemoAccounts', DemoAccounts) */

function DemoUsers({ onSelect }: DemoUsersProps) {
    return (
        <div className={styles.container}>
            {DemoAccounts.map((account) => (
                <button
                    key={account.label}
                    type="button"
                    className={`${styles.badge} ${styles[`badge_${account.label}`]}`}
                    onClick={() => onSelect(account.email, account.password)}
                >
                    {account.label}
                </button>
            ))}
        </div>
    )
}

export default DemoUsers