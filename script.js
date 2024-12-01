
let plants = JSON.parse(localStorage.getItem('plants')) || [];


document.getElementById('plant-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const plantName = document.getElementById('plantName').value;
    const waterFrequency = parseInt(document.getElementById('waterFrequency').value);
    const fertilizeFrequency = parseInt(document.getElementById('fertilizeFrequency').value);

    const plant = {
        name: plantName,
        waterFrequency: waterFrequency,
        fertilizeFrequency: fertilizeFrequency,
        lastWatered: new Date(),
        lastFertilized: new Date()
    };

    plants.push(plant);
    localStorage.setItem('plants', JSON.stringify(plants));
    alert(`${plantName} added!`);
    drawGrowthTracker();
    this.reset();
});


function drawGrowthTracker() {
    const canvas = document.getElementById('growthCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    plants.forEach((plant, index) => {
        const x = 50 + (index * 90);
        const height = Math.max(10, Math.random() * 150); 
        ctx.fillStyle = '#28a745';
        ctx.fillRect(x, canvas.height - height, 40, height);
        ctx.fillStyle = '#000';
        ctx.fillText(plant.name, x, canvas.height - height - 5);
    });
}


document.getElementById('start-diagnostic').addEventListener('click', function() {
    document.getElementById('diagnostic-questions').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML = ''; 
});


document.getElementById('diagnose-btn').addEventListener('click', function() {
    const soilCondition = document.getElementById('soilCondition').value;
    const leafHealth = document.getElementById('leafHealth').value;
    const growthRate = document.getElementById('growthRate').value;

    let diagnosis = "Diagnostic Results:<br>";

    if (soilCondition === "dry") {
        diagnosis += "Soil is too dry. Water your plant.<br>";
    } else if (soilCondition === "wet") {
        diagnosis += "Soil is too wet. Allow it to dry out.<br>";
    }

    if (leafHealth === "yellowing") {
        diagnosis += "Leaves are yellowing. This could indicate overwatering or nutrient deficiency.<br>";
    } else if (leafHealth === "browning") {
        diagnosis += "Leaves are browning. This may be due to underwatering or direct sunlight exposure.<br>";
    }

    if (growthRate === "stagnant") {
        diagnosis += "Plant is stagnant. Check for pests or consider repotting.<br>";
    } else if (growthRate === "shrinking") {
        diagnosis += "Plant is shrinking. Check your watering schedule and light conditions.<br>";
    }

    if (!diagnosis.includes("Results")) {
        diagnosis += "Your plant seems healthy!";
    }

    document.getElementById('diagnostic-result').innerHTML = diagnosis;
});


drawGrowthTracker();


document.getElementById('reset-button').addEventListener('click', function() {

    localStorage.removeItem('plants');
    plants = []; 


    document.getElementById('plant-form').reset();
    
    
    drawGrowthTracker();
});