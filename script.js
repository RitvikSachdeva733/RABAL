document.addEventListener("DOMContentLoaded", function () {
    // 1. Loader functionality
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
    }, 2000);

    // 2. Swiper.js initialization for banner slider
    var swiper = new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    // 3. GSAP Animations
    gsap.from(".hero-text h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero-text p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".btn", { opacity: 0, scale: 0.5, duration: 0.5, delay: 1, stagger: 0.2 });

    gsap.from(".service-box", {
        scrollTrigger: ".services",
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.3
    });

    gsap.from("footer", {
        scrollTrigger: "footer",
        opacity: 0,
        y: 30,
        duration: 1
    });

    // 4. Pause Swiper on button click in the slide
    const buttons = document.querySelectorAll(".swiper-slide .btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            swiper.autoplay.stop(); // Stop autoplay when a button is clicked
        });
    });

    // 5. Resume Swiper when clicking anywhere on the page
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".swiper-slide .btn")) {
            swiper.autoplay.start(); // Resume autoplay when clicking elsewhere
        }
    });

    // 6. Auto-scrolling horizontal service cards with 5 scrolls per cycle
    const servicesContainer = document.querySelector(".services-scroll-container");

    if (servicesContainer) {
        let totalScrollWidth = servicesContainer.scrollWidth;
        let scrollStep = totalScrollWidth / 5; // Divide into 5 equal parts
        let scrollCount = 0; // Track number of scrolls
        let scrollInterval;
        let scrollDuration = 10000; // Total duration for one loop in ms (10 seconds)
        let intervalTime = scrollDuration / 5; // Time for each scroll step to complete (2000ms per scroll step)
    
        function autoScroll() {
            servicesContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
            scrollCount++;
    
            // After 5 scrolls, reset and pause for 1 second before restarting
            if (scrollCount >= 5) {
                clearInterval(scrollInterval); // Stop scrolling
    
                setTimeout(() => {
                    servicesContainer.scrollTo({ left: 0, behavior: "smooth" }); // Reset scroll to start
                    scrollCount = 0; // Reset counter
                    startScrolling(); // Restart scrolling after 1 second
                }, 1000); // Wait 1 second before resetting for better user experience
            }
        }
    
        function startScrolling() {
            // Start auto-scrolling with 5 intervals
            scrollInterval = setInterval(autoScroll, intervalTime); // Set interval for smooth scrolling
        }
    
        function stopScrolling() {
            clearInterval(scrollInterval); // Stop scrolling on hover
        }
    
        startScrolling(); // Start auto-scrolling when the page loads
    
        // Pause scrolling on hover
        servicesContainer.addEventListener("mouseenter", stopScrolling);
        servicesContainer.addEventListener("mouseleave", startScrolling);
    }
    



    // 7. Hamburger menu functionality
    const hamburger = document.querySelector(".hamburger-menu");
    const dropdown = document.querySelector(".hamburger-dropdown");

    hamburger.addEventListener("click", function () {
        dropdown.classList.toggle("show");
    });

    window.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

    function animateGrowersCount(element, start, end, duration) {
        let range = end - start;
        let interval = 20; // Update every 20ms for a smooth effect
        let totalSteps = duration / interval;
        let step = Math.ceil(range / totalSteps);
        let current = start;

        let timer = setInterval(function () {
            current += step;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString(); // Format with commas
        }, interval);
    }

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    let growersCountElement1 = document.getElementById('growersCount1');
    let growersCountElement2 = document.getElementById('growersCount2');
    let animationStarted1 = false; // Prevents multiple animations for the first container
    let animationStarted2 = false; // Prevents multiple animations for the second container

    function onScroll() {
        if (!animationStarted1 && isElementInViewport(growersCountElement1)) {
            animationStarted1 = true;
            animateGrowersCount(growersCountElement1, 0, 12500, 3500); // Runs for 3.5 sec
        }

        if (!animationStarted2 && isElementInViewport(growersCountElement2)) {
            animationStarted2 = true;
            animateGrowersCount(growersCountElement2, 0, 12500, 3500); // Runs for 3.5 sec
        }
    }

    window.addEventListener('scroll', onScroll); // Attach scroll event

    // Smooth scrolling navigation for navbar and hamburger links (only for internal sections)
    const links = document.querySelectorAll('.navlink a, .hamburger-dropdown a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only apply smooth scroll if the link is not "home.html"
            if (link.getAttribute('href') !== "home.html" && link.getAttribute('href') !== "products.html") {
                e.preventDefault(); // Prevent default link behavior for internal navigation
                const targetSection = document.querySelector(link.getAttribute('href'));
                if (targetSection) {
                    let offset = window.innerHeight * 0.1; // Adjust this value to control positioning
                    let targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fix: Force navigation to home.html using JavaScript
    const homeLinks = document.querySelectorAll("a[href='home.html']");
    homeLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default behavior
            window.location.assign("home.html"); // Force navigation
        });
    });
});
