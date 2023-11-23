import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";
import { FaHome } from 'react-icons/fa';

interface SideProps {
    isHomeView: boolean;
}
const SideBar: React.FC<SideProps> = ({ isHomeView }) => {
    return (
        <>
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

                    <NavbarItem className="p-2">
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>

    );
}

export default SideBar;