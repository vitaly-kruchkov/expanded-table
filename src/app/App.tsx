import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Typography,
} from "@mui/material";
import { DataTable } from "../components/table/DataTable";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h5" mb={2}>
          Таблица данных
        </Typography>
        <DataTable />
      </Container>
    </ThemeProvider>
  );
}
