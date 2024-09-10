// Object to track the character's position
let characterPosition = { x: 0, y: 2 };
// Array to keep track of the character's previous positions
let body = ["02"];
let bodySize = 2;

// Function to move the character down
function moveDown() {
    // Check if moving down is within bounds and if the new position is not in body
    if (characterPosition.y > 0 && !body.includes(characterPosition.x.toString() + (characterPosition.y - 1).toString())) {
        characterPosition.y -= 1; // Update the character's Y position
        updateGrid(); // Update the grid
    }
}

// Function to move the character right
function moveRight() {
    // Check if moving right is within bounds and if the new position is not in body
    if (characterPosition.x < 4 && !body.includes((characterPosition.x + 1).toString() + characterPosition.y.toString())) {
        characterPosition.x += 1; // Update the character's X position
        updateGrid(); // Update the grid
    }
}

// Function to move the character up
function moveUp() {
    // Check if moving up is within bounds and if the new position is not in body
    if (characterPosition.y < 3 && !body.includes(characterPosition.x.toString() + (characterPosition.y + 1).toString())) {
        characterPosition.y += 1; // Update the character's Y position
        updateGrid(); // Update the grid
    }
}

// Function to move the character left
function moveLeft() {
    // Check if moving left is within bounds and if the new position is not in body
    if (characterPosition.x > 0 && !body.includes((characterPosition.x - 1).toString() + characterPosition.y.toString())) {
        characterPosition.x -= 1; // Update the character's X position
        updateGrid(); // Update the grid
    }
}

// Function to update the cell based on the character's new position
function updateGrid() {
    // If the body has 3 positions, change the oldest position to yellow
    if (body.length === bodySize) {
        document.getElementById(body[0]).innerHTML = "⬜";
        body.shift(); // Remove the oldest position from body
    }
    // Add the new position to body
    body.push(characterPosition.x.toString() + characterPosition.y.toString());
    // Update the current position with the "😐" emoji
    document.getElementById(body[body.length - 1]).innerHTML = "😐";
    // Update the previous position with the "⚫" emoji
    document.getElementById(body[body.length - 2]).innerHTML = "⚫";
    if (body.length > 1) {
        document.getElementById(body[0]).innerHTML = "🔘";
    }
    if (body.length > 2) {
        document.getElementById(body[1]).innerHTML = "🟤";
    }
    if (body.length > 3) {
        document.getElementById(body[2]).innerHTML = "🟤";
    }
    checkForGreenBlock(); // Check if the character has landed on a green block
}

// Variables for the position of the green block
let greenBlockX = 3;
let greenBlockY = 1;

// Function to randomly place a green block on the grid
function placeGreenBlock() {
    // Generate random positions for the green block
    let randomX = Math.random();
    greenBlockX = Math.floor(randomX * 5);
    let randomY = Math.random();
    greenBlockY = Math.floor(randomY * 4);
    if (body.length !== 20) {
        // If the position is already occupied, try again
        if (body.includes(greenBlockX.toString() + greenBlockY.toString())) {
            placeGreenBlock();
        } else {
            // Update the cell with the green block
            document.getElementById(greenBlockX.toString() + greenBlockY.toString()).innerHTML = "🟩";
        }
    } else {
        console.log("You got all green blocks");
    }
}

// Function to check if the character has landed on a green block
function checkForGreenBlock() {
    // If the character's position matches the green block's position
    if (characterPosition.x.toString() + characterPosition.y.toString() === greenBlockX.toString() + greenBlockY.toString()) {
        // Change the cell content to a happy face
        document.getElementById(characterPosition.x.toString() + characterPosition.y.toString()).innerHTML = "😃";
        bodySize += 1;
        placeGreenBlock(); // Place a new green block
    }
}
