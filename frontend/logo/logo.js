document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("logoCanvas");
    const ctx = canvas.getContext("2d");

    let blur = 10;            
    let increment = 0.5;      

    function draw() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 32px 'Bebas Neue'";
        ctx.fillStyle = "#e50914";
        ctx.shadowColor = "red";
        ctx.shadowBlur = blur;
        const xGame = 10;
        const y = 35;
        ctx.fillText("Game", xGame, y);

        const gameWidth = ctx.measureText("Game").width;

        
        ctx.font = "bold 20px 'Bebas Neue'";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "white";
        ctx.shadowBlur = blur / 1.5;
        const xVerse = xGame + gameWidth + 10;
        ctx.fillText("Verse", xVerse, y);

        
        blur += increment;
        if (blur > 25 || blur < 10) {
            increment *= -1; 
        }

        
        requestAnimationFrame(draw);
    }

    draw(); 
});
