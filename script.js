document.getElementById("sugarForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const pregnant = gender === "female" ? document.getElementById("pregnant").value : "no";
    const age = parseInt(document.getElementById("age").value);
    const fasting = parseFloat(document.getElementById("fasting").value);
    const afterMeal = parseFloat(document.getElementById("afterMeal").value);
    const diet = document.getElementById("diet").value;

    let category = "";
    let recommendation = "";
    let foodOptions = "";
    let blogLink = "";

    let fastingNormal, afterMealNormal;

    if (age < 6) {
        fastingNormal = 100; 
        afterMealNormal = 140;
    } else if (age >= 6 && age <= 12) {
        fastingNormal = 100;
        afterMealNormal = 140;
    } else if (age >= 13 && age <= 19) {
        fastingNormal = 100;
        afterMealNormal = 140;
    } else {
        fastingNormal = 100;
        afterMealNormal = 140;
    }

    const fastingDiabetes = age >= 20 ? 130 : 180;
    const afterMealDiabetes = age >= 20 ? 180 : 200;

    const vegetarianFoods = `
        🥗 <strong>Vegetarian Choices:</strong><br>
        ✅ <strong>High-Fiber Foods:</strong> Lentils, chickpeas, and quinoa.<br>
        🥦 <strong>Leafy Greens:</strong> Spinach, kale, and broccoli.<br>
        🍓 <strong>Low-Glycemic Fruits:</strong> Berries, apples, and oranges.<br>
    `;

    const nonVegetarianFoods = `
        🍗 <strong>Non-Vegetarian Choices:</strong><br>
        ✅ <strong>Lean Proteins:</strong> Grilled chicken, turkey, and fish (salmon, mackerel).<br>
        🥚 <strong>Eggs:</strong> Rich in protein and keeps blood sugar stable.<br>
        🥩 <strong>Healthy Fats:</strong> Include omega-3-rich fatty fish.<br>
    `;

    const mixedFoods = `
        🍲 <strong>Mixed (Veg & Non-Veg) Choices:</strong><br>
        ✅ <strong>Balanced Proteins:</strong> Chicken, fish, and plant-based proteins (tofu, beans).<br>
        🥦 <strong>Vegetables:</strong> Broccoli, spinach, and carrots.<br>
        🍓 <strong>Fruits:</strong> Berries, apples, and citrus fruits.<br>
    `;

    if (diet === "vegetarian") {
        foodOptions = vegetarianFoods;
    } else if (diet === "non-vegetarian") {
        foodOptions = nonVegetarianFoods;
    } else {
        foodOptions = mixedFoods;
    }

    if (pregnant === "yes") {
        if (fasting < 92 && afterMeal < 140) {
            category = "Normal";
            blogLink = `<a href="https://www.mayoclinic.org/diseases-conditions/gestational-diabetes/diagnosis-treatment/drc-20355345" target="_blank">Learn more about Gestational Diabetes</a>`;
            recommendation = `
                🥗 <strong>Balanced Carbohydrate Distribution:</strong> Spread carbs evenly throughout the day.<br>
                🥦 <strong>Include Lean Proteins:</strong> Eat lean proteins and healthy fats.<br>
            `;
        } else {
            category = "Gestational Diabetes";
            blogLink = `<a href="https://www.mayoclinic.org/diseases-conditions/gestational-diabetes/diagnosis-treatment/drc-20355345" target="_blank">Learn more about Gestational Diabetes</a>`;
            recommendation = `
                🍎 <strong>Low-Glycemic Diet:</strong> Focus on fiber-rich, low-carb foods.<br>
                🍲 <strong>Frequent Blood Sugar Monitoring:</strong> Keep track of sugar levels.<br>
            `;
        }
    } else {
        if (fasting < fastingNormal && afterMeal < afterMealNormal) {
            category = "Normal";
            blogLink = `<a href="https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-management/art-20047963" target="_blank">Learn more about managing diabetes</a>`;
            recommendation = `
                🥗 <strong>Balanced Diet:</strong> Eat whole grains, lean proteins, and vegetables.<br>
                🚶‍♂️ <strong>Stay Active:</strong> Exercise regularly.<br>
            `;
        } else if (
            (fasting >= fastingNormal && fasting < fastingDiabetes) ||
            (afterMeal >= afterMealNormal && afterMeal < afterMealDiabetes)
        ) {
            category = "Pre-Diabetic";
            blogLink = `<a href="https://www.mayoclinic.org/diseases-conditions/prediabetes/diagnosis-treatment/drc-20355284" target="_blank">Learn more about Prediabetes</a>`;
            recommendation = `
                🥗 <strong>Increase Fiber Intake:</strong> Add beans, oats, and lentils.<br>
                🚶‍♂️ <strong>Exercise Regularly:</strong> Engage in physical activities.<br>
            `;
        } else {
            category = "Diabetic";
            blogLink = `<a href="https://www.mayoclinic.org/diseases-conditions/diabetes/diagnosis-treatment/drc-20371451" target="_blank">Learn more about Diabetes</a>`;
            recommendation = `
                🍎 <strong>Low-Carb Diet:</strong> Reduce sugar and refined carbs.<br>
                🥗 <strong>Focus on Healthy Fats:</strong> Include olive oil, nuts, and avocados.<br>
            `;
        }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h2>Your Condition: <span class="${category.replace(/ /g, '-').toLowerCase()}">${category}</span></h2>
        <p>${blogLink}</p>
        <p>${recommendation}</p>
        <h3>🍽️ Recommended Food Options:</h3>
        <p>${foodOptions}</p>
    `;
});

function togglePregnantOption() {
    const gender = document.getElementById("gender").value;
    document.getElementById("pregnantOption").style.display = gender === "female" ? "block" : "none";
}
