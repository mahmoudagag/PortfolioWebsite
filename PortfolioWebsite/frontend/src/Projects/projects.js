class projectInformation{
    constructor(name, languages, image, modal){
        this.name = name
        this.languages = languages
        this.image = image
        this.modal = modal
    }
}
class Modal{
    constructor(name, languages, description, githubURL, webSiteURL, div, background, image, numberOfImages){
        this.name = name
        this.languages = languages
        this.description = description
        this.githubURL = githubURL
        this.webSiteURL = webSiteURL
        this.div = div
        this.background = background
        this.image = image
        this.numberOfImages = numberOfImages
    }
}
const PortfolioWebsiteUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost"
const PortfolioWebsitePort = process.env.REACT_APP_PORTFOLIOWEBSITE_PORT || "8080"
const StockPaperTradingPort = process.env.REACT_APP_STOCKPAPERTRADINGAPP_PORT || "8080"
const WhatsTheWordPort = process.env.REACT_APP_WHATSTHEWORDAPP_PORT || "8080"
const MealsyPort = process.env.REACT_APP_MEALSYAPP_PORT || "8080"
console.log(process.env)

const stockModal = new Modal("Stock Simulator Web App",
    "React, Golang, Mongodb",
    "A web app that allows users to simulate buying and selling stocks. Users register and log into their accounts. They can search stocks up and get live stock prices with graphs of the stock at different time intervals. Users can monitor they history and they networth over time.",
    "https://github.com/mahmoudagag/StockSimulator",
    `${PortfolioWebsiteUrl}:${StockPaperTradingPort}`, // add later 
    "stockappdetails",
    "popupstockbackground",
    "Stockpopupbackgroundimage",
    8
)

const whatsTheWordModal = new Modal("What's the Word Game",
    "React, node, websocket",
    "An interactive web-based game designed for playing with friends. Players are challenged with creating words using two given letters. This app leverages websockets to establish groups and event listeners.",
    "https://github.com/mahmoudagag/WhatsTheWordApp",
    `${PortfolioWebsiteUrl}:${WhatsTheWordPort}`, // add later 
    "whatsthewordappdetails",
    "popupwhatsthewordbackground",
    "whatsthewordprojectimg",
    6
)

const visulaizedSearchingAlgorithmModal = new Modal("Visulaized Searching Algorithm",
    "JavaScript, HTML, CSS",
    "This software allows users to visualize different searching algorithms. Users can choose one of the five algorithms. Then place the start and end point anywhere on the graph. Add blocks to increase complexity or pick from one of the premade mazes. Finally click visualize to watch the magic happen.",
    "https://github.com/mahmoudagag/Visualize-Search-Algorithms",
    `${PortfolioWebsiteUrl}:${PortfolioWebsitePort}/VisualizeSearchingAlogrithms/`, 
    "searchingappdetails",
    "popupsearchingbackground",
    "searchprojectimg",
    4
)

const mealsyModal = new Modal("Mealsy",
    "React, node, Mongodb",
    "Introducing a versatile web application designed for meal planning. Easily schedule meals on a calendar, complete with ingredients and recipes. Stay organized with automatic tracking of weekly ingredient needs. Need culinary inspiration? Our app integrates seamlessly with third-party APIs to suggest recipes based on your preferences. Plus, the APIs to provide nutritional insights, helping you monitor your macros effortlessly",
    "https://github.com/mahmoudagag/Measly",
    `${PortfolioWebsiteUrl}:${MealsyPort}`, // add later 
    "mealsyappdetails",
    "popupmeaslybackground",
    "mealsyprojectimg",
    6
)

const visulaizedSortingAlgorithmModal = new Modal("Visulaized Sorting Algorithm",
    "JavaScript, HTML, CSS",
    "This software allows users to visualize different sorting algorithms.Users can choose one of the six algorithms. Users are also able to chane the size of the array and the speed of the visualization. A control panel is also given to allow users better notice the subtle changes in the list.",
    "https://github.com/mahmoudagag/Visual-Sorting-Algorithms",
    `${PortfolioWebsiteUrl}:${PortfolioWebsitePort}/VisualizeSortingAlogrithms/`, 
    "sortingappdetails",
    "popupsortingbackground",
    "sortingprojectimg",
    3
)
const ticTacToeModal = new Modal("Tic Tac Toe",
    "Python, pygame",
    "This is a simple tic-tac-toe game using python and displayed using pygame. Users play against an AI which was implemented using a minimax algorithm. However it might take a while if you're trying to win because the AI is impossible to beat.",
    "https://github.com/mahmoudagag/Tic-Tac-Toe-AI",
    null, 
    "tictactoeAppDetails",
    "popupTictactoeBackground",
    "tictactoeprojectimg",
    2
)
const sudokuSolverModal = new Modal("Sudoku Solver",
    "Python, pygame",
    "A sudoku game made with python and displayed utilizing pygame library. Users can either try to solve the game themselves or press the solve button to watch the puzzle solve itself. The algorithm uses a backtracking algorithm to solve the puzzle.",
    "https://github.com/mahmoudagag/Sudoku-solver",
    null, 
    "sudokuAppDetails",
    "popupSudokuBackground",
    "sudokuProjectImg",
    2
)

// ASL learner, whats the word game, measly
export const projects = [
    new projectInformation("Stock Simulator Web App", "React, Golang, Mongodb", "StockSimulatorBackground", stockModal),
    new projectInformation("What's the Word Game", "React, Node, SocketIO", "WhatsThewordBackground", whatsTheWordModal),
    new projectInformation("Visual Searching Algorithms", "JavaScript", "SearchingProjectBackground", visulaizedSearchingAlgorithmModal),
    new projectInformation("Mealsy", "React, Node, Mongodb ", "MeaslyBackground", mealsyModal),
    new projectInformation("Visual Sorting Algorithms", "JavaScript", "SortingProjectBackground", visulaizedSortingAlgorithmModal), 
    new projectInformation("Tic Tac Toe AI", "Python", "TicTacToeBackground", ticTacToeModal), 
    new projectInformation("Sudoku AI", "Python", "SudokuProjectBackground", sudokuSolverModal), 
    ]