
import Nav from "../../components/navbar/navbar/Nav.tsx";
import SideBar from "../../components/sidebar/SideBar.tsx";
import BreadCum from "../../components/breadcum/BreadCum.tsx";
import HomeCard from "../../components/homecard/HomeCard.tsx";
import SalesOverview from "../../components/home/sales_overview/SalesOverview.tsx";
import TopSoldOverview from "../../components/home/top_products/TopSoldOverview.tsx";
import DebtsOverview from "../../components/home/debtsoverview/DebtsOverview.tsx";
import styles from "./Home.module.css"
const Home = () => {

  
    const isHome: boolean = true;
    return (
        <div>
            <Nav />
            <div className="flex flex-row">
                <div className={styles.sideMenuContainer}>
                    <SideBar isHomeView={isHome} />
                </div>
                <div className={styles.dashboardContainer}>
                    <BreadCum />
                    <div className={styles.cardsOverviewsContainer}>
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                    </div>
                    <div className={styles.chartsContainer}>
                        <SalesOverview />
                        <TopSoldOverview />
                    </div>
                    <div className={styles.tablesContaier}>
                        <DebtsOverview />
                        <DebtsOverview />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;