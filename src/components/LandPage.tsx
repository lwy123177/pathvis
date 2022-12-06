import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        PathVisual
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const cards = [1, 2, 3];
const images = [
  require("../resources/AStar.gif"),
  require("../resources/BFS.gif"),
  require("../resources/DFS.gif"),
];
const headings = ["AStar", "BFS", "DFS"];
const content = [
  "A* algorithm is a best-first search algorithm",
  "BFS is a breadth-first search algorithm",
  "DFS is a depth-first search algorithm",
];

const theme = createTheme();

const LandPage = () => {
  const pageRedirect = (url: string) => {
    const page = window.open(url, "_blank");
    if (page) page.focus();
  };
  const handleViewSourceCode = () => {
    pageRedirect("https://github.com/lwy123177/lwy123177.github.io");
  };
  const handleContactAuthor = () => {
    pageRedirect("https://leetcode.com/lwy123177/");
  };
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              PathVisual
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              PathVisual is a simple path visualizer to demostrate how
              Depth-first Search (DFS), Breadth-first Search (BFS) and A*
              algorithm works
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleViewSourceCode}>
                View Source Code
              </Button>
              <Button variant="outlined" onClick={handleContactAuthor}>
                Author
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, idx) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: "56.25%",
                    }}
                    image={images[idx]}
                    alt={headings[idx]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {headings[idx]}
                    </Typography>
                    <Typography>{content[idx]}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(headings[idx])}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          PathVisual
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          For educational purposes only
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};
export default LandPage;
