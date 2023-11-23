import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Card,
    CardBody
} from "@nextui-org/react";
import styles from "./BreadCum.module.css"
interface BreadCumProps {
    herarchy: string[];
}

const BreadCum: React.FC<BreadCumProps> = ({ herarchy }) => {

    return (
        <>
            <Card className={styles.breadcumContainer}>
                <CardBody className={styles.breadCardBody}>
                    <Navbar>
                        <NavbarContent>
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    Home
                                </Link>
                            </NavbarItem>
                            <span>{'>>'}</span>
                            <NavbarItem>
                                Dashboard
                            </NavbarItem>
                        </NavbarContent>
                    </Navbar>
                </CardBody>
            </Card>
        </>
    )
}

export default BreadCum;