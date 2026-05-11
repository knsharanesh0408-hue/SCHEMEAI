// Content script to detect forms and autofill data
console.log('SchemeAI: Portal Assistant Active');

const portalMappings = {
  'pmkisan.gov.in': {
    'name': 'input[name="farmerName"]',
    'phone': 'input[name="mobileNumber"]',
    'state': 'select[name="state"]'
  }
};

function autofill() {
  const hostname = window.location.hostname;
  const config = portalMappings[hostname];
  
  if (!config) return;

  chrome.storage.local.get(['userProfile'], (result) => {
    if (result.userProfile) {
      Object.keys(config).forEach(key => {
        const selector = config[key];
        const element = document.querySelector(selector);
        if (element) {
          element.value = result.userProfile[key] || '';
          element.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }
  });
}

// Watch for DOM changes or run once
autofill();
