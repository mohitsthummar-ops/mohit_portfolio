document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        const zoom = window.innerWidth >= 1024 ? 0.85 : 1;
        mouseX = e.clientX / zoom;
        mouseY = e.clientY / zoom;
        
        if (cursor) {
            cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        }
    });

    const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        if (follower) {
            const isHovered = follower.classList.contains('is-hovered');
            const scale = isHovered ? 2 : 1;
            follower.style.transform = `translate3d(${followerX - 15}px, ${followerY - 15}px, 0) scale(${scale})`;
        }
        
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor interaction
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .process-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (follower) {
                follower.classList.add('is-hovered');
                follower.style.background = 'rgba(0,0,0,0.02)';
                follower.style.borderColor = 'rgba(0,0,0,0.2)';
            }
            if (cursor) {
                // Ensure dot scales down, but stays centered (4px is half of 8px)
                cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(0.5)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (follower) {
                follower.classList.remove('is-hovered');
                follower.style.background = 'transparent';
                follower.style.borderColor = '#000';
            }
            if (cursor) {
                cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(1)`;
            }
        });
    });

    // Magnetic Elements
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const zoom = window.innerWidth >= 1024 ? 0.85 : 1;
            const rect = item.getBoundingClientRect();
            const x = (e.clientX / zoom) - (rect.left / zoom) - (rect.width / zoom) / 2;
            const y = (e.clientY / zoom) - (rect.top / zoom) - (rect.height / zoom) / 2;
            
            item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Intersection Observer for Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05, 
        rootMargin: '0px 0px -50px 0px' 
    });

    const targets = document.querySelectorAll('.reveal, .hero-content > *, .work-card, .skills-container, .process-card, .service-card, .contact-card-v2, .section-header > *');
    
    targets.forEach(target => {
        if(!target.classList.contains('reveal')) {
            target.classList.add('reveal');
        }
        revealObserver.observe(target);
    });
});

