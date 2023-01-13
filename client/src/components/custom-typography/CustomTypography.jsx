import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function CustomTypography(props) {
  const { children } = props;
  const theme = createTheme({
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "h6",
            subtitle2: "h6",
            body1: "div",
            body2: "span",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography {...props}>{children}</Typography>
    </ThemeProvider>
  );
}

export default CustomTypography;
