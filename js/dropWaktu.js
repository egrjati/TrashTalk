document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const calendarOverlay = document.getElementById("calendarOverlay");
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");
  const datesContainer = document.getElementById("dates");
  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");

  let currentDate = new Date();

  function renderCalendar(date) {
    datesContainer.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = date.toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    // Kosong di awal bulan (supaya rapi)
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      const empty = document.createElement("div");
      datesContainer.appendChild(empty);
    }

    for (let i = 1; i <= lastDate; i++) {
      const thisDate = new Date(year, month, i);
      thisDate.setHours(0, 0, 0, 0);

      const dateElem = document.createElement("div");
      dateElem.textContent = i;
      dateElem.classList.add(
        "cursor-pointer",
        "rounded-md",
        "py-1",
        "text-sm",
        "flex",
        "items-center",
        "justify-center",
        "transition",
        "duration-200"
      );

      // Pewarnaan tanggal
      if (thisDate >= oneWeekAgo && thisDate <= today) {
        dateElem.classList.add(
          "bg-black",
          "text-white",
          "font-semibold",
          "hover:bg-gray-800"
        );
      } else {
        dateElem.classList.add("text-gray-300");
      }

      dateElem.addEventListener("click", () => {
        alert("Tanggal dipilih: " + thisDate.toLocaleDateString("id-ID"));
        calendarOverlay.classList.add("hidden");
      });

      datesContainer.appendChild(dateElem);
    }
  }

  dropdownButton.addEventListener("click", () => {
    calendarOverlay.classList.toggle("hidden");
    renderCalendar(currentDate);
  });

  prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Klik di luar area menutup overlay
  calendarOverlay.addEventListener("click", (e) => {
    if (e.target === calendarOverlay) {
      calendarOverlay.classList.add("hidden");
    }
  });
});
