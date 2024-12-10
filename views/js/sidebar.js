const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menu_toggle.addEventListener('click', () => {
    menu_toggle.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
});

document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");

    function loadContent(section) {
        fetch(`../html/${section}.html`)
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load ${section}.html`);
                return response.text();
            })
            .then((html) => {
                mainContent.innerHTML = html;
                const cssLink = document.getElementById("section-css");
                if (cssLink) cssLink.remove();

                const newCssLink = document.createElement("link");
                newCssLink.id = "section-css";
                newCssLink.rel = "stylesheet";
                newCssLink.href = `../css/${section}.css`;
                document.head.appendChild(newCssLink);

                const jsLink = document.getElementById("section-js");
                if (jsLink) jsLink.remove();

                const newJSLink = document.createElement("script");
                newJSLink.id = "section-js";
                newJSLink.src = `../js/${section}.js`;
                newJSLink.type = "text/javascript";
                document.head.appendChild(newJSLink);

                document.getElementById("title").innerHTML = section;

                document.getElementById("top-header").innerHTML = (() => {
                    if (section === "village-mgt")
                        return "Village Management";
                    else
                        return section.charAt(0).toUpperCase() + section.slice(1);
                })();
            })
            .catch((err) => {
                console.error(err);
                mainContent.innerHTML = `<p style="color:white">Error loading content. Please try again later.</p>`;
            });
    }

    document.querySelectorAll(".menu li a").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            document.querySelectorAll('.menu li a').forEach((item) => item.classList.remove('active'));
            e.preventDefault();
            const section = this.getAttribute("data-section");
            loadContent(section);
            this.classList.add('active');
        });
    });

  
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

    if (username && role === "user") {
        const defaultSection = "overview";
        const defaultLink = document.querySelector(`.menu li a[data-section="${defaultSection}"]`);
        
        if (defaultLink) {
            defaultLink.classList.add('active');
        }

        loadContent(defaultSection);
    } else if (username && role === "admin") {
        const defaultSection = "village-mgt"; 
        const defaultLink = document.querySelector(`.menu li a[data-section="${defaultSection}"]`);
        
        if (defaultLink) {
            defaultLink.classList.add('active');
        }

        loadContent(defaultSection);
    } else {
        window.location.href = "../html/sign-in.html";
    }
});
