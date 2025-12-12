// Politician Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all profile page functionality
    
    // Mobile Menu Toggle (shared from main script)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Share Button Functionality
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.getElementById('closeModal');
    
    if (shareBtn && shareModal) {
        shareBtn.addEventListener('click', function() {
            shareModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        shareModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    
    // Copy Link Functionality
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const linkInput = document.querySelector('.copy-link input');
            linkInput.select();
            linkInput.setSelectionRange(0, 99999); // For mobile
            
            try {
                navigator.clipboard.writeText(linkInput.value).then(() => {
                    // Show success message
                    const originalText = copyLinkBtn.textContent;
                    copyLinkBtn.textContent = 'Copied!';
                    copyLinkBtn.style.backgroundColor = '#38a169';
                    
                    setTimeout(() => {
                        copyLinkBtn.textContent = originalText;
                        copyLinkBtn.style.backgroundColor = '';
                    }, 2000);
                });
            } catch (err) {
                // Fallback for older browsers
                document.execCommand('copy');
                const originalText = copyLinkBtn.textContent;
                copyLinkBtn.textContent = 'Copied!';
                copyLinkBtn.style.backgroundColor = '#38a169';
                
                setTimeout(() => {
                    copyLinkBtn.textContent = originalText;
                    copyLinkBtn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }
    
    // Follow Button Toggle
    const followBtn = document.getElementById('followBtn');
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            const isFollowing = this.classList.contains('following');
            
            if (isFollowing) {
                this.classList.remove('following');
                this.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                    <span>Follow Updates</span>
                `;
                showNotification('You unfollowed Balen Shah', 'info');
            } else {
                this.classList.add('following');
                this.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                    <span>Following ✓</span>
                `;
                showNotification('You are now following Balen Shah', 'success');
            }
        });
    }
    
    // Statement Filtering
    const statementFilter = document.getElementById('statementFilter');
    const statementSort = document.getElementById('statementSort');
    
    if (statementFilter) {
        statementFilter.addEventListener('change', function() {
            filterStatements(this.value);
        });
    }
    
    if (statementSort) {
        statementSort.addEventListener('change', function() {
            sortStatements(this.value);
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Social Sharing
    const shareOptions = document.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Balen Shah - Political Profile | NetaKnown');
            let shareUrl;
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Statement Actions (Like, Comment, Share)
    setupStatementActions();
    
    // Footer Actions
    setupFooterActions();
    
    // Initialize Charts/Visualizations
    initializeVisualizations();
    
    // Load additional data
    loadAdditionalData();
});

// Function to filter statements
function filterStatements(filter) {
    const statements = document.querySelectorAll('.statement-card');
    
    statements.forEach(statement => {
        if (filter === 'all') {
            statement.style.display = 'block';
        } else {
            const hasClass = statement.classList.contains(filter);
            statement.style.display = hasClass ? 'block' : 'none';
        }
    });
}

// Function to sort statements
function sortStatements(sortBy) {
    const statementsContainer = document.querySelector('.statements-list');
    const statements = Array.from(document.querySelectorAll('.statement-card'));
    
    statements.sort((a, b) => {
        switch(sortBy) {
            case 'recent':
                return sortByDate(a, b);
            case 'popular':
                return sortByPopularity(a, b);
            case 'truth':
                return sortByTruth(a, b);
            default:
                return 0;
        }
    });
    
    // Reorder statements in DOM
    statements.forEach(statement => {
        statementsContainer.appendChild(statement);
    });
}

function sortByDate(a, b) {
    const dateA = new Date(a.querySelector('.statement-date').textContent);
    const dateB = new Date(b.querySelector('.statement-date').textContent);
    return dateB - dateA;
}

function sortByPopularity(a, b) {
    const commentsA = parseInt(a.querySelector('.btn-comment span').textContent);
    const commentsB = parseInt(b.querySelector('.btn-comment span').textContent);
    return commentsB - commentsA;
}

function sortByTruth(a, b) {
    const truthMap = {
        'true': 3,
        'misleading': 2,
        'false': 1,
        'unverified': 0
    };
    
    const truthA = Array.from(a.classList).find(cls => 
        ['true', 'false', 'misleading', 'unverified'].includes(cls)
    ) || 'unverified';
    
    const truthB = Array.from(b.classList).find(cls => 
        ['true', 'false', 'misleading', 'unverified'].includes(cls)
    ) || 'unverified';
    
    return truthMap[truthB] - truthMap[truthA];
}

// Function to setup statement actions
function setupStatementActions() {
    // Like buttons
    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const span = this.querySelector('span');
            let count = parseInt(span.textContent);
            
            if (this.classList.contains('liked')) {
                count--;
                this.classList.remove('liked');
                this.style.color = '';
            } else {
                count++;
                this.classList.add('liked');
                this.style.color = '#e53e3e';
            }
            
            span.textContent = count;
        });
    });
    
    // Comment buttons
    document.querySelectorAll('.btn-comment').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real app, this would open a comments modal/section
            showNotification('Comments feature coming soon!', 'info');
        });
    });
    
    // Share buttons
    document.querySelectorAll('.statement-card .btn-share').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const statementCard = this.closest('.statement-card');
            const statementText = statementCard.querySelector('.statement-content').textContent;
            
            // Copy statement to clipboard
            navigator.clipboard.writeText(statementText).then(() => {
                showNotification('Statement copied to clipboard!', 'success');
            });
        });
    });
}

// Function to setup footer actions
function setupFooterActions() {
    const reportErrorBtn = document.getElementById('reportError');
    const suggestEditBtn = document.getElementById('suggestEdit');
    const downloadDataBtn = document.getElementById('downloadData');
    const copyLinkBtn = document.getElementById('copyLink');
    
    if (reportErrorBtn) {
        reportErrorBtn.addEventListener('click', function() {
            // In a real app, this would open a report form
            showNotification('Report form opening...', 'info');
            setTimeout(() => {
                const modal = createModal('Report Error', 'report-error-form');
                document.body.appendChild(modal);
            }, 500);
        });
    }
    
    if (suggestEditBtn) {
        suggestEditBtn.addEventListener('click', function() {
            showNotification('Edit suggestion form opening...', 'info');
        });
    }
    
    if (downloadDataBtn) {
        downloadDataBtn.addEventListener('click', function() {
            downloadProfileData();
        });
    }
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Profile link copied to clipboard!', 'success');
            });
        });
    }
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        }
        .notification-info { background: var(--accent-color); }
        .notification-success { background: var(--success-color); }
        .notification-error { background: var(--danger-color); }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Function to create modal
function createModal(title, contentId) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div id="${contentId}">
                    <p>This feature is under development.</p>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    return modal;
}

// Function to download profile data
function downloadProfileData() {
    const profileData = {
        politician: "Balendra Shah (Balen)",
        position: "Mayor of Kathmandu Metropolitan City",
        party: "Independent",
        metrics: {
            truthScore: 65,
            promiseFulfillment: 58,
            publicTrust: 72,
            engagementScore: 84
        },
        statements: 92,
        promises: 33,
        lastUpdated: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'balen-shah-profile-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Profile data downloaded!', 'success');
}

// Function to initialize visualizations
function initializeVisualizations() {
    // Initialize any charts or visualizations here
    // This is a placeholder for actual chart library integration
    
    console.log('Initializing profile visualizations...');
    
    // Example: Create a simple trend chart (would be replaced with actual chart library)
    createTrendChart();
}

function createTrendChart() {
    // This would create a chart using Chart.js, D3.js, or similar
    // For now, we'll just log that it would be created
    console.log('Trend chart would be created here');
}

// Function to load additional data
function loadAdditionalData() {
    // This would fetch additional data from an API
    // For now, we'll simulate loading
    setTimeout(() => {
        console.log('Additional profile data loaded');
        
        // Simulate updating some metrics
        const metrics = document.querySelectorAll('.metric-value');
        if (metrics.length > 0) {
            // Just an example of dynamic update
            console.log('Metrics would be updated with fresh data');
        }
    }, 1000);
}

// Export for global access if needed
window.ProfilePage = {
    filterStatements,
    sortStatements,
    showNotification,
    downloadProfileData
};