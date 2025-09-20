const recipes = {
    "eggs,tomato,spinach": "Spinach & Tomato Omelette",
    "rice,egg,carrot": "Egg Fried Rice",
    "rice,jeera": "Jeera Rice",
    "bread,butter,sugar": "French Toast",
    "chicken,garlic,lemon": "Lemon Garlic Chicken",
    "milk,banana,nuts": "Banana Nut Smoothie",
    "tomato,basil,cheese": "Margherita Pizza",
    "avocado,tomato": "Avocado Tomato Salad",
    "milk,flour,egg": "Pancakes",
    "potato,butter,salt": "Mashed Potato",
    "chicken,rice,pepper": "Chicken Biryani",
    "tomato,onion,spices": "Tomato Curry",
    "flour,sugar,butter": "Cookies",
    "banana,milk,honey": "Banana Smoothie",
    "pasta,tomato,cheese": "Pasta Alfredo"
};

const defaultResponses = [
    "Try making a smoothie or a fruit salad with those ingredients!",
    "You could bake something delicious!",
    "Hmm… maybe a simple stir-fry could work!"
];

function getRecipe() {
    const inputField = document.getElementById("ingredient-input");
    const response = document.getElementById("response");

    let input = inputField.value.toLowerCase().replace(/\s+/g, '');
    let inputArr = input.split(',').filter(i => i);

    if (inputArr.length === 0) {
        response.innerText = "Please enter some ingredients!";
        return;
    }

    let bestMatch = "";
    let highestMatchCount = 0;
    let highestPercentage = 0;

    for (let key in recipes) {
        let recipeIngredients = key.split(",");
        let matchedCount = recipeIngredients.filter(ing => inputArr.includes(ing)).length;
        let matchPercentage = matchedCount / recipeIngredients.length;

        // Choose the recipe with more matched ingredients
        if (matchedCount > highestMatchCount) {
            highestMatchCount = matchedCount;
            highestPercentage = matchPercentage;
            bestMatch = recipes[key];
        } 
        // Tie-breaker: if same matched count, choose recipe with higher match percentage
        else if (matchedCount === highestMatchCount && matchPercentage > highestPercentage) {
            highestPercentage = matchPercentage;
            bestMatch = recipes[key];
        } 
        // Tie-breaker: same match count & percentage → choose recipe with fewer ingredients
        else if (matchedCount === highestMatchCount && matchPercentage === highestPercentage 
                 && recipeIngredients.length < bestMatch.split(",").length) {
            bestMatch = recipes[key];
        }
    }

    if (highestPercentage === 1) {
        response.innerText = `You might like: ${bestMatch}`;
    } else if (highestMatchCount >= 2) {
        // Partial match with at least 2 ingredients → creative recipe name
        const creativeName = inputArr
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") + " Special";
        response.innerText = `You might like: ${creativeName}`;
    } else {
        const randomSuggestion = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        response.innerText = randomSuggestion;
    }
}
