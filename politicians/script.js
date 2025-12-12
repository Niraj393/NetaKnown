// NetaKnown - Custom JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Search Form Submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // In a real app, this would redirect to search results
                alert(`Searching for: ${searchTerm}`);
                console.log(`Search query: ${searchTerm}`);
                // You would typically redirect to: window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar Scroll Effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form Submission Handlers
    const submitButtons = document.querySelectorAll('.btn-submit, .mobile-submit-btn');
    submitButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would open a submission modal or redirect
            console.log('Submission button clicked');
            // Example: window.location.href = '/submit';
        });
    });
    
    // Login Button Handler
    const loginButtons = document.querySelectorAll('.btn-login');
    loginButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would open a login modal or redirect
            console.log('Login button clicked');
            // Example: window.location.href = '/login';
        });
    });
    
    // Feature Cards Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card, .content-card, .politician-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Initialize metrics animation
    animateMetrics();
    
    // Example data for dynamic content
    const sampleData = {
        trendingTopics: [
            "Federalism Implementation",
            "Economic Recovery Plans",
            "Infrastructure Development",
            "Education Reform",
            "Healthcare Access"
        ],
        politicianCount: 247,
        statementCount: 1892,
        userCount: 12500
    };
    
    // Update dynamic counters (example)
    updateCounters(sampleData);
    
    // Newsletter Subscription (example)
    setupNewsletter();
});

// Function to animate metric bars
function animateMetrics() {
    const metricBars = document.querySelectorAll('.metric-fill');
    
    metricBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
}

// Function to update dynamic counters
function updateCounters(data) {
    // This is a placeholder for dynamic data updates
    console.log('Platform Statistics:', data);
    
    // Example: Update counters with animation
    // document.querySelector('.politician-count').textContent = data.politicianCount;
    // document.querySelector('.statement-count').textContent = data.statementCount;
    // document.querySelector('.user-count').textContent = data.userCount;
}

// Function to set up newsletter subscription
function setupNewsletter() {
    const newsletterForm = document.createElement('form');
    newsletterForm.className = 'newsletter-form';
    newsletterForm.innerHTML = `
        <input type="email" placeholder="Enter your email for updates" required>
        <button type="submit">Subscribe</button>
    `;
    
    // You would typically add this to a newsletter section
    // document.querySelector('.newsletter-section').appendChild(newsletterForm);
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real app, send this to your backend
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to NetaKnown updates!');
        this.reset();
    });
}

// Utility function for API calls (example)
async function fetchData(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Example: Load politicians data
async function loadPoliticians() {
    const data = await fetchData('politicians');
    if (data) {
        // Process and display data
        console.log('Politicians loaded:', data);
    }
}

// Export functions for use in browser console if needed
window.NetaKnown = {
    fetchData,
    loadPoliticians,
    animateMetrics
};
// Add this to your existing script.js file
async function loadAllPoliticians() {
    try {
        const response = await fetch('politicians-data.json');
        const data = await response.json();
        return data.politicians;
    } catch (error) {
        console.error('Error loading politicians data:', error);
        return [];
    }
}

// Update search functionality to suggest politicians from JSON
async function initializeSearch() {
    const politicians = await loadAllPoliticians();
    const searchInput = document.getElementById('mainSearchInput');
    const suggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput || !suggestions) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        suggestions.innerHTML = '';
        
        if (query.length < 2) return;
        
        const matches = politicians.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.party.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (matches.length > 0) {
            suggestions.style.display = 'block';
            matches.forEach(politician => {
                const suggestionItem = document.createElement('a');
                suggestionItem.href = `politician-profile.html?name=${politician.id}`;
                suggestionItem.className = 'suggestion-item';
                suggestionItem.innerHTML = `
                    <span class="suggestion-name">${politician.name}</span>
                    <span class="suggestion-party">${politician.party}</span>
                `;
                suggestions.appendChild(suggestionItem);
            });
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);
// Login Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.querySelector('.login-container');
    const loginBtn = document.querySelector('.btn-login');
    const loginForm = document.querySelector('.login-form');
    const loginFormElement = document.getElementById('loginForm');
    const googleLoginBtn = document.querySelector('.google-login-btn');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const signupLink = document.getElementById('signupLink');
    
    // Toggle login form
    if (loginBtn && loginForm) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            loginForm.classList.toggle('show');
            
            // Add close button if on mobile
            addCloseButton();
            
            // Focus on email field when form opens
            if (loginForm.classList.contains('show')) {
                setTimeout(() => {
                    const emailInput = document.getElementById('email');
                    if (emailInput) emailInput.focus();
                }, 300);
            }
        });
        
        // Close login form when clicking outside
        document.addEventListener('click', function(e) {
            if (!loginContainer.contains(e.target) && loginForm.classList.contains('show')) {
                loginForm.classList.remove('show');
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && loginForm.classList.contains('show')) {
                loginForm.classList.remove('show');
            }
        });
    }
    
    // Add close button to login form
    function addCloseButton() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.login-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'login-close';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', function() {
                    loginForm.classList.remove('show');
                });
                loginForm.insertBefore(closeBtn, loginForm.firstChild);
            }
        }
    }
    
    // Handle form submission
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Validate email
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Validate password
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Simulate login process
            simulateLogin(email, rememberMe);
        });
    }
    
    // Google login button
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to Google login...', 'info');
            
            // In real implementation, you would redirect to Google OAuth
            // window.location.href = '/auth/google';
            
            // For demo, simulate Google login
            setTimeout(() => {
                simulateLogin('user@gmail.com', false, 'google');
            }, 1500);
        });
    }
    
    // Forgot password
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }
    
    // Sign up link
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal();
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Simulate login process
    function simulateLogin(email, rememberMe, provider = 'email') {
        const submitBtn = loginFormElement.querySelector('.btn-login-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Logging in...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success response
            showNotification(`Successfully logged in with ${provider === 'google' ? 'Google' : email}!`, 'success');
            
            // Update UI to show logged in state
            updateLoginUI(email, provider);
            
            // Close login form
            loginForm.classList.remove('show');
            
            // Reset form
            loginFormElement.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Store login state if remember me is checked
            if (rememberMe) {
                localStorage.setItem('netaKnownUser', email);
            }
            
        }, 2000);
    }
    
    // Update UI after login
    function updateLoginUI(email, provider) {
        const username = provider === 'google' ? 'User' : email.split('@')[0];
        
        // Update login button to show user
        loginBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>${username}</span>
        `;
        
        // Add dropdown for user menu
        addUserMenu();
    }
    
    // Add user menu dropdown
    function addUserMenu() {
        // Remove existing user menu if any
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) existingMenu.remove();
        
        // Create user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-menu-content">
                <a href="/dashboard">Dashboard</a>
                <a href="/profile">My Profile</a>
                <a href="/settings">Settings</a>
                <hr>
                <a href="javascript:void(0)" class="logout-btn">Logout</a>
            </div>
        `;
        
        loginContainer.appendChild(userMenu);
        
        // Add styles for user menu
        const style = document.createElement('style');
        style.textContent = `
            .user-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                padding: 10px 0;
                min-width: 200px;
                z-index: 1001;
                display: none;
                border: 1px solid #e2e8f0;
                margin-top: 10px;
            }
            
            .user-menu.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            .user-menu-content a {
                display: block;
                padding: 10px 20px;
                color: #4a5568;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .user-menu-content a:hover {
                background: #f7fafc;
                color: #667eea;
            }
            
            .user-menu-content hr {
                border: none;
                border-top: 1px solid #e2e8f0;
                margin: 5px 0;
            }
            
            .logout-btn {
                color: #e53e3e !important;
            }
            
            .logout-btn:hover {
                background: #fed7d7 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Toggle user menu
        loginBtn.addEventListener('click', function toggleUserMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            userMenu.classList.toggle('show');
        });
        
        // Close user menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!loginContainer.contains(e.target)) {
                userMenu.classList.remove('show');
            }
        });
        
        // Handle logout
        const logoutBtn = userMenu.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear stored data
            localStorage.removeItem('netaKnownUser');
            
            // Reset UI
            loginBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                <span>Login</span>
            `;
            
            // Remove user menu
            userMenu.remove();
            
            // Show notification
            showNotification('Successfully logged out!', 'info');
            
            // Remove user menu event listeners
            loginBtn.removeEventListener('click', toggleUserMenu);
        });
    }
    
    // Forgot password modal
    function showForgotPasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'forgot-password-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Reset Password</h3>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <form class="forgot-password-form">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit" class="btn btn-primary">Send Reset Link</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .forgot-password-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                padding: 30px;
                border-radius: 16px;
                max-width: 400px;
                width: 90%;
                z-index: 10001;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #718096;
                padding: 5px;
            }
            
            .modal-close:hover {
                color: #4a5568;
            }
            
            .modal-content h3 {
                font-family: 'Playfair Display', serif;
                font-size: 1.8rem;
                color: #2d3748;
                margin-bottom: 10px;
            }
            
            .modal-content p {
                color: #718096;
                margin-bottom: 25px;
                line-height: 1.5;
            }
            
            .forgot-password-form {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .forgot-password-form input {
                padding: 14px;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => modal.remove());
        overlay.addEventListener('click', () => modal.remove());
        
        // Handle form submission
        const form = modal.querySelector('.forgot-password-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            
            if (validateEmail(emailInput.value)) {
                showNotification('Password reset link sent to your email!', 'success');
                modal.remove();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Sign up modal
    function showSignupModal() {
        const modal = document.createElement('div');
        modal.className = 'signup-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Create Account</h3>
                <p>Join NetaKnown to track politicians and contribute to transparency.</p>
                
                <a href="javascript:void(0)" class="google-login-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Continue with Google</span>
                </a>
                
                <div class="divider">
                    <span>or sign up with email</span>
                </div>
                
                <form class="signup-form">
                    <div class="form-row">
                        <input type="text" placeholder="First Name" required>
                        <input type="text" placeholder="Last Name" required>
                    </div>
                    <input type="email" placeholder="Email Address" required>
                    <input type="password" placeholder="Password" required>
                    <input type="password" placeholder="Confirm Password" required>
                    
                    <label class="checkbox-container">
                        <input type="checkbox" required>
                        <span class="checkmark"></span>
                        I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                    </label>
                    
                    <button type="submit" class="btn btn-primary">Create Account</button>
                    
                    <p class="login-link">Already have an account? <a href="javascript:void(0)" class="login-link-btn">Login</a></p>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => modal.remove());
        overlay.addEventListener('click', () => modal.remove());
        
        // Handle form submission
        const form = modal.querySelector('.signup-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = form.querySelector('input[type="password"]').value;
            const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            showNotification('Account created successfully! Please check your email to verify.', 'success');
            modal.remove();
        });
        
        // Login link
        const loginLink = modal.querySelector('.login-link-btn');
        loginLink.addEventListener('click', () => {
            modal.remove();
            loginForm.classList.add('show');
        });
    }
    
    // Notification system (keep existing if you have it)
    function showNotification(message, type) {
        // Your existing notification code...
        console.log(`${type}: ${message}`);
        alert(message); // For now, use alert. You can implement a better notification system
    }
    
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('netaKnownUser');
    if (savedUser) {
        updateLoginUI(savedUser, 'email');
    }
});