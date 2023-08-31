import Helmet from "react-helmet";
import PropTypes from "prop-types";

const Seo = ({ title, description, keywords, iconUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {iconUrl && <link rel="icon" href={iconUrl} type="image/svg+xml" />}
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
};

export default Seo;
