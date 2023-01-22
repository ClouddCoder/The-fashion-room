import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

// CardContent component with no padding.
const CardContentNoPadding = styled(CardContent)(`
padding: 0;
&:last-child {
  padding-bottom: 0;
}
`);

export default CardContentNoPadding;
