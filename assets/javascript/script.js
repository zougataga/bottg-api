(async () => {
    const
        project = document.querySelector("#Project"),
        allRepo = await getRepo();

    let all = [];
    for (let i = 0; i < allRepo.length; i++) {
        const e = allRepo[i];
        all.push(`
        <li class="list-item" onclick="goLink('https://github.com/${e.full_name}')">
        <img class="list-item-image"
            src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-github-1.png&r=255&g=255&b=255">
        <div class="list-item-info">
            <div class="info-title">${e.name.toUpperCase()} <img
                    src="https://emoji.discadia.com/emojis/ec4dd4a1-f108-4066-a11a-85c3d00aa01f.PNG"
                    style="width:12px; height:12px" />
            </div>
            <div class="info-subtitle">${e.description ? (e.description.length <= 40 ? e.description : e.description.slice(0, 40) + "...") : "Aucune description"}</div>
        </div>
        <button class="btn-add">
            <svg aria-hidden="true" role="img" width="24" height="24"
                class="connectedAccountOpenIcon-OngaxI right-1dJ0yM" viewBox="0 0 24 24">
                <polygon fill="currentColor" fill-rule="nonzero"
                    points="13 20 11 20 11 8 5.5 13.5 4.08 12.08 12 4.16 19.92 12.08 18.5 13.5 13 8">
                </polygon>
            </svg>
        </button>
    </li>
        `);
        project.innerHTML = all.join("\n")
    }
})()
function getRepo(n) {
    return new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.open('GET', `https://api.github.com/users/zougataga/repos`, true);
        request.responseType = 'json';
        request.onload = function () {
            const status = request.status;
            resolve(status === 200 ? request.response : false)
        };
        request.send();
    })
}

function goLink(url) {
    window.open(url, "_blank")
}

let
    allPageBtn = document.querySelector(".pagebtn").querySelectorAll("button"),
    all = [];

allPageBtn.forEach(e => {
    const a = document.querySelector(`#${e.innerText}`);
    if (a) all.push({ e, a })
});

all.forEach(r => {
    const { e, a } = r;
    e.addEventListener("click", () => {
        all.forEach(r => {
            const { e, a } = r;
            e.classList.remove("active");
            a.style.display = "none"
        });
        e.classList.add("active");
        a.style.display = "block"
    })
});

