import Header from "./Header";
import Footer from "./Footer";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-black">{props.children}</div>
      <Footer />
    </>
  );
};
export default Layout;
