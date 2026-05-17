$(document).ready(function() {
    // Custom Cursor Logic
    const cursor = $('.cursor');
    const follower = $('.cursor-follower');

    $(document).on('mousemove', function(e) {
        // Adjust for body zoom level to keep cursor aligned (zoom is 1 on mobile)
        const zoom = window.innerWidth > 768 ? 0.61 : 1;
        const x = e.clientX / zoom;
        const y = e.clientY / zoom;
        
        cursor.css({
            left: x,
            top: y
        });
        
        // Removed setTimeout to fix lagging behavior
        follower.css({
            left: x - 11,
            top: y - 11
        });
    });

    // Cursor interaction
    $('a, button, .work-card, .process-card, .service-card').on('mouseenter', function() {
        follower.css({
            'transform': 'scale(2)',
            'background': 'rgba(0,0,0,0.02)',
            'border-color': 'rgba(0,0,0,0.2)'
        });
        cursor.css('transform', 'scale(0.5)');
    }).on('mouseleave', function() {
        follower.css({
            'transform': 'scale(1)',
            'background': 'transparent',
            'border-color': '#000'
        });
        cursor.css('transform', 'scale(1)');
    });

    // Magnetic Elements
    $('.magnetic').on('mousemove', function(e) {
        const item = $(this);
        const rect = item[0].getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        item.css('transform', `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`);
    }).on('mouseleave', function() {
        $(this).css('transform', 'translate(0, 0) scale(1)');
    });

    // Intersection Observer for Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('revealed');
                // Once revealed, no need to observe anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05, // Lower threshold for earlier reveal
        rootMargin: '0px 0px -50px 0px' // Reveal slightly before it enters fully
    });

    // Apply reveal classes and start observing
    // Target any element with the 'reveal' class explicitly
    const targets = $('.reveal, .hero-content > *, .work-card, .skills-container, .process-card, .service-card, .contact-card-v2, .section-header > *');
    
    targets.addClass('reveal');
    targets.each(function() {
        revealObserver.observe(this);
    });

    // Smooth scroll for internal links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000, 'swing');
        }
    });

    // Pulse animation for the status dot is handled by CSS
});
