import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        height: "4rem",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          Beyza DENİZ ARIKAN tarafından, Niltek Yazılım Teknolojileri A.Ş için
          geliştirilmiştir.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
