import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { DataTable } from "../components/table/DataTable";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 16 }}>Таблица данных</h1>
        <DataTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
