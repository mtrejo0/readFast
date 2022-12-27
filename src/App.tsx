import { PauseCircle, PlayCircle } from "@mui/icons-material";
import { Box, Button, Grid, Slider, TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Alfred Lord Tennyson wrote this poem as a requiem for his college friend Arthur Henry Hallam who died suddenly at the age of 22. The poem was published almost 21 after Arthur’s death and tracks the journey of Tennyson’s grief. The length of the poem, 2892 lines, adds to the meaning by emphasizing the greatness of the poet’s sadness and how Tennyson continued to mourn his friend throughout his life. The poem includes iconic lines that have become common cliches, like: “‘Tis better to have loved and lost / Than never to have loved at all.” The poem is a good example of British Victorian poetry, both in terms of meter and form. But it also emphasizes friendship as a relationship as important and meaningful as romantic love.");

  const [wordsPerMinute, setWordsPerMinute] = useState(60)

  const [wordIndex, setWordIndex] = useState(0)

  const [play, setPlay] = useState(false)

  const [nextWordInterval, setNextWordInterval] = useState<any>()

  const getWords = () => {
    return text.split(" ").map((each) =>
        each
          .toLowerCase()
          .replace(/[^\w\s\']|_/g, "")
          .replace(/\s+/g, " ")
      )
  
  };


  const changePlay = () => {

    if (play) {
      // stop interval

      clearInterval(nextWordInterval)
      setNextWordInterval(undefined)
    }

    else {
      // start interval

      const waitTime = 60 / (wordsPerMinute) * 1000

      const i = setInterval(() => {
        setWordIndex(w => {
          if (w === getWords().length) return 0
          return w+1
        })
      }, waitTime)

      setNextWordInterval(i)

      
    }

    setPlay(!play)
  }

  const pause = () => {

    setPlay(false)
    clearInterval(nextWordInterval)
    setNextWordInterval(undefined)
  }

  const handleWordsPerMinuteChange = (event: Event, newValue: number | number[]) => {
    pause()
    setWordsPerMinute(newValue as number);
  };

  const handleWordIndexChange = (event: Event, newValue: number | number[]) => {
    pause()
    setWordIndex(newValue as number);
  };

  return (
    <Box sx={{ margin: "32px", textAlign: "center"}}>
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
      

      <br/>
      
      <p>Words Per Minute: {wordsPerMinute}</p>
      <Slider value={wordsPerMinute} onChange={handleWordsPerMinuteChange} sx={{width: "300px"}} min={60} step={60}
  marks
  max={600}/>

<p>Word Index: {wordIndex}</p>
      <Slider value={wordIndex} onChange={handleWordIndexChange} sx={{width: "300px"}} min={0}
  max={getWords().length}/>

      <Box margin={"64px"} padding="32px" border="1px solid black">
        <h1>{getWords()[wordIndex]}</h1>
      </Box>
     
      <Button onClick={() => changePlay()} variant="contained" sx={{ mt: 2 }} endIcon={play ? <PauseCircle/> : <PlayCircle/>}>
        {play ? "Pause" : "Play"}
      </Button>

      

      <Box m={4}>
        <Grid container spacing={1}>

        
        {getWords().map((word, i) => {
                
          return (
            <Grid xs={4} md={1} item sx={{ background: i === wordIndex ? "red" : "inherit" }} key={word}>
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
