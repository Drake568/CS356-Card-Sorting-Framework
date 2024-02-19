import { useEffect, useState } from "react";
import "./App.css";
import quotesData from "./quotes.json";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/joy";

function App() {
  const [primaryCategories, setPrimaryCategories] = useState<string[]>([]);
  const [secondaryCategories, setSecondaryCategories] = useState<string[]>([]);
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] =
    useState<string>("");
  const [selectedSecondaryCategory, setSelectedSecondaryCategory] =
    useState<string>("");

  useEffect(() => {
    const categories = quotesData.quotes.map((quote) => quote.category);
    const uniqueCategories = Array.from(new Set(categories));
    setPrimaryCategories(uniqueCategories);
    const secondaryCategories = quotesData.quotes.map(
      (quote) => quote.subcategory
    );
    const uniqueSubCategories = Array.from(new Set(secondaryCategories));
    setSecondaryCategories(uniqueSubCategories);
  }, []);

  const handlePrimaryCategoryClick = (category: string) => {
    const subCategories = quotesData.quotes
      .filter((quote) => quote.category === category)
      .map((quote) => quote.subcategory);
    const uniqueSubCategories = Array.from(new Set(subCategories));
    setSecondaryCategories(uniqueSubCategories);
    setSelectedPrimaryCategory(category);
    setSelectedSecondaryCategory("");
  };

  return (
    <div className="App">
      <br />
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <button onClick={() => setSelectedPrimaryCategory("")}>
          Clear Selections
        </button>
      </Stack>
      <br />
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <p>Primary Categories:</p>
        {primaryCategories.map((category) => (
          <button
            key={category}
            onClick={() => handlePrimaryCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </Stack>
      {selectedPrimaryCategory && (
        <>
          <br />
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <p>Subcategories:</p>
            {secondaryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedSecondaryCategory(category)}
              >
                {category}
              </button>
            ))}
          </Stack>
        </>
      )}
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container justifyContent={"center"}>
          {!selectedPrimaryCategory && (
            <>
              {quotesData.quotes.map((quote) => (
                <Card
                  variant="outlined"
                  size="sm"
                  sx={{
                    width: 300,
                    height: 150,
                    position: "relative",
                    margin: 0.5,
                  }}
                >
                  <CardContent>
                    <Typography level="body-md">{quote.text}</Typography>
                    <Typography level="body-sm">{quote.author}</Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {selectedPrimaryCategory &&
            !selectedSecondaryCategory &&
            quotesData.quotes
              .filter((quote) => quote.category === selectedPrimaryCategory)
              .map((quote) => (
                <Card
                  variant="outlined"
                  size="sm"
                  sx={{
                    width: 300,
                    height: 150,
                    position: "relative",
                    margin: 0.5,
                  }}
                >
                  <CardContent>
                    <Typography level="body-md">{quote.text}</Typography>
                    <Typography level="body-sm">{quote.author}</Typography>
                  </CardContent>
                </Card>
              ))}
          {selectedSecondaryCategory &&
            quotesData.quotes
              .filter(
                (quote) => quote.subcategory === selectedSecondaryCategory
              )
              .map((quote) => (
                <Card
                  variant="outlined"
                  size="sm"
                  sx={{
                    width: 300,
                    height: 150,
                    position: "relative",
                    margin: 0.5,
                  }}
                >
                  <CardContent>
                    <Typography level="body-md">{quote.text}</Typography>
                    <Typography level="body-sm">{quote.author}</Typography>
                  </CardContent>
                </Card>
              ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
