import { PauseCircle, PlayCircle } from "@mui/icons-material";
import { Box, Button, Grid, Slider, TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const [text, setText] = useState(
    "It’s about searching for, finding, and sharing some truth. That’s what I’m looking for in everybody’s music, in every genre–having the truth exposed. A truth always comes out in art. I think comedy finds it, and I think good songwriting finds it. I believe that all art is about this truth, which is almost invisible at most other times, when we’re less aware, locked in the drudgery of our day-to-day existences, until art breaks through and points it out to us. Sometimes I think of it as a search for low-hanging fruit, even though I know that’s not quite the right simile–it’s something people walk by all the time, something so ingrained in our environment that it’s become invisible, something so obvious nobody sees it anymore, but then someone figures out how to say what it is, or how to see it, and everyone else says, “Of course! Why didn’t I say that? That’s exactly right. I always knew that was there,” or “That’s exactly how I feel.” Like when Bill Callahan sings, “Well, I can tell you about the river / Or we could just get in.”"
  );

  const [wordsPerMinute, setWordsPerMinute] = useState(60);

  const [wordIndex, setWordIndex] = useState(0);

  const [play, setPlay] = useState(false);

  const [nextWordInterval, setNextWordInterval] = useState<any>();

  const getWords = () => {
    return text.split(" ");
  };

  const changePlay = () => {
    if (play) {
      // stop interval

      clearInterval(nextWordInterval);
      setNextWordInterval(undefined);
    } else {
      // start interval

      const waitTime = (60 / wordsPerMinute) * 1000;

      const i = setInterval(() => {
        setWordIndex((w) => {
          if (w === getWords().length) return 0;
          return w + 1;
        });
      }, waitTime);

      setNextWordInterval(i);
    }

    setPlay(!play);
  };

  const pause = () => {
    setPlay(false);
    clearInterval(nextWordInterval);
    setNextWordInterval(undefined);
  };

  const handleWordsPerMinuteChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    pause();
    setWordsPerMinute(newValue as number);
  };

  const handleWordIndexChange = (event: Event, newValue: number | number[]) => {
    pause();
    setWordIndex(newValue as number);
  };

  return (
    <Box sx={{ margin: "32px", textAlign: "center" }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
        label="Add text!"
      ></TextField>

      <Button onClick={() => setText("")} variant="contained" sx={{ mt: 2 }}>
        Clear
      </Button>

      <br />

      <p>Words Per Minute: {wordsPerMinute}</p>
      <Slider
        value={wordsPerMinute}
        onChange={handleWordsPerMinuteChange}
        sx={{ width: "300px" }}
        min={60}
        step={60}
        marks
        max={600}
      />

      <p>Word Index: {wordIndex}</p>
      <Slider
        value={wordIndex}
        onChange={handleWordIndexChange}
        sx={{ width: "300px" }}
        min={0}
        max={getWords().length}
      />

      <Box
        marginTop={"64px"}
        marginBottom={"64px"}
        padding="32px"
        borderTop="1px solid black"
        borderBottom="1px solid black"
        sx={{ whiteSpace: "nowrap" }}
      >
        <h1>{getWords()[wordIndex]}</h1>
      </Box>

      <Button
        onClick={() => changePlay()}
        variant="contained"
        sx={{ mt: 2 }}
        endIcon={play ? <PauseCircle /> : <PlayCircle />}
      >
        {play ? "Pause" : "Play"}
      </Button>

      <Box m={4}>
        <Grid container spacing={1}>
          {getWords().map((word, i) => {
            return (
              <Grid
                xs={4}
                md={1}
                item
                sx={{ background: i === wordIndex ? "red" : "inherit" }}
                key={word}
              >
                <Box
                  style={{
                    margin: "4px",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                >
                  {word}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
