const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbkYbB8U2FsNbgI15cYOxXoWc5J7fRFcI3s7_adh3YJT1LT7xTSlH2axOpsFFZXZRYEw/exec";

function goToTask() {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const className = document.getElementById("class").value.trim();
  const number = document.getElementById("taskNumber").value.trim();

  if (!name  || !surname  || !className || !number) {
    alert("Заполните все поля!");
    return;
  }

  localStorage.setItem("studentName", name);
  localStorage.setItem("studentSurname", surname);
  localStorage.setItem("studentClass", className);
  localStorage.setItem("variantNumber", number);

  const validTasks = ["211", "212", "213"];

  if (validTasks.includes(number)) {
    window.location.href = "variant" + number + ".html";
  } else {
    alert("Такого варианта нет");
  }
}


function sendResult(score) {
  const name = localStorage.getItem("studentName") || "";
  const surname = localStorage.getItem("studentSurname") || "";
  const className = localStorage.getItem("studentClass") || "";
  const variant = localStorage.getItem("variantNumber") || "";

  const payload = {
    name: name + " " + surname,
    className: className,
    variant: variant,
    score: score
  };

  console.log("Отправляем:", payload);

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.text())
    .then(data => {
      console.log("Ответ сервера:", data);
    })
    .catch(err => {
      console.error("Ошибка отправки:", err);
      alert("Ошибка отправки результата");
    });
}