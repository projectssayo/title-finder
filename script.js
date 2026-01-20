const final_title_area = document.getElementById("urlDisplay");
const input_url_area = document.getElementById("urlInput");
const given_test_urls = document.getElementsByClassName("example-url");
const button = document.getElementById("find-title-button");

let clicked = false;

for (let i = 0; i < given_test_urls.length; i++) {
    given_test_urls[i].addEventListener("mouseover", () => {
        if (!clicked) input_url_area.value = given_test_urls[i].innerText;
    });

    given_test_urls[i].addEventListener("mouseout", () => {
        if (!clicked) input_url_area.value = "";
    });

    given_test_urls[i].addEventListener("click", () => {
        clicked = true;
        input_url_area.value = given_test_urls[i].innerText;
    });
}

button.addEventListener("click", async () => {
    final_title_area.innerText = "Fetching...";

    const url = input_url_area.value.trim();
    if (!url) {
        final_title_area.innerText = "ENTER A VALID URL";
        return;
    }

    const res = await fetch("/send-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.title) {
        final_title_area.innerText = data.title;
    } else {
        final_title_area.innerText = "kuch toh bkd hai";
    }
});
