// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set body styles to ensure proper layout
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.minHeight = '100vh';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    
    // Ensure container has proper width
    const container = document.querySelector('.container');
    if (container) {
        container.style.width = '350px';
        container.style.minWidth = '350px';
        container.style.maxWidth = '350px';
    }
    
    setupEventListeners();
    animateStats();
    startDataUpdates();

    // Footer navigation handlers
    document.getElementById('nav-home').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Home', 'Navigating to the home page...');
        // TODO: Show home section
    });
    document.getElementById('nav-sniper-settings').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Sniper Settings', 'Opening sniper settings...');
        // TODO: Show sniper settings modal/section
    });
    document.getElementById('nav-wallet').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Wallet', 'Open wallet to fund your Solana sniper...');
        // TODO: Show wallet/funding section
    });
    document.getElementById('nav-server-browser').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Server Browser', 'Browse PumpFun/Bonk new coins...');
        // TODO: Show server browser section
    });
});

// Action card functions
function createProject() {
    showNotification('New Tokens', 'Fetching latest token launches...');
    // Simulate API call
    setTimeout(() => {
        updateStats();
    }, 1000);
}

function savedProjects() {
    showNotification('Portfolio', 'Loading your holdings...');
    // Navigate to portfolio view
}

function getSOL() {
    showNotification('Yield Vaults', 'Finding best yield opportunities...');
    // Navigate to yield vaults
}

function pfRewards() {
    showNotification('Analytics', 'Loading market insights...');
    // Navigate to analytics
}

function openDocumentation() {
    showNotification('Market Overview', 'Loading real-time metrics...');
}

function followOnX() {
    showNotification('Live Trading', 'Connecting to trading feed...');
}

// Setup event listeners
function setupEventListeners() {
    // Settings button
    document.querySelector('.settings-btn').addEventListener('click', function() {
        showNotification('Settings', 'Opening preferences...');
    });

    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the label text
            const label = this.querySelector('.nav-label').textContent;
            showNotification(label, `Navigating to ${label}...`);
        });
    });
}

// Animate stats numbers
function animateStats() {
    animateNumber(document.getElementById('tokensTracked'), 0, 247, 2000);
    animateNumber(document.getElementById('totalVolume'), 0, 2.4, 2000, '$', 'M');
    animateNumber(document.getElementById('successRate'), 0, 94, 2000, '', '%');
}

// Animate number counting
function animateNumber(element, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        if (suffix === 'M') {
            element.textContent = prefix + current.toFixed(1) + suffix;
        } else if (suffix === '%') {
            element.textContent = prefix + Math.round(current) + suffix;
        } else {
            element.textContent = prefix + Math.round(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Update stats with new data
function updateStats() {
    const tokensElement = document.getElementById('tokensTracked');
    const volumeElement = document.getElementById('totalVolume');
    const rateElement = document.getElementById('successRate');
    
    // Simulate new data
    const newTokens = Math.floor(Math.random() * 50) + 200;
    const newVolume = (Math.random() * 2 + 1).toFixed(1);
    const newRate = Math.floor(Math.random() * 10) + 90;
    
    animateNumber(tokensElement, parseInt(tokensElement.textContent), newTokens, 1000);
    animateNumber(volumeElement, parseFloat(volumeElement.textContent.replace('$', '').replace('M', '')), newVolume, 1000, '$', 'M');
    animateNumber(rateElement, parseInt(rateElement.textContent.replace('%', '')), newRate, 1000, '', '%');
}

// Show notification
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(42, 42, 42, 0.95);
        border: 1px solid #ff6b35;
        border-radius: 12px;
        padding: 16px 24px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
        text-align: center;
    `;
    
    notification.innerHTML = `
        <div style="color: #ff6b35; font-weight: 600; margin-bottom: 4px;">${title}</div>
        <div style="color: #ccc; font-size: 12px;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Start periodic data updates
function startDataUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        updateStats();
    }, 30000);
    
    // Add some visual feedback for live data
    const statsElements = document.querySelectorAll('.stat-number');
    setInterval(() => {
        statsElements.forEach(element => {
            element.style.color = '#ff6b35';
            setTimeout(() => {
                element.style.color = '#ffffff';
            }, 200);
        });
    }, 10000);
}

// Utility function to format currency
function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(1) + 'K';
    } else {
        return '$' + value.toFixed(2);
    }
}

// Utility function to format percentage
function formatPercentage(value) {
    return value.toFixed(1) + '%';
}
