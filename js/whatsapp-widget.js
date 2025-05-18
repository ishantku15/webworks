// WhatsApp Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp chat widget
    const whatsappWidget = document.createElement('div');
    whatsappWidget.className = 'whatsapp-widget';
    whatsappWidget.innerHTML = `
        <div class="whatsapp-header">
            <div class="whatsapp-avatar">
                <img src="https://via.placeholder.com/50" alt="Ishant Webworks">
            </div>
            <div class="whatsapp-info">
                <h4>Ishant Webworks</h4>
                <p>Typically replies within an hour</p>
            </div>
            <button class="close-whatsapp"><i class="fas fa-times"></i></button>
        </div>
        <div class="whatsapp-messages">
            <div class="whatsapp-message whatsapp-received">
                <p>Hello! 👋 How can I help you with your website needs?</p>
                <span class="whatsapp-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        </div>
        <div class="whatsapp-input">
            <input type="text" placeholder="Type a message...">
            <button class="send-whatsapp"><i class="fab fa-whatsapp"></i></button>
        </div>
    `;
    
    // Style the widget (can also be added to CSS)
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-widget {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 300px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .whatsapp-widget.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        .whatsapp-header {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #25D366;
            color: #fff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .whatsapp-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
        }
        .whatsapp-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .whatsapp-info {
            flex: 1;
        }
        .whatsapp-info h4 {
            margin: 0;
            font-size: 14px;
        }
        .whatsapp-info p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }
        .close-whatsapp {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
        }
        .whatsapp-messages {
            height: 300px;
            padding: 15px;
            overflow-y: auto;
            background: #f5f5f5;
        }
        .whatsapp-message {
            margin-bottom: 15px;
            max-width: 80%;
            padding: 10px;
            border-radius: 10px;
            position: relative;
            font-size: 14px;
        }
        .whatsapp-received {
            background: #fff;
            align-self: flex-start;
            margin-right: auto;
        }
        .whatsapp-time {
            display: block;
            font-size: 10px;
            color: #999;
            text-align: right;
            margin-top: 5px;
        }
        .whatsapp-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #eee;
            background: #fff;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .whatsapp-input input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }
        .send-whatsapp {
            width: 40px;
            height: 40px;
            margin-left: 10px;
            background: #25D366;
            color: #fff;
            border: none;
            border-radius: 50%;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Append widget to body
    document.body.appendChild(whatsappWidget);
    
    // Toggle WhatsApp widget
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const whatsappWidgetElement = document.querySelector('.whatsapp-widget');
    
    whatsappFloat.addEventListener('click', function(e) {
        if (e.target === this || e.target.closest('.whatsapp-float')) {
            e.preventDefault();
            whatsappWidgetElement.classList.toggle('active');
        }
    });
    
    // Close WhatsApp widget
    const closeWhatsapp = document.querySelector('.close-whatsapp');
    if (closeWhatsapp) {
        closeWhatsapp.addEventListener('click', () => {
            whatsappWidgetElement.classList.remove('active');
        });
    }
    
    // Send WhatsApp message
    const whatsappInput = document.querySelector('.whatsapp-input input');
    const sendWhatsapp = document.querySelector('.send-whatsapp');
    
    sendWhatsapp.addEventListener('click', function() {
        const message = whatsappInput.value.trim();
        if (message) {
            const messagesContainer = document.querySelector('.whatsapp-messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'whatsapp-message whatsapp-sent';
            newMessage.innerHTML = `
                <p>${message}</p>
                <span class="whatsapp-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            `;
            
            // Add sent message style
            const sentStyle = document.createElement('style');
            sentStyle.textContent = `
                .whatsapp-sent {
                    background: #DCF8C6;
                    align-self: flex-end;
                    margin-left: auto;
                }
            `;
            document.head.appendChild(sentStyle);
            
            messagesContainer.appendChild(newMessage);
            whatsappInput.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Auto reply after 1 second
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'whatsapp-message whatsapp-received';
                replyMessage.innerHTML = `
                    <p>Thanks for your message! I'll get back to you soon. For immediate assistance, you can call me at +91 85348 48815.</p>
                    <span class="whatsapp-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                `;
                messagesContainer.appendChild(replyMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    });
    
    // Send message on Enter key
    whatsappInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendWhatsapp.click();
        }
    });
});