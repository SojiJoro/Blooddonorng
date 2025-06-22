// src/app/layout.tsx
import './globals.css'
import NavBar from '../components/NavBar'
import { ReactNode } from 'react'

export const metadata = {
  title: 'BloodLink - Connecting Blood Donors & Recipients',
  description: 'Nigeria\'s premier blood donation platform connecting donors with recipients across the country. Save lives, join our community of heroes.',
  keywords: 'blood donation, Nigeria, blood bank, emergency blood, donors, recipients, healthcare',
  authors: [{ name: 'BloodLink Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BloodLink - Connecting Blood Donors & Recipients',
    description: 'Nigeria\'s premier blood donation platform connecting donors with recipients across the country.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'BloodLink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BloodLink - Connecting Blood Donors & Recipients',
    description: 'Nigeria\'s premier blood donation platform connecting donors with recipients across the country.',
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2d5242" />
        <meta name="msapplication-TileColor" content="#2d5242" />
        
        {/* Prevent flash of unstyled content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent FOUC */
            body { visibility: hidden; opacity: 0; }
            body.loaded { visibility: visible; opacity: 1; transition: opacity 0.3s ease; }
            
            /* Loading spinner for initial page load */
            .initial-loader {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #2d5242 0%, #5e8b6f 100%);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .initial-loader.hidden {
              opacity: 0;
              visibility: hidden;
            }
            
            .loader-icon {
              width: 4rem;
              height: 4rem;
              margin-bottom: 1rem;
              animation: pulse 2s ease-in-out infinite alternate;
            }
            
            .loader-text {
              color: white;
              font-family: 'Inter', sans-serif;
              font-weight: 600;
              font-size: 1.125rem;
              margin-bottom: 0.5rem;
            }
            
            .loader-subtext {
              color: rgba(255, 255, 255, 0.8);
              font-family: 'Inter', sans-serif;
              font-size: 0.875rem;
            }
            
            @keyframes pulse {
              0% { transform: scale(1); }
              100% { transform: scale(1.1); }
            }
          `
        }} />
      </head>
      <body className="antialiased">
        {/* Initial loading screen */}
        <div id="initial-loader" className="initial-loader">
          <svg className="loader-icon" fill="white" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="loader-text">BloodLink</div>
          <div className="loader-subtext">Connecting Lives, Saving Futures</div>
        </div>

        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global navbar */}
        <NavBar />

        {/* Main content area */}
        <main id="main-content" className="main-content">
          {children}
        </main>

        {/* Scroll to top button */}
        <button
          id="scroll-to-top"
          className="scroll-to-top"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>

        {/* Global notification container */}
        <div id="notification-container" className="notification-container"></div>

        {/* Emergency floating action button */}
        <div className="emergency-fab-container">
          <button className="emergency-fab" aria-label="Emergency blood request">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
            </svg>
          </button>
          <span className="emergency-fab-tooltip">Emergency Request</span>
        </div>

        {/* Client-side scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Hide initial loader and show content
            window.addEventListener('load', function() {
              const loader = document.getElementById('initial-loader');
              const body = document.body;
              
              setTimeout(() => {
                loader.classList.add('hidden');
                body.classList.add('loaded');
              }, 500);
            });

            // Scroll to top functionality
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            
            window.addEventListener('scroll', function() {
              if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
              } else {
                scrollToTopBtn.classList.remove('visible');
              }
            });
            
            scrollToTopBtn.addEventListener('click', function() {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            });

            // Emergency FAB functionality
            const emergencyFab = document.querySelector('.emergency-fab');
            emergencyFab.addEventListener('click', function() {
              window.location.href = '/emergency-request';
            });

            // Global notification system
            window.showNotification = function(message, type = 'info', duration = 5000) {
              const container = document.getElementById('notification-container');
              const notification = document.createElement('div');
              notification.className = \`notification notification-\${type} slide-up\`;
              notification.innerHTML = \`
                <div class="notification-content">
                  <span class="notification-message">\${message}</span>
                  <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              \`;
              
              container.appendChild(notification);
              
              if (duration > 0) {
                setTimeout(() => {
                  notification.style.opacity = '0';
                  notification.style.transform = 'translateY(-100%)';
                  setTimeout(() => notification.remove(), 300);
                }, duration);
              }
            };

            // Global error handler
            window.addEventListener('error', function(e) {
              console.error('Global error:', e.error);
              // You could send this to an error reporting service
            });

            // Service worker registration for PWA
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}