// wwwroot/js/AddTag.js

async function addTag(name, displayName) {
    const response = await fetch("/api/tags", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            Name: name,
            DisplayName: displayName
        })
    });

    if (!response.ok) {
        console.error('Ошибка при выполнении запроса:', response.statusText);
    } else {
        alert('Тег успешно добавлен!');
    }
}

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const name = document.getElementById("name").value;
    const displayName = document.getElementById("displayName").value;

    if (name.trim() === "" || displayName.trim() === "") {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    await addTag(name, displayName);

    // Сброс формы после успешного добавления
    document.getElementById("name").value = "";
    document.getElementById("displayName").value = "";
});