const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menu_toggle.addEventListener('click', () => {
    menu_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});


document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");

    // Function to load HTML content dynamically
    function loadContent(section) {
        fetch(`${section}.html`)
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load ${section}.html`);
                return response.text();
            })
            .then((html) => {
                mainContent.innerHTML = html;
                console.log("html");

                // Dynamically load section-specific CSS
                const cssLink = document.getElementById("section-css");
                if (cssLink) cssLink.remove();

                const newCssLink = document.createElement("link");
                newCssLink.id = "section-css";
                newCssLink.rel = "stylesheet";
                newCssLink.href = `${section}.css`;
                document.head.appendChild(newCssLink);
            })
            .catch((err) => {
                console.error(err);
                mainContent.innerHTML = `<p style="color:white">Error loading content. Please try again later.</p>`;
            });
    }

    // Attach click events to menu items
    document.querySelectorAll(".menu li a").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            document.querySelectorAll('.menu li a').forEach((item) => item.classList.remove('active'));
            e.preventDefault();
            const section = this.getAttribute("data-section");
            loadContent(section);
            this.classList.add('active');
        });
    });
});

