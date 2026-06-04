// Script to verify optimizations are working
console.log('=== ChinaTravel Optimization Verification ===\n');

// 1. Check if secondary CTA is hidden on mobile
const secondaryBtn = document.querySelector('a[href="#itinerary"][class*="hidden"]');
if (secondaryBtn) {
  console.log('✅ Secondary CTA is hidden on mobile (hidden sm:inline-flex)');
  console.log('   Classes:', secondaryBtn.className);
} else {
  console.log('❌ Secondary CTA might not be properly hidden');
}

// 2. Check if scroll tracking is active
if (typeof window.dataLayer !== 'undefined') {
  console.log('\n✅ GTM dataLayer initialized');
  console.log('   dataLayer items:', window.dataLayer.length);
  
  // Check for UTM params
  const utmEvent = window.dataLayer.find(e => e.event === 'utm_params_detected');
  if (utmEvent) {
    console.log('\n✅ UTM Parameters detected:');
    console.log('   utm_source:', utmEvent.utm_source);
    console.log('   utm_medium:', utmEvent.utm_medium);
    console.log('   utm_campaign:', utmEvent.utm_campaign);
  }
} else {
  console.log('\n❌ GTM dataLayer not found');
}

// 3. Check if scroll depth tracking is active
console.log('\n--- Scroll Depth Tracking ---');
console.log('Scroll to different percentages and watch for scroll_depth events in dataLayer');
console.log('Add this to see scroll events:');
console.log('window.dataLayer.filter(e => e.event === "scroll_depth")');

// 4. Check trust signals simplification
const trustSignals = document.querySelectorAll('[class*="TourTrustSignals"]');
if (trustSignals.length === 0) {
  console.log('\n✅ TourTrustSignals component removed (simplified trust signals)');
} else {
  console.log('\n❌ TourTrustSignals still present');
}

console.log('\n=== End Verification ===');
