document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const calendarOverlay = document.getElementById("calendarOverlay");
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
    oneWeekAgo.setDate(today.getDate() - 6); // 7 hari terakhir

    // Kosong di awal bulan biar grid rapi
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      const empty = document.createElement("div");
      datesContainer.appendChild(empty);
    }

    // Loop setiap tanggal dalam bulan
    for (let i = 1; i <= lastDate; i++) {
      const thisDate = new Date(year, month, i);
      thisDate.setHours(0, 0, 0, 0);

      const dateElem = document.createElement("div");
      dateElem.textContent = i;
      dateElem.classList.add(
        "rounded-md",
        "py-1",
        "text-sm",
        "flex",
        "items-center",
        "justify-center",
        "transition",
        "duration-200"
      );

      // Jika tanggal masih dalam 7 hari terakhir (termasuk hari ini)
      if (thisDate >= oneWeekAgo && thisDate <= today) {
        dateElem.classList.add(
          "bg-black",
          "text-white",
          "font-semibold",
          "cursor-pointer",
          "hover:bg-gray-800"
        );

        // Efek khusus untuk tanggal hari ini
        if (thisDate.getTime() === today.getTime()) {
          dateElem.classList.add(
            "ring-2",
            "ring-green-400",
            "shadow-[0_0_10px_rgba(0,255,150,0.4)]",
            "scale-105"
          );
        }

        // Event klik hanya untuk tanggal dalam 7 hari terakhir
        dateElem.addEventListener("click", () => {
          alert("Tanggal dipilih: " + thisDate.toLocaleDateString("id-ID"));
          calendarOverlay.classList.add("hidden");
        });
      }
      // Jika tanggal sudah lampau lebih dari 7 hari lalu
      else if (thisDate < oneWeekAgo) {
        dateElem.classList.add(
          "bg-transparent",
          "text-gray-300",
          "cursor-not-allowed",
          "opacity-60"
        );
      }
      // Jika tanggal di masa depan (setelah hari ini)
      else {
        dateElem.classList.add(
          "bg-white",
          "text-gray-300",
          "cursor-not-allowed",
          "opacity-60"
        );
      }

      datesContainer.appendChild(dateElem);
    }
  }

  // Tombol dropdown
  dropdownButton.addEventListener("click", () => {
    calendarOverlay.classList.toggle("hidden");
    renderCalendar(currentDate);
  });

  // Navigasi bulan
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
