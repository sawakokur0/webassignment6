document.addEventListener('DOMContentLoaded', () => {
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const feedback = input.nextElementSibling; 
        input.classList.add('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
            feedback.style.display = 'block'; // Make it visible
        }
    }
    function clearError(input) {
        const feedback = input.nextElementSibling;
        input.classList.remove('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = '';
            feedback.style.display = 'none'; // Hide it
        }
    }


    // =========================================================================
    // Dynamic Style Changes
    // =========================================================================
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'night') {
            document.body.classList.add('night-mode');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('night-mode');
            
            let theme = 'day';
            if (document.body.classList.contains('night-mode')) {
                theme = 'night';
                themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // =========================================================================
    // Keyboard Event Handling
    // =========================================================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && index < navLinks.length - 1) {
                    e.preventDefault();
                    navLinks[index + 1].focus(); // Focus next link
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    navLinks[index - 1].focus(); // Focus previous link
                }
            });
        });
    }

    // =========================================================================
    // Manipulating Attributes
    // =========================================================================
    const readMoreBtn = document.getElementById('read-more-btn');
    const readMoreContent = document.getElementById('read-more-content');
    if (readMoreBtn && readMoreContent) {
        readMoreBtn.addEventListener('click', () => {
            const isHidden = readMoreContent.style.display === 'none';
            readMoreContent.style.display = isHidden ? 'block' : 'none';
            readMoreBtn.textContent = isHidden ? 'Hide' : 'Read More...';
        });
    }

    // =========================================================================
    // Objects, Arrays, Loops, Higher-Order Functions
    // =========================================================================
    const trainersGrid = document.getElementById('trainers-grid');
    if (trainersGrid) {
        // 3a: Array of Objects
        const trainers = [
            { name: 'Anna', specialty: 'Yoga Instructor', bio: 'Certified yoga teacher with 8 years of experience...', img: 'images/5413438310036140376.jpg', alt: 'Trainer Anna' },
            { name: 'Alina', specialty: 'Fitness Coach', bio: 'Specialist in functional training and HIIT...', img: 'images/5413438310036140384.jpg', alt: 'Trainer Alina' },
            { name: 'Sarah', specialty: 'Pilates Instructor', bio: 'Certified Pilates instructor with a focus on posture...', img: 'images/5413438310036140377.jpg', alt: 'Trainer Sarah' },
            { name: 'Maria', specialty: 'Strength Coach', bio: 'Strength and conditioning specialist...', img: 'images/5413438310036140381.jpg', alt: 'Trainer Maria' }
        ];

        let trainersHTML = '';
        // 3b/3c: Loop (forEach - Higher-Order Function)
        trainers.forEach(trainer => {
            trainersHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="card trainer-card text-center h-100">
                    <img src="${trainer.img}" class="card-img-top" alt="${trainer.alt}">
                    <div class="card-body">
                        <h3 class="card-title">${trainer.name}</h3>
                        <p class="trainer-specialty">${trainer.specialty}</p>
                        <p class="card-text">${trainer.bio}</p>
                        <div class="social-links mt-3">
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        // 1a: DOM Manipulation (innerHTML)
        trainersGrid.innerHTML = trainersHTML;
    }

    // =========================================================================
    // Switch Statements
    // =========================================================================
    const filterButtons = document.querySelectorAll('#filter-buttons .btn-check');
    const scheduleRows = document.querySelectorAll('#schedule-body tr');
    
    if (filterButtons.length > 0 && scheduleRows.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('change', function() {
                const filter = this.dataset.filter;
                
                scheduleRows.forEach(row => {
                    const category = row.dataset.category;
                    switch (filter) {
                        case 'all':
                            row.style.display = '';
                            break;
                        case category:
                            row.style.display = ''; 
                            break;
                        default:
                            row.style.display = 'none'; 
                    }
                });
            });
        });
    }

    // =========================================================================
    // Responding to Events with Callbacks
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop form submission
            let isValid = true;

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your full name.');
            } else {
                clearError(nameInput);
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email address.');
            } else {
                clearError(emailInput);
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message.');
            } else {
                clearError(messageInput);
            }

            if (isValid) {
                // --- Animation & DOM Update ---
                //
                const successMessageDiv = document.getElementById('form-success-message');
                if (successMessageDiv) {
                    successMessageDiv.textContent = 'Message sent successfully!';
                    successMessageDiv.classList.add('fade-in');
                    
                    setTimeout(() => {
                        successMessageDiv.textContent = '';
                        successMessageDiv.classList.remove('fade-in');
                    }, 5000);
                }
                
                contactForm.reset();
            }
        });

        const soundButton = document.getElementById('book-class-sound');
    
    if (soundButton) {
        const clickSound = new Audio(click.wav); //
        clickSound.load(); 

        soundButton.addEventListener('click', (e) => {
            e.preventDefault();
            clickSound.currentTime = 0; 
            
            const playPromise = clickSound.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Audio started!");
                })
                .catch(error => {
                    console.error("Couldn't play audio:", error);
                });
            }
        });
    }
    }
    
    // =========================================================================
    // Play Sounds
    // =========================================================================
    const soundButton = document.getElementById('book-class-sound');
    if (soundButton) {
        const clickSound = new Audio('sounds/click.wav');
        
        soundButton.addEventListener('click', (e) => {
            clickSound.play()
                .catch(error => console.warn("Audio file not found or user hasn't interacted."));
        });
    }

    // =========================================================================
    // Event Listeners
    // =========================================================================
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscriptionModalEl = document.getElementById('subscriptionModal');
    if (subscribeBtn && subscriptionModalEl) {
        const subscriptionModal = new bootstrap.Modal(subscriptionModalEl);

        subscribeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            subscriptionModal.show();
        });

        const subscriptionForm = document.getElementById('subscriptionForm');
        if (subscriptionForm) {
            subscriptionForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const emailInput = document.getElementById('subEmail');
                const email = emailInput.value;
                
                if (isValidEmail(email)) {
                    alert(`Thank you for subscribing with ${email}!`);
                    subscriptionModal.hide();
                    subscriptionForm.reset();
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    }

    // =========================================================================
    // Dynamic Style Changes
    // =========================================================================
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    if (colorChangeBtn) {
        const colors = ['#DAD7CD', '#A3B18A', '#f8f9fa', '#588157', '#3A5A40'];
        let currentColorIndex = 0;

        colorChangeBtn.addEventListener('click', () => {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[currentColorIndex];
        });
    }

    // =========================================================================
    // Modify content dynamically
    // =========================================================================
    const dateTimeDisplay = document.getElementById('datetime-display');
    if (dateTimeDisplay) {
        function updateDateTime() {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            dateTimeDisplay.textContent = now.toLocaleDateString('en-US', options);
        }
        
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

});