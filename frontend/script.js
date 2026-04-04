import { animate, inView, stagger, spring, hover } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

// Custom cursor functionality
const cursor = document.getElementById("cursor");
if (cursor) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Simple springy requestAnimationFrame loop for the cursor
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Expand cursor on clicking
    document.addEventListener("mousedown", () => {
        animate(cursor, { 
            scale: 1.5,
            backgroundColor: "rgba(255, 71, 87, 0.2)"
        }, { duration: 0.2 });
    });
    
    document.addEventListener("mouseup", () => {
        animate(cursor, { 
            scale: 1,
            backgroundColor: "transparent"
        }, { duration: 0.2 });
    });
}

// Hero Animation
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

animate(
    title,
    { opacity: [0, 1], y: [40, 0] },
    { duration: 0.8, easing: [0.22, 1, 0.36, 1] }
);

animate(
    subtitle,
    { opacity: [0, 1], y: [30, 0] },
    { duration: 0.8, delay: 0.2, easing: [0.22, 1, 0.36, 1] }
);

// Bento Grid entry animations
const cards = document.querySelectorAll(".bento-card");

inView(".bento-grid", () => {
    animate(
        cards,
        { opacity: [0, 1], y: [60, 0], scale: [0.95, 1] },
        {
            delay: stagger(0.1, { start: 0.3 }),
            duration: 0.8,
            easing: spring({ stiffness: 100, damping: 15, mass: 1 })
        }
    );
});

// Hover interactions for Bento Cards
cards.forEach(card => {
    // Add smooth border and scale transition on hover
    card.addEventListener("mouseenter", () => {
        animate(
            card,
            { 
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            },
            { easing: spring({ stiffness: 300, damping: 20 }) }
        );
        
        // Slightly scale down icon
        const icon = card.querySelector(".icon");
        if(icon) {
            animate(icon, { scale: 1.1, rotate: [0, -5, 5, 0] }, { duration: 0.4 });
        }
    });

    card.addEventListener("mouseleave", () => {
        animate(
            card,
            { 
                scale: 1,
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0px 0px rgba(0,0,0,0)"
            },
            { easing: spring({ stiffness: 200, damping: 20 }) }
        );
        
        const icon = card.querySelector(".icon");
        if(icon) {
            animate(icon, { scale: 1, rotate: 0 }, { duration: 0.3 });
        }
    });
});

// Inner Card specific animations
inView(".stat-fill", (info) => {
    animate(info.target, { width: ["0%", "85%"] }, { duration: 1.5, delay: 0.8, easing: "circOut" });
});

inView(".score-circle", (info) => {
    animate(
        info.target,
        { rotate: [-90, 0], scale: [0.5, 1], opacity: [0, 1] },
        { easing: spring({ stiffness: 60, damping: 10 }), delay: 1 }
    );
});
