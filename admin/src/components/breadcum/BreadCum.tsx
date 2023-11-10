import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link
} from "@nextui-org/react";

interface BreadCumProps {
    herarchy: string[];
}

const BreadCum: React.FC<BreadCumProps> = ({ herarchy }) => {

    return (
        <>
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
        </>
    )
}

export default BreadCum;