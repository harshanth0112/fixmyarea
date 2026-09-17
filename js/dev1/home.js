const navbar =
    document.getElementById("navbar");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const menuIcon =
    document.getElementById("menuIcon");


function setupMobileNavigation() {

    if (!mobileMenuButton || !mobileMenu) {
        return;
    }


    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                !mobileMenu.classList.contains("hidden");


            mobileMenu.classList.toggle("hidden");


            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            // Change hamburger icon to X

            if (!isOpen) {

                menuIcon.innerHTML = `
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6l12 12M6 18L18 6"
                    />
                `;

            } else {

                menuIcon.innerHTML = `
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                `;
            }

        }
    );


    // Close menu after clicking a link

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.add(
                    "hidden"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuIcon.innerHTML = `
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                `;
            }
        );

    });

}

function setupNavbarScroll() {

    if (!navbar) {
        return;
    }


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add(
                "bg-white/80",
                "backdrop-blur-xl",
                "border-slate-200/70",
                "shadow-sm"
            );

        } else {

            navbar.classList.remove(
                "bg-white/80",
                "backdrop-blur-xl",
                "border-slate-200/70",
                "shadow-sm"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();

}

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (!elements.length) {
        return;
    }


    // Initial state

    elements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), " +
            "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)";

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });

}

function readHomeIssues() {

    const storageKey =
        "fixmyarea_issues";


    const storedData =
        localStorage.getItem(
            storageKey
        );


    if (!storedData) {
        return [];
    }


    try {

        const issues =
            JSON.parse(storedData);


        return Array.isArray(issues)
            ? issues
            : [];

    } catch (error) {

        console.error(
            "Unable to read FixMyArea issues:",
            error
        );


        return [];

    }

}

function calculateHomeStatistics() {

    const issues =
        readHomeIssues();


    return {

        total: issues.length,


        resolved:
            issues.filter(
                (issue) =>
                    issue.status === "resolved"
            ).length,


        inProgress:
            issues.filter(
                (issue) =>
                    issue.status === "in-progress"
            ).length,


        highPriority:
            issues.filter(
                (issue) =>
                    issue.priority === "high"
            ).length

    };

}

function animateNumber(
    element,
    target,
    duration = 1300
) {

    if (!element) {
        return;
    }


    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Ease-out cubic

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        element.textContent =
            currentValue.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(update);

}

function updateHomeStatistics() {

    const stats =
        calculateHomeStatistics();


    const totalElement =
        document.getElementById(
            "totalIssues"
        );


    const resolvedElement =
        document.getElementById(
            "resolvedIssues"
        );


    const progressElement =
        document.getElementById(
            "inProgressIssues"
        );


    const highPriorityElement =
        document.getElementById(
            "highPriorityIssues"
        );


    animateNumber(
        totalElement,
        stats.total
    );


    animateNumber(
        resolvedElement,
        stats.resolved
    );


    animateNumber(
        progressElement,
        stats.inProgress
    );


    animateNumber(
        highPriorityElement,
        stats.highPriority
    );

}


function setupStatisticsAnimation() {

    const statisticsTarget =
        document.getElementById(
            "totalIssues"
        );


    if (!statisticsTarget) {
        return;
    }


    let hasAnimated =
        false;


    const observer =
        new IntersectionObserver(
            (entries) => {

                const isVisible =
                    entries[0].isIntersecting;


                if (
                    isVisible &&
                    !hasAnimated
                ) {

                    hasAnimated = true;


                    updateHomeStatistics();


                    observer.disconnect();

                }

            },
            {
                threshold: 0.6
            }
        );


    observer.observe(
        statisticsTarget
    );

}

function setupCardTilt() {

    const cards =
        document.querySelectorAll(
            ".issue-card"
        );


    if (!cards.length) {
        return;
    }


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    4;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -4;


                card.style.transform =
                    `
                    translateY(-8px)
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.01)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0) perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

            }
        );

    });

}

function setupHeroParallax() {

    const heroPanel =
        document.getElementById(
            "heroPanel"
        );


    if (!heroPanel) {
        return;
    }


    // Disable on touch devices

    if (window.matchMedia(
        "(hover: none)"
    ).matches) {
        return;
    }


    heroPanel.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroPanel.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) *
                -3;


            const rotateY =
                ((x / rect.width) - 0.5) *
                3;


            heroPanel.style.transform =
                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-2px)
                `;

        }
    );


    heroPanel.addEventListener(
        "mouseleave",
        () => {

            heroPanel.style.transform =
                "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

        }
    );

}


function setupSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}

function setupStatCardInteractions() {

    const cards =
        document.querySelectorAll(
            "[data-stat-card]"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-5px)";

                card.style.transition =
                    "transform 300ms ease";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    });

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupMobileNavigation();

        setupNavbarScroll();

        setupScrollReveal();

        setupStatisticsAnimation();

        setupCardTilt();

        setupHeroParallax();

        setupSmoothLinks();

        setupStatCardInteractions();

    }
);