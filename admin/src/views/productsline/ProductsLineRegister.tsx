import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormRegister from "../../components/products/lines/FormRegister";
import styles from "./ProductsLineRegister.module.css";


//React component
const ProductsLineRegister = () => {


    const isHome: boolean = false;

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.sectionContainer}>
                    <FormRegister />
                </div>


            </div>
        </div >
    );
}

export default ProductsLineRegister;