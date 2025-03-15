// Game Data: Different levels with broken code snippets
const levels = [
    {
        brokenCode: `function greet(name) {
    console.log("Hello, " + name;
}`,
        hint: "Check for missing parentheses.",
        solution: `function greet(name) {
    console.log("Hello, " + name);
}`
    },
    {
        brokenCode: `def add_numbers(a, b)
    return a + b`,
        hint: "Check the function syntax.",
        solution: `def add_numbers(a, b):
    return a + b`
    },
    {
        brokenCode: `<html>
<head>
<title>Debugging Challenge</title>
</head>
<body>
<h1>Welcome to the Game</h1>
<p>Fix the HTML errors!<p>
</body>
</html>`,
        hint: "Look for missing closing tags.",
        solution: `<html>
<head>
<title>Debugging Challenge</title>
</head>
<body>
<h1>Welcome to the Game</h1>
<p>Fix the HTML errors!</p>
</body>
</html>`
    },
    {
            "brokenCode": "print 'Hello, World!'",
            "hint": "Check the syntax for the print statement.",
            "solution": "print('Hello, World!')"
        },
        {
            "brokenCode": "let x == 10;",
            "hint": "Check the assignment operator.",
            "solution": "let x = 10;"
        },
        {
            "brokenCode": "if x = 5:\n    print('x is 5')",
            "hint": "Check the condition syntax in Python.",
            "solution": "if x == 5:\n    print('x is 5')"
        },
        {
            "brokenCode": "for(int i = 0; i < 10; i++) {\n    Console.WriteLine(i)\n}",
            "hint": "Check the missing semicolon in C#.",
            "solution": "for(int i = 0; i < 10; i++) {\n    Console.WriteLine(i);\n}"
        },
        {
            "brokenCode": "function add(a, b) {\n    return a + b;",
            "hint": "Check if the function has a closing brace.",
            "solution": "function add(a, b) {\n    return a + b;\n}"
        },
        {
            "brokenCode": "SELECT * FROM users WHERE name = 'John;",
            "hint": "Check for missing closing quotation marks in SQL.",
            "solution": "SELECT * FROM users WHERE name = 'John';"
        },
        {
            "brokenCode": "echo 'Hello World'",
            "hint": "Check if the statement ends correctly in PHP.",
            "solution": "echo 'Hello World';"
        },
        {
            "brokenCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!)\n    }\n}",
            "hint": "Check for missing closing quotation marks and semicolon.",
            "solution": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}"
        },
        {
            "brokenCode": "my_dict = {'name': 'John', age: 30}",
            "hint": "Check the syntax for dictionary keys in Python.",
            "solution": "my_dict = {'name': 'John', 'age': 30}"
        },
        {
            "brokenCode": "val numbers = listOf(1, 2, 3)\nnumbers[3]",
            "hint": "Check for out-of-bounds access in Kotlin.",
            "solution": "val numbers = listOf(1, 2, 3)\nnumbers[2]"
        }
    
    // More broken code examples...
];

let currentQuestion = 0;
let timeLeft = 30;
let timerInterval;

const codeArea = document.getElementById("code-area");
const hintText = document.getElementById("hint");
const timerText = document.getElementById("time-left");
const checkButton = document.getElementById("check-code");
const hintButton = document.getElementById("get-hint");
const resultMessage = document.getElementById("result-message");

// Initialize Game
function startLevel() {

    clearInterval(timerInterval);
    timeLeft = 30;
    timerText.textContent = `${timeLeft}s`;
    checkButton.disabled = false; // Enable the check button

    const levelData = levels[currentQuestion];
    codeArea.value = levelData.brokenCode;
    hintText.textContent = "Hint: ???";
    resultMessage.style.display = "none"; // Hide the result message at the start of the question

    // Start Timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkButton.disabled = true; // Disable the check button after time's up
            resultMessage.textContent = "⏳ Time's up!";
            resultMessage.className = "incorrect"; // Use 'incorrect' class for styling
            resultMessage.style.display = "block";
            codeArea.value = levels[currentQuestion].solution; // Display the solution code
            setTimeout(() => {
                currentQuestion++;
                startLevel();
            }, 5000); // Wait 5 seconds before moving to the next question
        }
    }, 1000);
}

// Check Player’s Code
checkButton.addEventListener("click", () => {
    const playerCode = codeArea.value.trim();
    const correctCode = levels[currentQuestion].solution.trim();

    if (playerCode === correctCode) {
        resultMessage.textContent = "✅ Correct Answer!";
        resultMessage.className = "correct"; // Add 'correct' class for styling
        resultMessage.style.display = "block";
        setTimeout(() => {
            currentQuestion++;
            startLevel();
        }, 2000); // Wait 2 seconds before starting the next question
    } else {
        resultMessage.textContent = "❌ Incorrect Answer! Keep trying.";
        resultMessage.className = "incorrect"; // Add 'incorrect' class for styling
        resultMessage.style.display = "block";
    }
});

// Show Hint
hintButton.addEventListener("click", () => {
    hintText.textContent = `Hint: ${levels[currentQuestion].hint}`;
});

// Start Game
startLevel();
