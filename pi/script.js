document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mainContent = document.querySelector(".main-content");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("shifted");
    });
});