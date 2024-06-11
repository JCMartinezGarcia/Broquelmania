import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormRegister from "../../components/users/FormRegister";
import styles from "./UsersRegister.module.css";


//React users component
const UsersRegister = () => {

    const isHome: boolean = false;

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.usersContainer}>
                    <FormRegister />
                </div>
            </div>
        </div >
    );
}

export default UsersRegister;