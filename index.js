#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import boxen from "boxen";
import clear from "clear";
class NumberGuessingGame {
    // This method is used to display starting of our game
    async greeting() {
        const animation = chalkAnimation.rainbow(boxen(`
    Determine the hidden number and triumph over the game!
        
    ___________________________________  
    | _____ |   | ___ | ___ ___ | |   | |
    | |   | |_| |__ | |_| __|____ | | | |
    | | | |_________|__ |______ |___|_| |
    | |_|   | _______ |______ |   | ____|
    | ___ | |____ | |______ | |_| |____ |
    |___|_|____ | |   ___ | |________ | |
    |   ________| | |__ | |______ | | | |
    | | | ________| | __|____ | | | __| |
    |_| |__ |   | __|__ | ____| | |_| __|
    |   ____| | |____ | |__ |   |__ |__ |
    | |_______|_______|___|___|___|_____|

    𝓓𝓸𝓷𝓮 𝓫𝔂 𝓘𝓺𝓻𝓪 𝓩𝓪𝓲𝓷𝓪𝓫 
      `, {
            title: "Number Guessing Game Project",
            titleAlignment: "center",
            borderStyle: "double",
            padding: 1,
            margin: 1,
        }));
        await this.stopAnimation(animation, 3);
        this.gameLogic();
    }
    // This method is used to stop the animations
    stopAnimation(animation, duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                animation.stop();
                resolve();
            }, duration * 1000);
        });
    }
    // We use this method to generate the random number every time the game starts
    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        return randomNumber;
    }
    // This is the main game logic
    async gameLogic() {
        let userLife = 5;
        const targetNumber = this.generateRandomNumber();
        while (true) {
            if (userLife !== 0) {
                console.log(chalk.cyan.bold(` ${userLife} Remaining Life Tokens`));
                // Getting input from the user
                const userInput = await inquirer.prompt([
                    {
                        name: "userNumber",
                        type: "number",
                        message: chalk.italic.magentaBright.bold(`Time to guess! What's the number between 1-10?\n`),
                    },
                ]);
                if (!isNaN(userInput.userNumber) &&
                    userInput.userNumber > 0 &&
                    userInput.userNumber <= 10) {
                    const differece = Math.abs(targetNumber - userInput.userNumber);
                    if (differece === 0) {
                        console.log(chalk.bgMagenta.bold(` Amazing! You guessed it right! The number was correct.${targetNumber} `));
                        break;
                    }
                    else if (differece < 2) {
                        console.log(chalk.blue.bold.italic("Oops, very close! Only one digit away from stunning me!\n"));
                        userLife--;
                    }
                    else if (differece <= 2) {
                        console.log(chalk.blue.bold("You're near! Continue moving forward!"));
                        userLife--;
                    }
                    else {
                        console.log(chalk.blue.bold("You're afar. Give it another try!\n"));
                        userLife--;
                    }
                }
                else {
                    console.log(chalk.red.bold(`Kindly provide a number that falls within the designated range.`));
                }
            }
            else {
                console.log(chalk.bgRed(` Oh no!Game Over... The number was ${targetNumber} `));
                break;
            }
        }
        this.restartGame();
    }
    // This method is used to restart the game
    async restartGame() {
        const endingChoices = [
            "Absolutely, I can accomplish it this time.",
            "No, I've wrapped up.\n",
        ];
        const restartGame = await inquirer.prompt([
            {
                name: "userDecision",
                type: "list",
                message: chalk
                    .hex("#F77F00")
                    .underline.bold("\nAre you optimistic for another attempt?\n"),
                choices: endingChoices,
            },
        ]);
        if (restartGame.userDecision === endingChoices[0]) {
            this.gameLogic();
        }
        else {
            const endingAnimation = chalkAnimation.pulse(`Farewell! Until we meet again. :) `);
            await this.stopAnimation(endingAnimation, 3);
        }
    }
    async main() {
        // This method is used to clear the terminal before starting the main execution
        clear();
        this.greeting();
    }
}
// Creating an instance of the Class
const game = new NumberGuessingGame();
// Calling the main method
game.main();
