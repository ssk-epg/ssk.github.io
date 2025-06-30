// timetable.js
window.addEventListener('DOMContentLoaded', () => {
  const timetable = document.getElementById('timetable');
  timetable.style.position = 'relative';
  timetable.style.width = '100%';
  timetable.style.height = '660px';
  timetable.style.border = '1px solid #ccc';
  timetable.style.marginTop = '20px';

  // 9:00〜19:00のタイムラインを表示
  for (let i = 0; i <= 10; i++) {
    const hourLine = document.createElement('div');
    hourLine.style.position = 'absolute';
    hourLine.style.top = `${i * 60}px`;
    hourLine.style.width = '100%';
    hourLine.style.borderTop = '1px solid #ddd';
    hourLine.style.fontSize = '12px';
    hourLine.style.paddingLeft = '5px';
    hourLine.textContent = `${9 + i}:00`;
    timetable.appendChild(hourLine);
  }
  // 現在時刻を示す赤い線
  const nowLine = document.createElement('div');
  nowLine.style.position = 'absolute';
  nowLine.style.height = '2px';
  nowLine.style.backgroundColor = 'red';
  nowLine.style.width = '100%';
  nowLine.style.zIndex = '10';
  timetable.appendChild(nowLine);

  function updateNowLine() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const position = ((hour + minute / 60) - 9) * 60; // 6:00開始で1時間60px
    if (position >= 0 && position <= 660) {
      nowLine.style.top = `${position}px`;
      nowLine.style.display = 'block';
    } else {
      nowLine.style.display = 'none';
    }
    renderScheduleBlocks();
  }

  function renderScheduleBlocks() {
    const schedules = JSON.parse(localStorage.getItem(todayKey) || "[]");
    const timetable = document.getElementById("timetable");

    schedules.forEach(schedule => {
        const [startHour, startMin] = schedule.start.split(":").map(Number);
        const [endHour, endMin] = schedule.end.split(":").map(Number);

        // 9:00開始 = 0px として計算
        const startPos = ((startHour + startMin / 60) - 9) * 60;
        const endPos = ((endHour + endMin / 60) - 9) * 60;
        const height = endPos - startPos;

        // 範囲外（表示外）のものはスキップ
        if (startPos < 0 || endPos > 660 || height <= 0) return;

        const block = document.createElement("div");
        block.className = "schedule-block";
        block.style.position = "absolute";
        block.style.top = `${startPos}px`;
        block.style.left = "10px";
        block.style.width = "calc(100% - 40px)";
        block.style.height = `${height}px`;
        block.style.backgroundColor = "#bbdefb";
        block.style.border = "1px solid #90caf9";
        block.style.borderRadius = "4px";
        block.style.boxSizing = "border-box";
        block.style.padding = "4px";
        block.style.fontSize = "12px";
        block.style.overflow = "hidden";
        block.innerHTML = `<strong>${schedule.title}</strong><br><small>${schedule.start} - ${schedule.end}</small>`;

        timetable.appendChild(block);
  });
}

  updateNowLine();
  renderScheduleBlocks();
  setInterval(updateNowLine, 60000); // 1分ごとに更新
});
