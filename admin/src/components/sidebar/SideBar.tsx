import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";
import { FaHome, FaUser } from 'react-icons/fa';
import styles from "./SideBar.module.css";

interface SideProps {
    isHomeView: boolean;
}
const SideBar: React.FC<SideProps> = ({ isHomeView }) => {
    return (
        <div className={styles.sideContainer}>
            <Navbar className="xsm:max-md:hidden">
                <NavbarContent className="block">
                    <Accordion
                        selectionMode="multiple"
                        defaultExpandedKeys={['1']}
                    >
                        <AccordionItem
                            key="1"
                            aria-label="Chung Miller"
                            startContent={
                                <FaHome />
                            }
                            /*subtitle="4 unread messages"*/
                            title="Home"
                            data-open
                        >
                            <NavbarItem
                                className="p-2"
                                isActive={(isHomeView) ? true : false}>
                                <Link className="w-full" color="foreground" href="#">
                                    <FaHome />
                                    <span className="ml-4">
                                        Dasboard
                                    </span>
                                </Link>
                            </NavbarItem> <NavbarItem className="p-2">
                                <Link className="w-full" color="foreground" href="#">
                                    <FaHome />
                                    <span className="ml-4">
                                        Emails
                                    </span>
                                </Link>
                            </NavbarItem>
                            <NavbarItem className="p-2">
                                <Link className="w-full" color="foreground" href="#">
                                    <FaHome />
                                    <span className="ml-4">
                                        More..
                                    </span>
                                </Link>
                            </NavbarItem>
                        </AccordionItem>
                    </Accordion >
                    <NavbarItem className={styles.sectionTitle}>
                        <p>system</p>
                    </NavbarItem>
                    <NavbarItem className={styles.sectionItems}>
                        <Link color="foreground" href="/clients">
                            <FaUser />
                            <span className="ml-4">
                                clientes
                            </span>
                        </Link>
                    </NavbarItem>
                    <NavbarItem className={styles.sectionItems}>
                        <Link color="foreground" href="/proveedores/listado">
                            <FaUser />
                            <span className="ml-4">
                                proveedores
                            </span>
                        </Link>
                    </NavbarItem>

                </NavbarContent>
            </Navbar>
        </div>

    );
}

export default SideBar;