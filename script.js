window.addEventListener("load", () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let donetask=JSON.parse(localStorage.getItem("donetask")) || [];
    bookmarks.forEach(element => {
        let isDone=donetask.includes(element);
        document.querySelector(".task").insertAdjacentHTML("beforeend", `<div class="to ${isDone ? "donegreen" : ""}">
                <p>${element}</p>
                <div class="do"><button class="delete">🗑️</button><button class="done">✅</button><button class="edit">📝</button></div>
            </div>
            <div class="sep"></div>`)
    });
})
let a = document.querySelector(".add");
a.addEventListener("click", () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let task = document.querySelector(".tasks").value;
    bookmarks.push(task);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    document.querySelector(".task").insertAdjacentHTML("beforeend", `<div class="to">
                <p>${task}</p>
                <div class="do"><button class="delete">🗑️</button><button class="done">✅</button><button class="edit">📝</button></div>
            </div>
            <div class="sep"></div>`)
    document.querySelector(".tasks").value = "";
})
let input = document.querySelector(".tasks");
input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        a.click();
    }
})
document.querySelector(".task").addEventListener("click", (e) => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (e.target.classList.contains("done")) {
        let taskDiv = e.target.closest(".to");
        let value = taskDiv.querySelector("p").textContent;
        taskDiv.classList.add("donegreen");
        let donetask=JSON.parse(localStorage.getItem("donetask")) || [];
        if(!donetask.includes(value)){
            donetask.push(value);
            localStorage.setItem("donetask",JSON.stringify(donetask))
        }
    }
});
document.querySelector(".task").addEventListener("click", (e) => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let donetask=JSON.parse(localStorage.getItem("donetask")) || [];
    if (e.target.classList.contains("delete")) {
        let taskDiv = e.target.closest(".to");
        let remove = taskDiv.querySelector("p").textContent;
        bookmarks = bookmarks.filter(item => item != remove);
        donetask = donetask.filter(item => item != remove);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        localStorage.setItem("donetask", JSON.stringify(donetask));
        window.location.reload();
    }
});
document.querySelector(".task").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        let taskDiv = e.target.closest(".to");
        let value = taskDiv.querySelector("p").textContent;
        let index = bookmarks.indexOf(value);

        taskDiv.querySelector("p").innerHTML = `
            <input type='text' placeholder=' ' class="edit-task">
            <button class="edone">Done</button>
        `;
        let input = taskDiv.querySelector(".edit-task");
        input.value = value;

        taskDiv.querySelector(".edone").addEventListener("click", () => {
            let evalue = input.value.trim();
            if (evalue === "") return;
            if (index != -1) {
                bookmarks[index] = evalue;
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                taskDiv.querySelector("p").innerHTML = evalue;
            }
        });
        let doneBtn=taskDiv.querySelector(".edone");
        input.addEventListener("keydown",(e)=>{
            if(e.key==="Enter"){
                doneBtn.click();
            }
        })
    }
});
