import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Layout from "../layout/Layout";

/**
 * This component is used as layout for the login and register forms.
 * @param {object} { children, title} - The children are the form fields.
 * @returns {JSX.Element} Component Form.
 */
function Form({ children, title }) {
  return (
    <Layout>
      <Card sx={{ width: "80%", maxWidth: "500px" }}>
        <CardContent>
          <h5>{title}</h5>
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Form;
