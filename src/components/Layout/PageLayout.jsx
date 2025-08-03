import {
  Box,
  Container,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useTaskContext } from "../../contexts/TaskContext";
import Header from "./Header";
import Footer from "./Footer";

const PageLayout = ({
  children,
  subtitle,
  showStats = true,
  breadcrumbs = [],
  actions,
}) => {
  const { totalTasks, completedTasks, pendingTasks } = useTaskContext();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        height: "100vh",
      }}
    >
      <Header />

      <Container maxWidth="xl" sx={{ py: 4, minHeight: "86.5%" }}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
              color="inherit"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Ana Sayfa
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <Typography
                key={index}
                color={
                  index === breadcrumbs.length - 1 ? "text.primary" : "inherit"
                }
                sx={{ display: "flex", alignItems: "center" }}
              >
                {crumb.icon && (
                  <Box component="span" sx={{ mr: 0.5, display: "flex" }}>
                    {crumb.icon}
                  </Box>
                )}
                {crumb.label}
              </Typography>
            ))}
          </Breadcrumbs>
        )}

        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Görev Yönetimi
              </Typography>

              {subtitle && (
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    fontWeight: 400,
                  }}
                >
                  {subtitle}
                </Typography>
              )}

              {showStats && (
                <Box sx={{ mt: 2, display: "flex", gap: 3, flexWrap: "wrap" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h3" component="div" fontWeight={700}>
                      {totalTasks}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Toplam Görev
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h3" component="div" fontWeight={700}>
                      {completedTasks.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Tamamlandı
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h3" component="div" fontWeight={700}>
                      {pendingTasks.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Bekliyor
                    </Typography>
                  </Box>

                  {totalTasks > 0 && (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h3" component="div" fontWeight={700}>
                        {Math.round((completedTasks.length / totalTasks) * 100)}
                        %
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Tamamlanma
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {actions && <Box sx={{ display: "flex", gap: 1 }}>{actions}</Box>}
          </Box>
        </Paper>

        <Paper
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          {children}
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default PageLayout;
