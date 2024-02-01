import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormRegister from "../../components/suppliers/FormRegister";
import styles from "./SuppliersRegister.module.css";


//React component
const SuppliersRegister = () => {


    const isHome: boolean = false;

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.clientsContainer}>
                    <FormRegister />
                </div>


            </div>
        </div >
    );
}

export default SuppliersRegister;