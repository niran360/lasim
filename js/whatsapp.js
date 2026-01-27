// WhatsApp Integration for LASIMRA Website

class WhatsAppChat {
    constructor(options = {}) {
        this.options = {
            phoneNumber: '2348181556300', // Default number
            defaultMessage: 'Hello LASIMRA, I need assistance with',
            position: 'right', // 'left' or 'right'
            showOnMobile: true,
            showOnDesktop: true,
            autoOpen: false,
            autoOpenDelay: 10000, // 10 seconds
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.addEventListeners();
        
        if (this.options.autoOpen) {
            setTimeout(() => this.openChat(), this.options.autoOpenDelay);
        }
    }
    
    createWidget() {
        // Create main container
        this.container = document.createElement('div');
        this.container.className = 'whatsapp-widget-container';
        this.container.setAttribute('role', 'dialog');
        this.container.setAttribute('aria-label', 'WhatsApp chat widget');
        
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'whatsapp-toggle';
        this.toggleButton.setAttribute('aria-label', 'Open WhatsApp chat');
        this.toggleButton.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            <span class="notification-badge">1</span>
        `;
        
        // Create chat window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'whatsapp-chat-window';
        this.chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-avatar">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <div class="chat-info">
                    <h3>LASIMRA Support</h3>
                    <p>Typically replies within minutes</p>
                </div>
                <button class="chat-close" aria-label="Close chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-body">
                <div class="chat-messages">
                    <div class="message received">
                        <div class="message-content">
                            <p>Hello! 👋 I'm from LASIMRA. How can I help you today?</p>
                            <span class="message-time">Just now</span>
                        </div>
                    </div>
                </div>
                <div class="quick-replies">
                    <button class="quick-reply" data-message="I need help with application process">
                        <i class="fas fa-file-alt"></i> Application Help
                    </button>
                    <button class="quick-reply" data-message="I want to inquire about permit requirements">
                        <i class="fas fa-question-circle"></i> Permit Inquiry
                    </button>
                    <button class="quick-reply" data-message="I need to check my application status">
                        <i class="fas fa-search"></i> Status Check
                    </button>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." class="chat-input-field">
                    <button class="chat-send" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Append elements
        this.container.appendChild(this.toggleButton);
        this.container.appendChild(this.chatWindow);
        document.body.appendChild(this.container);
        
        // Apply styles
        this.applyStyles();
    }
    
    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-widget-container {
                position: fixed;
                ${this.options.position}: 20px;
                bottom: 20px;
                z-index: 10000;
                font-family: 'Inter', sans-serif;
            }
            
            .whatsapp-toggle {
                width: 60px;
                height: 60px;
                background: #25D366;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                transition: all 0.3s ease;
                position: relative;
            }
            
            .whatsapp-toggle:hover {
                background: #128C7E;
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
            }
            
            .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #FF6B00;
                color: white;
                font-size: 12px;
                font-weight: 600;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .whatsapp-chat-window {
                position: absolute;
                ${this.options.position}: 0;
                bottom: 70px;
                width: 350px;
                max-width: 90vw;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .whatsapp-chat-window.active {
                display: flex;
            }
            
            .chat-header {
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chat-avatar {
                width: 40px;
                height: 40px;
                background: white;
                color: #25D366;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            
            .chat-info {
                flex: 1;
            }
            
            .chat-info h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: white;
            }
            
            .chat-info p {
                margin: 0;
                font-size: 12px;
                opacity: 0.9;
            }
            
            .chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
                padding: 5px;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .chat-close:hover {
                opacity: 1;
            }
            
            .chat-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                max-height: 400px;
            }
            
            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f0f0f0;
            }
            
            .message {
                margin-bottom: 15px;
                display: flex;
            }
            
            .message.received {
                justify-content: flex-start;
            }
            
            .message.sent {
                justify-content: flex-end;
            }
            
            .message-content {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                position: relative;
            }
            
            .message.received .message-content {
                background: white;
                border-radius: 18px 18px 18px 4px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .message.sent .message-content {
                background: #DCF8C6;
                border-radius: 18px 18px 4px 18px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .message-content p {
                margin: 0 0 5px 0;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .message-time {
                font-size: 11px;
                opacity: 0.7;
                display: block;
                text-align: right;
            }
            
            .quick-replies {
                padding: 15px 20px;
                background: white;
                border-top: 1px solid #eee;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .quick-reply {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 10px 15px;
                font-size: 13px;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #495057;
            }
            
            .quick-reply:hover {
                background: #e9ecef;
                border-color: #dee2e6;
            }
            
            .chat-input {
                padding: 15px 20px;
                background: white;
                border-top: 1px solid #eee;
                display: flex;
                gap: 10px;
            }
            
            .chat-input-field {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #e9ecef;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }
            
            .chat-input-field:focus {
                border-color: #25D366;
            }
            
            .chat-send {
                width: 40px;
                height: 40px;
                background: #25D366;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                transition: background 0.2s;
            }
            
            .chat-send:hover {
                background: #128C7E;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .whatsapp-widget-container {
                    ${this.options.position}: 10px;
                    bottom: 10px;
                }
                
                .whatsapp-chat-window {
                    width: calc(100vw - 40px);
                    max-width: none;
                }
                
                .whatsapp-toggle {
                    width: 50px;
                    height: 50px;
                    font-size: 24px;
                }
            }
            
            @media (max-width: 480px) {
                .whatsapp-widget-container {
                    ${this.options.position}: 5px;
                    bottom: 5px;
                }
                
                .whatsapp-chat-window {
                    width: calc(100vw - 20px);
                    bottom: 60px;
                }
            }
            
            /* Hide on specific devices if configured */
            ${!this.options.showOnMobile ? `
                @media (max-width: 768px) {
                    .whatsapp-widget-container {
                        display: none;
                    }
                }
            ` : ''}
            
            ${!this.options.showOnDesktop ? `
                @media (min-width: 769px) {
                    .whatsapp-widget-container {
                        display: none;
                    }
                }
            ` : ''}
        `;
        
        document.head.appendChild(style);
    }
    
    addEventListeners() {
        // Toggle chat window
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        
        // Close chat window
        const closeBtn = this.chatWindow.querySelector('.chat-close');
        closeBtn.addEventListener('click', () => this.closeChat());
        
        // Quick reply buttons
        const quickReplies = this.chatWindow.querySelectorAll('.quick-reply');
        quickReplies.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                this.sendMessage(message);
            });
        });
        
        // Send button
        const sendBtn = this.chatWindow.querySelector('.chat-send');
        const inputField = this.chatWindow.querySelector('.chat-input-field');
        
        sendBtn.addEventListener('click', () => {
            const message = inputField.value.trim();
            if (message) {
                this.sendMessage(message);
                inputField.value = '';
            }
        });
        
        // Send on Enter key
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = inputField.value.trim();
                if (message) {
                    this.sendMessage(message);
                    inputField.value = '';
                }
            }
        });
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && 
                this.chatWindow.classList.contains('active') &&
                e.target !== this.toggleButton) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
        
        // Remove notification badge when opening
        if (this.chatWindow.classList.contains('active')) {
            const badge = this.toggleButton.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        }
        
        // Focus input field when opening
        if (this.chatWindow.classList.contains('active')) {
            setTimeout(() => {
                this.chatWindow.querySelector('.chat-input-field').focus();
            }, 100);
        }
    }
    
    openChat() {
        this.chatWindow.classList.add('active');
        
        // Remove notification badge
        const badge = this.toggleButton.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
        
        // Focus input field
        setTimeout(() => {
            this.chatWindow.querySelector('.chat-input-field').focus();
        }, 100);
    }
    
    closeChat() {
        this.chatWindow.classList.remove('active');
    }
    
    sendMessage(message) {
        // Add message to chat UI
        this.addMessage(message, 'sent');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate response after delay
        setTimeout(() => {
            this.removeTypingIndicator();
            this.addResponse();
        }, 1000);
        
        // Open WhatsApp with message
        setTimeout(() => {
            this.openWhatsApp(message);
        }, 3000);
    }
    
    addMessage(message, type = 'sent') {
        const messagesContainer = this.chatWindow.querySelector('.chat-messages');
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const messagesContainer = this.chatWindow.querySelector('.chat-messages');
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message received typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        typingElement.id = 'typing-indicator';
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add typing dots animation
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 10px 0;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: #ccc;
                border-radius: 50%;
                animation: typing 1.4s infinite both;
            }
            
            .typing-dots span:nth-child(1) {
                animation-delay: 0s;
            }
            
            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-8px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    removeTypingIndicator() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    addResponse() {
        const responses = [
            "Thanks for your message! I'll connect you with our support team on WhatsApp for further assistance.",
            "I understand you need help with that. Let me transfer you to our specialist who can help you better.",
            "Great question! Our team will provide detailed guidance on WhatsApp.",
            "I'll make sure you get the right information. Please continue on WhatsApp for personalized support."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(randomResponse, 'received');
    }
    
    openWhatsApp(message) {
        const phone = this.options.phoneNumber;
        const text = encodeURIComponent(`${this.options.defaultMessage} ${message}`);
        const url = `https://wa.me/${phone}?text=${text}`;
        
        window.open(url, '_blank');
        
        // Add final message
        setTimeout(() => {
            this.addMessage("I've opened WhatsApp for you. Please check your browser for the WhatsApp window.", 'received');
        }, 500);
    }
}

// Initialize WhatsApp Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const whatsappChat = new WhatsAppChat({
        phoneNumber: '2341234567890', // Replace with LASIMRA's WhatsApp number
        defaultMessage: 'Hello LASIMRA, I need assistance with:',
        position: 'right',
        showOnMobile: true,
        showOnDesktop: true,
        autoOpen: false,
        autoOpenDelay: 30000 // 30 seconds
    });
    
    // Expose to global scope for manual control if needed
    window.LASIMRAWhatsApp = whatsappChat;
});

// Simple WhatsApp Button (Alternative to full widget)
function initSimpleWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phone = '2341234567890'; // LASIMRA WhatsApp number
            const defaultMessage = 'Hello LASIMRA, I need assistance with:';
            const pageTitle = document.title;
            const url = encodeURIComponent(window.location.href);
            
            const text = encodeURIComponent(`${defaultMessage} \n\nPage: ${pageTitle}\nURL: ${url}`);
            const whatsappURL = `https://wa.me/${phone}?text=${text}`;
            
            window.open(whatsappURL, '_blank');
            
            // Track click (for analytics)
            console.log('WhatsApp button clicked from:', pageTitle);
        });
    }
}

// Initialize simple WhatsApp button
document.addEventListener('DOMContentLoaded', initSimpleWhatsApp);