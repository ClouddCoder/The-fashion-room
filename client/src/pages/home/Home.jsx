import Layout from "../../components/layout/Layout";
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import "./Home.css";

/**
 * Component to render the home page.
 * @returns {JSX.Element} - Home component
 */
function Home() {
  return (
    <Layout>
      <div className="main-content__container">
        <Header />
        <div className="container">
          <Categories />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
