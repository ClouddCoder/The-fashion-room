import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Layout from "../layout/Layout";
import { getMUIprops } from "../../utils/MUIMediaQuery";
import { phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle } from "./FormMUIstyle";

/**
 * This component is used as layout for the login and register forms.
 * @param {object} { children, title} - The children are the form fields.
 * @returns {JSX.Element} Component Form.
 */
function Form({ children, title }) {
  let cardProps = {};
  cardProps = getMUIprops(phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle);

  return (
    <Layout>
      <Card sx={cardProps}>
        <CardContent>
          <h5>{title}</h5>
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Form;
