// Social links handler - ensures all social media links work correctly

export function initSocialLinks() {
  const socialUrls = {
    facebook: 'https://www.facebook.com/goITclub/',
    instagram: 'https://www.instagram.com/goitclub/',
    youtube: 'https://www.youtube.com/c/GoIT'
  };

  function setupSocialLinks() {
    // Find all social links
    const socialLinks = document.querySelectorAll(
      '.header__socials-link, .mobile-menu__socials-link, .footer__socials-link'
    );
    
    socialLinks.forEach(link => {
      // Ensure href is set correctly
      const ariaLabel = link.getAttribute('aria-label')?.toLowerCase() || '';
      let correctUrl = '';
      
      if (ariaLabel.includes('facebook')) {
        correctUrl = socialUrls.facebook;
      } else if (ariaLabel.includes('instagram')) {
        correctUrl = socialUrls.instagram;
      } else if (ariaLabel.includes('youtube')) {
        correctUrl = socialUrls.youtube;
      }
      
      if (correctUrl) {
        link.setAttribute('href', correctUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add click handler that definitely works
        link.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Try multiple methods to open link
          const opened = window.open(correctUrl, '_blank', 'noopener,noreferrer');
          
          if (!opened || opened.closed) {
            // Fallback: create temporary link and click it
            const tempLink = document.createElement('a');
            tempLink.href = correctUrl;
            tempLink.target = '_blank';
            tempLink.rel = 'noopener noreferrer';
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
          }
          
          // Close mobile menu if needed
          if (link.classList.contains('mobile-menu__socials-link')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
              mobileMenu.classList.remove('is-open');
              document.body.style.overflow = '';
            }
          }
          
          return false;
        };
        
        // Make images inside clickable
        const img = link.querySelector('img');
        if (img) {
          img.style.pointerEvents = 'none';
          img.style.cursor = 'pointer';
        }
      }
    });
  }

  // Setup when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupSocialLinks();
      setTimeout(setupSocialLinks, 300);
      setTimeout(setupSocialLinks, 1000);
    });
  } else {
    setupSocialLinks();
    setTimeout(setupSocialLinks, 300);
    setTimeout(setupSocialLinks, 1000);
  }
}
