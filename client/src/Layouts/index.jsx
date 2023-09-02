import PropTypes from "prop-types";
import Header from "./Header";
import Seo from "./Seo";

const MainLayout = ({ children }) => {
  return (
    <>
      <Seo
        title="SocialNetwork"
        description="Description de la page"
        keywords="Mots-clés, SEO, Balises, Head"
        iconUrl={"/mern.svg"}
      />
      <Header />
      <main>{children}</main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
