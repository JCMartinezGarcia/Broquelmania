
import Nav from "../../components/navbar/navbar/Nav.tsx";
import SideBar from "../../components/sidebar/SideBar.tsx";
import BreadCum from "../../components/breadcum/BreadCum.tsx";
import HomeCard from "../../components/homecard/HomeCard.tsx";

const Home = () => {

    const breadcumHierarchy: string[] = ['Home', 'Dashboard'];
    const isHome: boolean = true;
    return (
        <div>
            <Nav />
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <SideBar isHomeView={isHome} />
                </div>
                <div className="basis-3/4 px-8">
                    <BreadCum herarchy={breadcumHierarchy} />
                    <div className="grid grid-cols-4 gap-4">
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;