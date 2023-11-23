import React from "react";
import {
    Navbar,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Accordion,
    AccordionItem
} from "@nextui-org/react";
import { FaHome } from 'react-icons/fa';
import styles from "./Nav.module.css";
const Nav = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    /*
    const menuItems = [ 
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
*/
    return (
        <div>
            <Navbar isBordered>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className={styles.navbarMenu}
                    />
                    <NavbarBrand>
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                <NavbarMenu>
                        <NavbarContent className="block">
                            <Accordion
                                selectionMode="multiple"
                               /* defaultExpandedKeys={}*/
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
                                        isActive={false}>
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
                    {
                    /*menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))
                            */}
                </NavbarMenu>
            </Navbar>
        </div>
    )
}

export default Nav;