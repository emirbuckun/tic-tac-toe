# Tic-Tac-Toe Game

![image](https://user-images.githubusercontent.com/63044078/228166335-5679410e-84ec-468d-9d7e-16fd319e876f.png)

This project is a tic-tac-toe game. It's created using React which demonstrates the following:
1. Creating component
2. Passing data through props
3. Making an interactive component
5. Using function component

## Live Application URL
The application is deployed in https://emirbuckun.github.io/tic-tac-toe/.
Click on the link to see the application.

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs.

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app.

```bash
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local.
Install all the npm packages. Go into the project folder and type the following command to install all npm packages:

```bash
npm install
```

In order to run the application type the following command:

```bash
npm start
```

The application runs on **localhost:3000**

## Application Design

#### Components

1. **Square** Component : This is a function component that renders a square. It's used in the **Board** Component to display the squares.

2. **Board** Component : This component displays the squares using nested loop.

3. **Game** Component : This component displays the board, the move history list and the status of the game. It handles the clicks to the board.

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**Tutorial: Intro to React** : Example tutorial https://reactjs.org/tutorial/tutorial.html
