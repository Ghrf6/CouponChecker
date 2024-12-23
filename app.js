chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const url = new URL(activeTab.url);
    const currentSite = url.hostname.replace(/^www\./, '');

    document.getElementById('current-site').textContent = currentSite;

    const couponsURL = 'coupons.json';
    fetch(couponsURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const couponsList = document.getElementById('coupons-list');
            const siteCoupons = data.filter((coupon) => coupon.site === currentSite);

            if (siteCoupons.length > 0) {
                siteCoupons.forEach((coupon) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Code: ${coupon.code}`;
                    couponsList.appendChild(listItem);
                });
            } else {
                const noCouponsMessage = document.createElement('li');
                noCouponsMessage.textContent = 'No coupons available for this site.';
                couponsList.appendChild(noCouponsMessage);
            }
        })
        .catch((error) => {
            console.error('Error fetching the coupons:', error);
        });
});
