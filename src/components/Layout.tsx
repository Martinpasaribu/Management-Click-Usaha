// import Footer from "./Footer";
import Sidebar from "./Sidebar";
// import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black w-full ">
      {/* <Navbar /> */}
      <Sidebar/>
      <main className="px-0 md:px-0 py-0 md:py-0">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
