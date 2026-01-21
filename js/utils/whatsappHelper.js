/**
 * WHATSAPP HELPER
 * Utilidad para manejar enlaces de WhatsApp según el dispositivo
 */

/**
 * Inicializar comportamiento de enlaces de WhatsApp
 * En desktop (>= 1024px) usa WhatsApp Web
 * En mobile usa la app nativa
 */
export function initWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const isDesktop = window.innerWidth >= 1024;
      
      if (isDesktop) {
        e.preventDefault();
        const originalHref = this.getAttribute('href');
        
        // Extraer número y mensaje de wa.me URL
        const match = originalHref.match(/wa\.me\/(\d+)\?text=(.+)/);
        
        if (match) {
          const phone = match[1];
          const text = match[2];
          const webWhatsAppUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;
          
          window.open(webWhatsAppUrl, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });
}
