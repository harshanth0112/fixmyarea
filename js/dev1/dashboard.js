const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

const menuIcon =
    document.getElementById(
        "menuIcon"
    );


function setupMobileNavigation() {

    if (
        !mobileMenuButton ||
        !mobileMenu
    ) {
        return;
    }


    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                !mobileMenu.classList.contains(
                    "hidden"
                );


            mobileMenu.classList.toggle(
                "hidden"
            );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


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


    const links =
        mobileMenu.querySelectorAll(
            "a"
        );


    links.forEach((link) => {

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

function getDashboardIssues() {

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
            "Error reading FixMyArea issues:",
            error
        );


        return [];

    }

}

function calculateDashboardStatistics(
    issues
) {

    return {

        total:
            issues.length,


        reported:
            issues.filter(
                (issue) =>
                    issue.status === "reported"
            ).length,


        review:
            issues.filter(
                (issue) =>
                    issue.status === "under-review"
            ).length,


        progress:
            issues.filter(
                (issue) =>
                    issue.status === "in-progress"
            ).length,


        resolved:
            issues.filter(
                (issue) =>
                    issue.status === "resolved"
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
    duration = 1200
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


    requestAnimationFrame(
        update
    );

}

function updateDashboardCards(
    stats
) {

    animateNumber(
        document.getElementById(
            "dashboardTotal"
        ),
        stats.total
    );


    animateNumber(
        document.getElementById(
            "dashboardReported"
        ),
        stats.reported
    );


    animateNumber(
        document.getElementById(
            "dashboardReview"
        ),
        stats.review
    );


    animateNumber(
        document.getElementById(
            "dashboardProgress"
        ),
        stats.progress
    );


    animateNumber(
        document.getElementById(
            "dashboardResolved"
        ),
        stats.resolved
    );


    animateNumber(
        document.getElementById(
            "dashboardHighPriority"
        ),
        stats.highPriority
    );

}

function getPercentage(
    value,
    total
) {

    if (!total) {
        return 0;
    }


    return Math.round(
        (value / total) * 100
    );

}

function updateStatusBars(
    stats
) {

    const reportedPercentage =
        getPercentage(
            stats.reported,
            stats.total
        );


    const reviewPercentage =
        getPercentage(
            stats.review,
            stats.total
        );


    const progressPercentage =
        getPercentage(
            stats.progress,
            stats.total
        );


    const resolvedPercentage =
        getPercentage(
            stats.resolved,
            stats.total
        );


    setBar(
        "reportedBar",
        reportedPercentage
    );


    setBar(
        "reviewBar",
        reviewPercentage
    );


    setBar(
        "progressBar",
        progressPercentage
    );


    setBar(
        "resolvedBar",
        resolvedPercentage
    );


    setText(
        "reportedPercentage",
        `${reportedPercentage}%`
    );


    setText(
        "reviewPercentage",
        `${reviewPercentage}%`
    );


    setText(
        "progressPercentage",
        `${progressPercentage}%`
    );


    setText(
        "resolvedPercentage",
        `${resolvedPercentage}%`
    );

}

function setBar(
    id,
    percentage
) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    // Start at zero.

    element.style.width = "0%";


    // Animate to target width.

    requestAnimationFrame(
        () => {

            setTimeout(
                () => {

                    element.style.width =
                        `${percentage}%`;

                },
                120
            );

        }
    );

}

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    element.textContent =
        value;

}

function updateResolutionRate(
    stats
) {

    const rate =
        getPercentage(
            stats.resolved,
            stats.total
        );


    const rateElement =
        document.getElementById(
            "resolutionRate"
        );


    const barElement =
        document.getElementById(
            "resolutionBar"
        );


    if (rateElement) {

        animatePercentage(
            rateElement,
            rate
        );

    }


    if (barElement) {

        barElement.style.width =
            "0%";


        setTimeout(
            () => {

                barElement.style.width =
                    `${rate}%`;

            },
            200
        );

    }

}

function animatePercentage(
    element,
    target,
    duration = 1200
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


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        element.textContent =
            `${value}%`;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                `${target}%`;

        }

    }


    requestAnimationFrame(
        update
    );

}

function formatIssueDate(
    dateValue
) {

    if (!dateValue) {
        return "Unknown date";
    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(
        date.getTime()
    )) {
        return "Unknown date";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}

function getStatusStyle(
    status
) {

    const styles = {

        reported: {
            label: "Reported",
            classes:
                "bg-amber-50 text-amber-700"
        },

        "under-review": {
            label: "Under Review",
            classes:
                "bg-indigo-50 text-indigo-700"
        },

        "in-progress": {
            label: "In Progress",
            classes:
                "bg-purple-50 text-purple-700"
        },

        resolved: {
            label: "Resolved",
            classes:
                "bg-emerald-50 text-emerald-700"
        },

        rejected: {
            label: "Rejected",
            classes:
                "bg-rose-50 text-rose-700"
        }

    };


    return (
        styles[status] ||
        {
            label: "Unknown",
            classes:
                "bg-slate-100 text-slate-600"
        }
    );

}

function getPriorityStyle(
    priority
) {

    const styles = {

        low: {
            label: "Low",
            classes:
                "bg-emerald-50 text-emerald-700"
        },

        medium: {
            label: "Medium",
            classes:
                "bg-amber-50 text-amber-700"
        },

        high: {
            label: "High",
            classes:
                "bg-rose-50 text-rose-700"
        }

    };


    return (
        styles[priority] ||
        {
            label: "Normal",
            classes:
                "bg-slate-100 text-slate-600"
        }
    );

}

function createRecentIssueCard(
    issue
) {

    const status =
        getStatusStyle(
            issue.status
        );


    const priority =
        getPriorityStyle(
            issue.priority
        );


    const title =
        issue.title ||
        "Untitled issue";


    const category =
        issue.category ||
        "Other";


    const area =
        issue.area ||
        "Unknown area";


    const issueId =
        issue.id ||
        "Unknown ID";


    const createdDate =
        formatIssueDate(
            issue.createdAt
        );


    const upvotes =
        Number.isFinite(
            Number(issue.upvotes)
        )
            ? Number(issue.upvotes)
            : 0;


    const card =
        document.createElement(
            "article"
        );


    card.className =
        `
        recent-issue-card
        group
        rounded-[2rem]
        border
        border-slate-100
        bg-white
        p-6
        shadow-card
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-soft
        `;


    card.innerHTML = `

        <div class="flex items-start justify-between gap-4">

            <div
                class="flex h-11 w-11
                       items-center justify-center
                       rounded-2xl
                       bg-brand-50
                       text-sm font-bold
                       text-brand-700"
            >
                #
            </div>

            <span
                class="rounded-full
                       px-3 py-1
                       text-xs font-semibold
                       ${status.classes}"
            >
                ${status.label}
            </span>

        </div>


        <div class="mt-6">

            <div
                class="flex flex-wrap
                       items-center gap-2"
            >

                <span
                    class="text-xs font-semibold
                           uppercase tracking-wider
                           text-slate-400"
                >
                    ${issueId}
                </span>

                <span
                    class="text-slate-300"
                >
                    •
                </span>

                <span
                    class="text-xs font-medium
                           capitalize
                           text-slate-400"
                >
                    ${category}
                </span>

            </div>


            <h3
                class="mt-3 text-xl font-bold
                       tracking-tight
                       transition-colors
                       duration-300
                       group-hover:text-brand-700"
            >
                ${escapeHtml(title)}
            </h3>


            <p
                class="mt-3 line-clamp-2
                       text-sm leading-6
                       text-slate-500"
            >
                ${escapeHtml(
                    issue.description ||
                    "No description available."
                )}
            </p>

        </div>


        <div
            class="mt-6 flex flex-wrap
                   items-center
                   justify-between gap-3
                   border-t border-slate-100
                   pt-5"
        >

            <div
                class="text-sm text-slate-400"
            >
                ${escapeHtml(area)}
            </div>


            <div
                class="flex items-center gap-3"
            >

                <span
                    class="rounded-full
                           px-3 py-1
                           text-xs font-semibold
                           ${priority.classes}"
                >
                    ${priority.label}
                </span>


                <span
                    class="text-xs
                           font-medium
                           text-slate-400"
                >
                    ${upvotes} upvotes
                </span>

            </div>

        </div>


        <div
            class="mt-5 flex items-center
                   justify-between"
        >

            <span
                class="text-xs
                       text-slate-400"
            >
                ${createdDate}
            </span>


            <a
                href="../dev2/issue-details.html?id=${encodeURIComponent(issueId)}"
                class="text-sm font-semibold
                       text-brand-600
                       transition-colors
                       hover:text-brand-700"
            >
                View issue →
            </a>

        </div>
    `;


    return card;

}

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}

function displayRecentIssues(
    issues
) {

    const container =
        document.getElementById(
            "recentIssues"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (!issues.length) {

        container.innerHTML = `

            <div
                class="col-span-full
                       rounded-[2rem]
                       border border-dashed
                       border-slate-200
                       bg-white/60
                       p-12 text-center"
            >

                <div
                    class="mx-auto flex h-14 w-14
                           items-center
                           justify-center
                           rounded-2xl
                           bg-brand-50
                           text-xl text-brand-700"
                >
                    +
                </div>


                <h3
                    class="mt-5 text-xl
                           font-bold"
                >
                    No issues reported yet
                </h3>


                <p
                    class="mx-auto mt-2
                           max-w-md
                           text-sm leading-6
                           text-slate-500"
                >
                    Once the community starts
                    reporting issues, they will
                    appear here.
                </p>


                <a
                    href="../dev2/report.html"
                    class="mt-6
                           inline-flex
                           rounded-full
                           bg-brand-600
                           px-5 py-2.5
                           text-sm font-semibold
                           text-white
                           transition
                           hover:bg-brand-700"
                >
                    Report an Issue
                </a>

            </div>

        `;

        return;
    }


    const sortedIssues =
        [...issues]
            .sort(
                (a, b) => {

                    const first =
                        new Date(
                            a.createdAt || 0
                        ).getTime();


                    const second =
                        new Date(
                            b.createdAt || 0
                        ).getTime();


                    return second - first;

                }
            )
            .slice(0, 6);


    sortedIssues.forEach(
        (issue) => {

            const card =
                createRecentIssueCard(
                    issue
                );


            container.appendChild(
                card
            );

        }
    );

}

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(
        (element) => {

            element.style.opacity =
                "0";


            element.style.transform =
                "translateY(30px)";


            element.style.transition =
                "opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), " +
                "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)";

        }
    );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}

function setupStatCardInteractions() {

    const cards =
        document.querySelectorAll(
            ".stat-card"
        );


    cards.forEach(
        (card) => {

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
                        (
                            (x / rect.width)
                            - 0.5
                        ) * 2.5;


                    const rotateX =
                        (
                            (y / rect.height)
                            - 0.5
                        ) * -2.5;


                    card.style.transform =
                        `
                        translateY(-5px)
                        perspective(800px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "translateY(0)";

                }
            );

        }
    );

}

function initializeDashboard() {

    const issues =
        getDashboardIssues();


    const stats =
        calculateDashboardStatistics(
            issues
        );


    updateDashboardCards(
        stats
    );


    updateStatusBars(
        stats
    );


    updateResolutionRate(
        stats
    );


    displayRecentIssues(
        issues
    );

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupMobileNavigation();

        setupScrollReveal();

        setupStatCardInteractions();

        initializeDashboard();

    }
);