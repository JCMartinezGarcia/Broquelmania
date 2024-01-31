import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormEdit from "../../components/suppliers/FormEdit";
import styles from "./SuppliersEdit.module.css";


//React component
const SuppliersEdit = () => {


    const isHome: boolean = false;

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.suppliersContainer}>
                    <FormEdit />
                </div>


            </div>
        </div >
    );
}

export default SuppliersEdit;