// Politicians Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize politicians page
    initializePoliticiansPage();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

function initializePoliticiansPage() {
    // Load politicians data
    const politicians = getPoliticiansData();
    
    // Initialize views
    initializeViewToggle();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize search
    initializeSearch();
    
    // Initialize sorting
    initializeSorting();
    
    // Initialize pagination
    initializePagination();
    
    // Load initial data
    displayPoliticians(politicians);
    
    // Initialize category links
    initializeCategoryLinks();
}

// Politicians Data
function getPoliticiansData() {
    return [
        // Featured Politicians (same as homepage)
         {
            id: 'shushila-karki',
            name: 'Shushila Karki',
            position: 'Interim Prime Minister of Nepal',
            party: 'Independent',
            image: 'https://tse2.mm.bing.net/th/id/OIP.HJghaifeoaJriVXlkBxsVgHaEK?cb=ucfimg2&ucfimg=1&w=1280&h=720&rs=1&pid=ImgDetMain&o=7&rm=3',
            truthScore: 70,
            promiseScore: 40,
            statements: 43,
            category: ['prime-ministers', 'major'],
            tags: ['first women PM', 'independent'],
            profileLink: 'politician-profile.html?name=shushila-karki'
        },
        {
            id: 'pushpa-kamal-dahal',
            name: 'Pushpa Kamal Dahal (Prachanda)',
            position: 'Chairman of CPN (Maoist Centre)',
            party: 'CPN (Maoist Centre)',
            image: 'assets/image.png',
            truthScore: 45,
            promiseScore: 30,
            statements: 134,
            category: ['prime-ministers', 'major'],
            tags: ['Maoist', 'Revolutionary', 'Veteran'],
            profileLink: 'politician-profile.html?name=pushpa-kamal-dahal'
        },
        {
            id: 'kp-oli',
            name: 'KP Sharma Oli',
            position: 'Former Prime Minister of Nepal',
            party: 'CPN (UML)',
            image: 'https://th.bing.com/th/id/R.cc57b72a3ac5c3f62ed672c6fc4bd990?rik=IzPpLpH5v4kTcw&pid=ImgRaw&r=0',
            truthScore: 38,
            promiseScore: 42,
            statements: 156,
            category: ['prime-ministers', 'major'],
            tags: ['UML', 'Veteran', 'Former PM'],
            profileLink: 'politician-profile.html?name=kp-oli'
        },
        {
            id: 'sher-bahadur-deuba',
            name: 'Sher Bahadur Deuba',
            position: 'President of Nepali Congress',
            party: 'Nepali Congress',
            image: 'https://tse2.mm.bing.net/th/id/OIP.uawTYI1NfJE5hBchnIviUgHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
            truthScore: 52,
            promiseScore: 48,
            statements: 178,
            category: ['prime-ministers', 'major'],
            tags: ['Congress', 'Veteran', 'President'],
            profileLink: 'politician-profile.html?name=sher-bahadur-deuba'
        },
        {
            id: 'balen-shah',
            name: 'Balendra Shah (Balen)',
            position: 'Mayor of Kathmandu Metropolitan City',
            party: 'Independent',
            image: 'https://tse4.mm.bing.net/th/id/OIP.1HrEGkdb6PVc41HZixBpAwHaHy?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
            truthScore: 65,
            promiseScore: 58,
            statements: 92,
            category: ['mayors', 'independent', 'youth'],
            tags: ['Kathmandu', 'Youth', 'Independent', 'Mayor'],
            profileLink: 'politician-profile.html?name=balen-shah'
        },
        
        // Additional Politicians
        {
            id: 'gagan-thapa',
            name: 'Gagan Kumar Thapa',
            position: 'General Secretary of Nepali Congress',
            party: 'Nepali Congress (NC)',
            image: 'https://via.placeholder.com/300',
            truthScore: 52,
            promiseScore: 48,
            statements: 89,
            category: ['youth', 'major'],
            tags: ['Youth', 'Congress', 'Reformer'],
            profileLink: 'politician-profile.html?name=gagan-thapa'
        },
        {
            id: 'rabi-lamichhane',
            name: 'Rabi Lamichhane',
            position: 'President of Rastriya Swatantra Party',
            party: 'Rastriya Swatantra Party',
            image: 'https://via.placeholder.com/300',
            truthScore: 48,
            promiseScore: 41,
            statements: 67,
            category: ['new', 'youth'],
            tags: ['RSP', 'Journalist', 'New'],
            profileLink: 'politician-profile.html?name=rabi-lamichhane'
        },
        {
            id: 'harka-sampang',
            name: 'Harka Raj Sampang Rai',
            position: 'Mayor of Dharan',
            party: 'Independent',
            image: 'https://via.placeholder.com/300',
            truthScore: 55,
            promiseScore: 52,
            statements: 45,
            category: ['mayors', 'independent', 'youth'],
            tags: ['Dharan', 'Independent', 'Mayor'],
            profileLink: 'politician-profile.html?name=harka-sampang'
        },
        {
            id: 'dr-chandra-kant-raut',
            name: 'Dr. Chandra Kant Raut',
            position: 'President of Janamat Party',
            party: 'Janamat Party',
            image: 'https://via.placeholder.com/300',
            truthScore: 60,
            promiseScore: 55,
            statements: 72,
            category: ['regional', 'new'],
            tags: ['Janamat', 'Madhesh', 'Academic'],
            profileLink: 'politician-profile.html?name=dr-chandra-kant-raut'
        },
        {
            id: 'bidya-bhandari',
            name: 'Bidya Devi Bhandari',
            position: 'Former President of Nepal',
            party: 'CPN (UML)',
            image: 'https://via.placeholder.com/300',
            truthScore: 58,
            promiseScore: 50,
            statements: 102,
            category: ['women', 'prime-ministers'],
            tags: ['President', 'Women', 'UML'],
            profileLink: 'politician-profile.html?name=bidya-bhandari'
        },
        {
            id: 'kamal-thapa',
            name: 'Kamal Thapa',
            position: 'President of Rastriya Prajatantra Party',
            party: 'Rastriya Prajatantra Party',
            image: 'https://via.placeholder.com/300',
            truthScore: 44,
            promiseScore: 39,
            statements: 88,
            category: ['major', 'veteran'],
            tags: ['RPP', 'Monarchy', 'Veteran'],
            profileLink: 'politician-profile.html?name=kamal-thapa'
        },
        {
            id: 'sitaula',
            name: 'Krishna Prasad Sitaula',
            position: 'Senior Leader of Nepali Congress',
            party: 'Nepali Congress',
            image: 'https://via.placeholder.com/300',
            truthScore: 50,
            promiseScore: 45,
            statements: 76,
            category: ['major', 'veteran'],
            tags: ['Congress', 'Veteran', 'Peace'],
            profileLink: 'politician-profile.html?name=sitaula'
        },
        {
            id: 'upaendra-yadav',
            name: 'Upendra Yadav',
            position: 'President of People\'s Socialist Party',
            party: 'People\'s Socialist Party',
            image: 'https://via.placeholder.com/300',
            truthScore: 47,
            promiseScore: 43,
            statements: 81,
            category: ['regional', 'major'],
            tags: ['Madhesh', 'Federalism', 'Leader'],
            profileLink: 'politician-profile.html?name=upaendra-yadav'
        }
    ];
}

function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const gridView = document.getElementById('politiciansGrid');
    const listView = document.getElementById('politiciansList');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide views
            if (view === 'grid') {
                gridView.style.display = 'grid';
                listView.style.display = 'none';
            } else {
                gridView.style.display = 'none';
                listView.style.display = 'flex';
            }
        });
    });
}

function initializeFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    let currentFilter = 'all';
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tag
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            filterPoliticians(filter);
        });
    });
}

function initializeSearch() {
    const searchForm = document.getElementById('politiciansSearchForm');
    const searchInput = document.getElementById('politiciansSearchInput');
    const suggestions = document.getElementById('politiciansSearchSuggestions');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchPoliticians(query);
        }
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            showPoliticianSuggestions(query);
        } else {
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

function initializeSorting() {
    const sortSelect = document.getElementById('sortPoliticians');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortPoliticians(this.value);
        });
    }
}

function initializePagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active page
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would load the page data
            // For now, we'll just scroll to top
            window.scrollTo({ top: 600, behavior: 'smooth' });
        });
    });
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (!this.disabled) {
                // Previous page logic
                console.log('Previous page');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Next page logic
            console.log('Next page');
        });
    }
}

function displayPoliticians(politicians) {
    const gridContainer = document.getElementById('politiciansGrid');
    const listContainer = document.getElementById('politiciansList');
    
    if (!gridContainer || !listContainer) return;
    
    // Clear containers
    gridContainer.innerHTML = '';
    listContainer.innerHTML = '';
    
    // Display in grid view
    politicians.forEach(politician => {
        // Grid card
        const gridCard = createPoliticianCard(politician);
        gridContainer.appendChild(gridCard);
        
        // List item
        const listItem = createPoliticianListItem(politician);
        listContainer.appendChild(listItem);
    });
}

function createPoliticianCard(politician) {
    const card = document.createElement('div');
    card.className = 'politician-card-full';
    card.setAttribute('data-politician', politician.id);
    card.setAttribute('data-category', politician.category.join(' '));
    
    card.innerHTML = `
        <div class="card-header">
            <div class="politician-image">
                <img src="${politician.image}" alt="${politician.name}">
            </div>
            <h3 class="politician-name">${politician.name}</h3>
            <div class="politician-party">${politician.party}</div>
            <div class="position">${politician.position}</div>
        </div>
        <div class="card-body">
            <div class="metrics-summary">
                <div class="metric-item">
                    <span class="metric-value">${politician.truthScore}%</span>
                    <span class="metric-label">Truth Score</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">${politician.promiseScore}%</span>
                    <span class="metric-label">Promise Score</span>
                </div>
            </div>
            <div class="tags">
                ${politician.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="card-footer">
            <span class="statements-count">${politician.statements} statements</span>
            <a href="${politician.profileLink}" class="view-profile-btn">View Profile</a>
        </div>
    `;
    
    return card;
}

function createPoliticianListItem(politician) {
    const item = document.createElement('div');
    item.className = 'politician-list-item';
    item.setAttribute('data-politician', politician.id);
    
    item.innerHTML = `
        <div class="list-image">
            <img src="${politician.image}" alt="${politician.name}">
        </div>
        <div class="list-info">
            <div class="list-name">${politician.name}</div>
            <div class="list-party">${politician.party}</div>
            <div class="list-position">${politician.position}</div>
        </div>
        <div class="list-metrics">
            <div class="list-metric">
                <span class="list-metric-value">${politician.truthScore}%</span>
                <span class="list-metric-label">Truth</span>
            </div>
            <div class="list-metric">
                <span class="list-metric-value">${politician.promiseScore}%</span>
                <span class="list-metric-label">Promises</span>
            </div>
        </div>
        <div class="list-action">
            <a href="${politician.profileLink}" class="view-profile-btn">View</a>
        </div>
    `;
    
    return item;
}

function filterPoliticians(filter) {
    const allPoliticians = getPoliticiansData();
    let filteredPoliticians;
    
    switch(filter) {
        case 'all':
            filteredPoliticians = allPoliticians;
            break;
        case 'major':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Congress') || 
                p.party.includes('UML') || 
                p.party.includes('Maoist')
            );
            break;
        case 'independent':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Independent')
            );
            break;
        case 'youth':
            filteredPoliticians = allPoliticians.filter(p => 
                p.id === 'balen-shah' || 
                p.id === 'gagan-thapa' || 
                p.id === 'rabi-lamichhane' || 
                p.id === 'harka-sampang'
            );
            break;
        case 'women':
            filteredPoliticians = allPoliticians.filter(p => 
                p.id === 'bidya-bhandari'
            );
            break;
        case 'regional':
            filteredPoliticians = allPoliticians.filter(p => 
                p.id === 'dr-chandra-kant-raut' || 
                p.id === 'upaendra-yadav'
            );
            break;
        default:
            filteredPoliticians = allPoliticians;
    }
    
    displayPoliticians(filteredPoliticians);
}

function searchPoliticians(query) {
    const allPoliticians = getPoliticiansData();
    const searchTerm = query.toLowerCase();
    
    const results = allPoliticians.filter(politician => {
        return (
            politician.name.toLowerCase().includes(searchTerm) ||
            politician.party.toLowerCase().includes(searchTerm) ||
            politician.position.toLowerCase().includes(searchTerm) ||
            politician.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
    
    displayPoliticians(results);
    
    // Show message if no results
    if (results.length === 0) {
        const gridContainer = document.getElementById('politiciansGrid');
        const listContainer = document.getElementById('politiciansList');
        
        if (gridContainer) {
            gridContainer.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>No politicians found for "${query}"</h3>
                    <p>Try searching with different terms or browse by category.</p>
                </div>
            `;
        }
        
        if (listContainer) {
            listContainer.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 40px; width: 100%;">
                    <h3>No politicians found for "${query}"</h3>
                    <p>Try searching with different terms or browse by category.</p>
                </div>
            `;
        }
    }
}

function showPoliticianSuggestions(query) {
    const suggestions = document.getElementById('politiciansSearchSuggestions');
    const allPoliticians = getPoliticiansData();
    const searchTerm = query.toLowerCase();
    
    // Get matching politicians
    const matchingPoliticians = allPoliticians
        .filter(p => p.name.toLowerCase().includes(searchTerm))
        .slice(0, 5);
    
    if (matchingPoliticians.length === 0) {
        suggestions.style.display = 'none';
        return;
    }
    
    let html = '<ul>';
    matchingPoliticians.forEach(politician => {
        html += `
            <li>
                <a href="#" class="suggestion-item" data-id="${politician.id}">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <path d="M20 8v6"/>
                        <path d="M23 11h-6"/>
                    </svg>
                    <span>${politician.name}</span>
                    <small>${politician.party}</small>
                </a>
            </li>
        `;
    });
    html += '</ul>';
    
    suggestions.innerHTML = html;
    suggestions.style.display = 'block';
    
    // Handle suggestion clicks
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const politicianId = this.getAttribute('data-id');
            const politician = allPoliticians.find(p => p.id === politicianId);
            
            if (politician) {
                window.location.href = politician.profileLink;
            }
        });
    });
}

function sortPoliticians(sortBy) {
    const allPoliticians = getPoliticiansData();
    let sortedPoliticians;
    
    switch(sortBy) {
        case 'name':
            sortedPoliticians = [...allPoliticians].sort((a, b) => 
                a.name.localeCompare(b.name)
            );
            break;
        case 'truth':
            sortedPoliticians = [...allPoliticians].sort((a, b) => 
                b.truthScore - a.truthScore
            );
            break;
        case 'promises':
            sortedPoliticians = [...allPoliticians].sort((a, b) => 
                b.promiseScore - a.promiseScore
            );
            break;
        case 'statements':
            sortedPoliticians = [...allPoliticians].sort((a, b) => 
                b.statements - a.statements
            );
            break;
        case 'recent':
            // For demo, reverse the array
            sortedPoliticians = [...allPoliticians].reverse();
            break;
        default:
            sortedPoliticians = allPoliticians;
    }
    
    displayPoliticians(sortedPoliticians);
}

function initializeCategoryLinks() {
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterPoliticiansByCategory(category);
        });
    });
    
    // Footer category links
    document.querySelectorAll('.footer-links a[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            filterPoliticians(filter);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        });
    });
    
    // Footer party links
    document.querySelectorAll('.footer-links a[data-party]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const party = this.getAttribute('data-party');
            filterPoliticiansByParty(party);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        });
    });
}

function filterPoliticiansByCategory(category) {
    const allPoliticians = getPoliticiansData();
    const filteredPoliticians = allPoliticians.filter(p => 
        p.category.includes(category)
    );
    
    displayPoliticians(filteredPoliticians);
    window.scrollTo({ top: 600, behavior: 'smooth' });
}

function filterPoliticiansByParty(party) {
    const allPoliticians = getPoliticiansData();
    let filteredPoliticians;
    
    switch(party) {
        case 'nepali-congress':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Congress')
            );
            break;
        case 'cpn-uml':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('UML')
            );
            break;
        case 'maoist-centre':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Maoist')
            );
            break;
        case 'rsp':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Rastriya Swatantra')
            );
            break;
        case 'independent':
            filteredPoliticians = allPoliticians.filter(p => 
                p.party.includes('Independent')
            );
            break;
        default:
            filteredPoliticians = allPoliticians;
    }
    
    displayPoliticians(filteredPoliticians);
    window.scrollTo({ top: 600, behavior: 'smooth' });
}

// Export for global access
window.PoliticiansPage = {
    searchPoliticians,
    filterPoliticians,
    sortPoliticians,
    getPoliticiansData
};