import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "./contexts/TaskContext";
import TasksPage from "./pages/TasksPage";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <TasksPage />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontSize: "14px",
          }}
        />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
