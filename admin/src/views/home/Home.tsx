
import Nav from "../../components/navbar/navbar/Nav.tsx";
import SideBar from "../../components/sidebar/SideBar.tsx";
import BreadCum from "../../components/breadcum/BreadCum.tsx";
import HomeCard from "../../components/homecard/HomeCard.tsx";
import SalesOverview from "../../components/sales_overview/SalesOverview.tsx";
import TopSoldOverview from "../../components/top_products/TopSoldOverview.tsx";

const Home = () => {

    const breadcumHierarchy: string[] = ['Home', 'Dashboard'];
    const isHome: boolean = true;
    return (
        <div>
            <Nav />
            <div className="flex flex-row">
                <div className="basis-1/5">
                    <SideBar isHomeView={isHome} />
                </div>
                <div className="basis-4/5 px-8">
                    <BreadCum herarchy={breadcumHierarchy} />
                    <div className="my-2 grid grid-cols-4 gap-4">
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                    </div>
                    <div className="my-2 flex flex-row gap-4">
                        <div className="basis-4/5">
                            <SalesOverview />
                        </div>
                        <div className="basis-1/5">
                            <TopSoldOverview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;