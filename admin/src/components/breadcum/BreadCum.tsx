import {
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
        fixRoute();
    }, []);

    // functions

    /**
     * gets the URL, takes out unnecessary stuff
     */
    function fixRoute() {
        //fix route here
        let fixRoute = location.pathname.split("/");
        fixRoute.shift();
        if (!isNaN(Number(fixRoute[fixRoute.length - 1]))) {
            fixRoute.pop();
        }
        setPath(fixRoute);
    }
    /**
     * returns a li element for every path elem
     */
    const navItems = path?.map((elem, i, arr) => {
        const length = arr.length - 1;
        return <li key={i}>
            {elem}
            {(i < length) ? <span>&nbsp;{">>"}&nbsp;</span> : null}
        </li>
    });

    return (
        <>
            <Card className={styles.breadcumContainer}>
                <CardBody className={styles.breadCardBody}>
                    <nav>
                        <ul className={styles.items}>
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