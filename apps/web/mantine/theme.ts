import { createTheme } from "@mantine/core";
import { colors } from "./colors";
import { styles } from "./styles";

export const theme = createTheme({
  fontFamily: "Finlandica, sans-serif",
  primaryColor: "indigo",
  components: styles,
  colors,
  defaultRadius: "md",
  radius: { xs: "6px", sm: "8px", md: "10px", lg: "12px", xl: "14px" },
  fontSizes: {
    xs: "0.8125rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem"
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem"
  },
  headings: {
    fontFamily: "Finlandica, sans-serif",
    fontWeight: "600"
  }
});
