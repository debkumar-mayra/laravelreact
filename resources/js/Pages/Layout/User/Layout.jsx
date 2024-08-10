import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <SideMenu />
            {children}
        </>
    );
}
