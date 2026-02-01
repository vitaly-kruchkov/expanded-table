import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { DataTable } from "../components/table/DataTable";
import { useTableStore } from "../model/tableStore";
import { useEffect } from "react";

const theme = createTheme({ palette: { mode: "light" } });

export default function App() {
  const { load, isLoading } = useTableStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h5" mb={2}>
          Таблица данных
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <DataTable />
        )}
      </Container>
    </ThemeProvider>
  );
}
