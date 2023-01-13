import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Layout from "../layout/Layout";

function Form({ children, title }) {
  return (
    <Layout>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h5>{title}</h5>
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Form;
