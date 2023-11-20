import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GridCard from './GridCard';
import { IWord, Words } from '../data/Words';
import Buttons from './Buttons'; 
import GridCategory from './GridCategory';
import Alert from '@mui/material/Alert';


interface IGameData {
    selectedWords: Set<IWord>;
    remainingWords: Set<IWord>;
    solvedCategories: string[];
    submissionResult: string | undefined;
}

interface ISubmissionResult {
    submissionResult: string | undefined;
}

export default function GameGrid() {
    const [gameData, setGameData] = React.useState<IGameData>({
        selectedWords: new Set<IWord>(),
        remainingWords: Words,
        solvedCategories: [],
        submissionResult: undefined
    })

    const onGridCardSelected = (word: IWord) => {
        if ((!gameData.selectedWords || !gameData.selectedWords.has(word)) && !(gameData.selectedWords.size >= 4)) {
            setGameData(
                {
                    selectedWords: new Set(gameData.selectedWords).add(word),
                    remainingWords: gameData.remainingWords,
                    solvedCategories: gameData.solvedCategories,
                    submissionResult: gameData.submissionResult
                }
            );
            return;
        }

        const newSelectedWords = new Set(gameData.selectedWords);
        newSelectedWords.delete(word);
        setGameData(
            {
                selectedWords: newSelectedWords,
                remainingWords: gameData.remainingWords,
                solvedCategories: gameData.solvedCategories,
                submissionResult: undefined
            }
        );
    }

    const onDeselectAll = () => {
        const newSelectedWords = new Set<IWord>();
        setGameData(
            {
                selectedWords: newSelectedWords,
                remainingWords: gameData.remainingWords,
                solvedCategories: gameData.solvedCategories,
                submissionResult: undefined
            }
        );
    }

    const canSubmit = () => !!(gameData.selectedWords && gameData.selectedWords.size == 4);

    const onSubmit = () => {
        const submittedCategoryCount = new Map();
        if (gameData.selectedWords) {
            Array.from(gameData.selectedWords).forEach(word => {
                const existingEntry = submittedCategoryCount.get(word.category);
                if (existingEntry) {
                    submittedCategoryCount.set(word.category, existingEntry+1)
                } else {
                    submittedCategoryCount.set(word.category, 1)
                }
            });

            if (submittedCategoryCount.size == 1) {
                // update remaining words
                const newRemainingWords = new Set(gameData.remainingWords);
                Array.from(gameData.selectedWords).forEach(word => {
                    newRemainingWords.delete(word);
                });

                // update solved categories
                const newSolvedCategories = gameData.solvedCategories;
                newSolvedCategories.push(Array.from(submittedCategoryCount.keys())[0]);

                // update selected set
                const newSelectedWords = new Set<IWord>();

                // update submission result
                const newSubmissionResult = "You got it!"

                setGameData(
                    {
                        selectedWords: newSelectedWords,
                        remainingWords: newRemainingWords,
                        solvedCategories: newSolvedCategories,
                        submissionResult: newSubmissionResult
                    }
                );
            }

            else if (submittedCategoryCount.size == 2) {
                const counts = Array.from(submittedCategoryCount.values());
                if (counts.includes(1) && counts.includes(3)) {
                    // update submission result
                    const newSubmissionResult = "One away!"

                    setGameData(
                        {
                            selectedWords: gameData.selectedWords,
                            remainingWords: gameData.remainingWords,
                            solvedCategories: gameData.solvedCategories,
                            submissionResult: newSubmissionResult
                        }
                    );
                } else {
                    // update submission result
                    const newSubmissionResult = "Nice try!"

                    setGameData(
                        {
                            selectedWords: gameData.selectedWords,
                            remainingWords: gameData.remainingWords,
                            solvedCategories: gameData.solvedCategories,
                            submissionResult: newSubmissionResult
                        }
                    );
                }
            }

            else {
                // update submission result
                const newSubmissionResult = "Nice try!"

                setGameData(
                    {
                        selectedWords: gameData.selectedWords,
                        remainingWords: gameData.remainingWords,
                        solvedCategories: gameData.solvedCategories,
                        submissionResult: newSubmissionResult
                    }
                );
            }
        }
    }

    return (
    <>
        <Box sx={{display:"flex", justifyContent:"center", margin: 2}}>
        <Grid container spacing={2} columns={4} sx={{width: 330, height: 330}}>
            {gameData.solvedCategories.map((category, index) => (
            <Grid xs={4} key={index}>
                <GridCategory category={category}></GridCategory>
            </Grid>
            ))}
            {Array.from(gameData.remainingWords).map((word, index) => (
            <Grid xs={1} key={index}>
                <GridCard word={word} isSelected={!!(gameData.selectedWords && gameData.selectedWords.has(word))} onSelected={onGridCardSelected}></GridCard>
            </Grid>
            ))}
        </Grid>
        </Box>
        <Buttons canSubmit={canSubmit()} onSubmit={onSubmit} onDeselectAll={onDeselectAll}></Buttons>
        <Box sx={{display:"inline-block", marginTop: 3, justifyContent:"center", width: 330}}>
        {(gameData.submissionResult == "You got it!") ? <Alert severity="success">{gameData.submissionResult}</Alert> 
                : (gameData.submissionResult == "One away!") ?  <Alert severity="info">{gameData.submissionResult}</Alert> 
                : (gameData.submissionResult == "Nice try!") ? <Alert severity="error">{gameData.submissionResult}</Alert> 
                : undefined}
        </Box>
    </>
  );
}
