const todayKey = new Date().toISOString().slice(0, 10); // 例: "2025-06-30"

function loadSchedules() {
  const list = document.getElementById("scheduleList");
  if (!list) {
    console.warn("scheduleList が DOM に存在しません");
    return;
  }

//   const todayKey = getTodayKey(); // ← 必要に応じて明示
  const data = localStorage.getItem(todayKey);
  const schedules = data ? JSON.parse(data) : [];

  list.innerHTML = "";
  schedules.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <strong>${s.title}</strong>
      <span class="time">${s.start} - ${s.end}</span>
      <button onclick="doneSchedule(${i})" id="addedbutton">完了</button>
      <button onclick="deleteSchedule(${i})" id="addedbutton">削除</button>
      <br>${s.detail}
    `;

    list.appendChild(div);
  });
}


function addSchedule() {
    const title = document.getElementById("title").value;
    const detail = document.getElementById("detail").value;
    const start = document.getElementById("Stime").value;
    const end = document.getElementById("Etime").value;
    if (!title) return alert("タイトルは必須です");
    const data = localStorage.getItem(todayKey);
    const schedules = data ? JSON.parse(data) : [];
    schedules.push({ title, detail , start, end });
    localStorage.setItem(todayKey, JSON.stringify(schedules));
    document.getElementById("title").value = "";
    document.getElementById("detail").value = "";
    loadSchedules();
}

function deleteSchedule(index) {
    const data = localStorage.getItem(todayKey);
    if (!data) return;
    const schedules = JSON.parse(data);
    if (index < 0 || index >= schedules.length) return;
    schedules.splice(index, 1);
    localStorage.setItem(todayKey, JSON.stringify(schedules));
    loadSchedules();
}

function doneSchedule(index) {
    const data = localStorage.getItem(todayKey);
    if (!data) return;
    const schedules = JSON.parse(data);
    if (index < 0 || index >= schedules.length) return;
    schedules[index].title = "<s id=\"done\">" + schedules[index].title + "</s>";
    schedules[index].detail = "";
    localStorage.setItem(todayKey, JSON.stringify(schedules));
    loadSchedules();
}

document.addEventListener('DOMContentLoaded', () => {
  loadSchedules();
});
