const palette =
document.getElementById("palette");

const savedPalettes =
document.getElementById("savedPalettes");

let colors = [];

let locked =
[false,false,false,false,false];

function randomColor(){

    const chars =
    "0123456789ABCDEF";

    let color="#";

    for(let i=0;i<6;i++){

        color += chars[
            Math.floor(
            Math.random()*16
            )
        ];
    }

    return color;
}

function generatePalette(){

    palette.innerHTML="";

    for(let i=0;i<5;i++){

        if(!locked[i]){
            colors[i] = randomColor();
        }

        const card =
        document.createElement("div");

        card.className =
        "color-card";

        card.innerHTML = `
        <div class="color"
        style="background:${colors[i]}">

            <button
            class="lock-btn"
            onclick="toggleLock(${i},this)">
            ${locked[i] ? "🔒" : "🔓"}
            </button>

        </div>

        <div class="info"
        onclick="copyColor('${colors[i]}',this)">
        ${colors[i]}
        </div>
        `;

        palette.appendChild(card);
    }
}

function copyColor(color,el){

    navigator.clipboard.writeText(
    color
    );

    const old =
    el.innerHTML;

    el.innerHTML =
    "✅ Copied";

    setTimeout(()=>{

        el.innerHTML =
        old;

    },1000);
}

function toggleLock(index,btn){

    locked[index] =
    !locked[index];

    btn.innerHTML =
    locked[index]
    ? "🔒"
    : "🔓";
}

document
.getElementById(
"generateBtn"
)
.addEventListener(
"click",
generatePalette
);

document
.getElementById(
"gradientBtn"
)
.addEventListener(
"click",
()=>{

    const gradient =
    `linear-gradient(
    135deg,
    ${colors[0]},
    ${colors[4]}
    )`;

    document.body.style.background =
    gradient;

    navigator.clipboard.writeText(
    gradient
    );

    alert(
    "Gradient CSS copied!"
    );
});

document
.getElementById(
"saveBtn"
)
.addEventListener(
"click",
()=>{

    const favs =
    JSON.parse(
    localStorage.getItem(
    "favorites"
    )
    ) || [];

    favs.push(
    [...colors]
    );

    localStorage.setItem(
    "favorites",
    JSON.stringify(
    favs
    )
    );

    loadFavorites();

    alert(
    "Palette Saved ❤️"
    );
});

function loadFavorites(){

    const favs =
    JSON.parse(
    localStorage.getItem(
    "favorites"
    )
    ) || [];

    savedPalettes.innerHTML =
    "";

    favs.forEach(
    paletteArr=>{

        const row =
        document.createElement(
        "div"
        );

        row.className =
        "favorite-item";

        paletteArr.forEach(
        color=>{

            const block =
            document.createElement(
            "div"
            );

            block.className =
            "favorite-color";

            block.style.background =
            color;

            row.appendChild(
            block
            );
        });

        savedPalettes.appendChild(
        row
        );
    });
}

document
.getElementById(
"exportBtn"
)
.addEventListener(
"click",
()=>{

html2canvas(
document.querySelector(
".palette"
)
).then(canvas=>{

const link =
document.createElement(
"a"
);

link.download =
"palette.png";

link.href =
canvas.toDataURL();

link.click();

});
});

document
.addEventListener(
"keydown",
e=>{

if(
e.code==="Space"
){

e.preventDefault();

generatePalette();

}
});

generatePalette();

loadFavorites();