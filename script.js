// https://selenium-api-2.onrender.com/title?url=https://example.com

    const final_title_area = document.getElementById("urlDisplay");
    const input_url_area = document.getElementById("urlInput");
    const given_test_urls = document.getElementsByClassName("example-url");
    const button=document.getElementById("find-title-button");
    const final_title=document.getElementById("titleDisplay");

    console.log(given_test_urls.length);

    let len=given_test_urls.length

    let clicked = false;

    for (let i = 0; i < len; i++) {
        given_test_urls[i].addEventListener("mouseover", () => {
            if (!clicked) {
                input_url_area.value = given_test_urls[i].innerText;
            }
        });

        given_test_urls[i].addEventListener("mouseout", () => {
            if (!clicked) {
                input_url_area.value = "";
            }
        });

        given_test_urls[i].addEventListener("click", () => {
            clicked = true;
            input_url_area.value = given_test_urls[i].innerText;
        });
    }



    button.addEventListener('click', () => {

        const val = input_url_area.value.trim();
        console.log("button clicked");
        console.log(val);
        final_title_area.innerHTML = val;
        final_title.innerText="Fetching...";

        fetch("/send",{

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"input_url":val})
        }).then(res => res.text()).then((data) => {

            console.log("data received in console :-");
            console.log(data);
            final_title.innerText=data;
        })
    })

// this can be used
//     const copy_button = document.getElementById("copyBtn");
// const status_msg = document.getElementById("statusMessage");
// const title_dsply = document.getElementById("titleDisplay");
//
// copy_button.addEventListener("click", async () => {
//     const text = title_dsply.innerText
//     if (!text || text === "Fetching..." || text.includes("Enter a URL")) {
//         return;
//     }
//
//     await navigator.clipboard.writeText(text)
//     status_msg.classList.add("show")
//     setTimeout(() => status_msg.classList.remove("show"), 2000)
// })

const cpy_button = document.getElementById("copyBtn");

cpy_button.addEventListener("click", async () => {
    const text = document.getElementById("titleDisplay").innerText;
    if (!text || text === "Fetching...") return;

    await navigator.clipboard.writeText(text);


    cpy_button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {cpy_button.innerHTML = '<i class="far fa-copy"></i>';}, 2000);
});

        // ========== MINIMAL THEME TOGGLE ADDITION ==========
        const themeToggle = document.getElementById("themeToggle");

function canUseLocalStorage() {
    try {
        localStorage.setItem("__test", "1");
        localStorage.removeItem("__test");
        return true;
    } catch {
        return false;
    }
}

const hasStorage = canUseLocalStorage();

let darkMode = false;

if (hasStorage) {
    darkMode = localStorage.getItem("darkMode") === "true";
}

function applyTheme() {
    document.body.classList.toggle("dark", darkMode);
    themeToggle.innerHTML = darkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    themeToggle.title = darkMode
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
}

applyTheme();

themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;

    if (hasStorage) {
        localStorage.setItem("darkMode", darkMode);
    }

    applyTheme();});
