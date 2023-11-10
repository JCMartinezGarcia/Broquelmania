import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Card,
    CardBody
} from "@nextui-org/react";

interface BreadCumProps {
    herarchy: string[];
}

const BreadCum: React.FC<BreadCumProps> = ({ herarchy }) => {

    return (
        <>
            <Card>
                <CardBody>
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