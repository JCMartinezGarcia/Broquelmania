import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Card,
    CardBody
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BreadCum.module.css";

const BreadCum = () => {
    //states
    const [path, setPath] = useState<string[]>();
    //hooks
    const location = useLocation();
    useEffect(() => {
        setPath(location.pathname.split("/"));
    }, []);
    // functions
    const navItems = path?.map((elem) => {
        if (elem) {
            if (isNaN(Number(elem))) {
                return <li>
                    {elem}
                </li>
            }

        }
    });
    return (
        <>
            <Card className={styles.breadcumContainer}>
                <CardBody className={styles.breadCardBody}>
                    <nav>
                        <ul>
                            {/** 
                                <NavbarItem>
                                <Link color="foreground" href="/">
                                    Home
                                </Link>
                            </NavbarItem>
                            <span>{'>>'}</span>
                            <NavbarItem>
                                Dashboard
                            </NavbarItem>
                            **/
                                navItems
                            }

                        </ul>
                    </nav>
                </CardBody>
            </Card>
        </>
    )
}

export default BreadCum;