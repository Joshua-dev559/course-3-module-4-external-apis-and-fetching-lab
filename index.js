// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', () => {
    const stateInput = document.getElementById('state-input');
    const fetchButton = document.getElementById('fetch-alerts');
    const alertsDisplay = document.getElementById('alerts-display');
    const errorMessage = document.getElementById('error-message');

    const API_URL = 'https://api.weather.gov/alerts/active?area=';

    fetchButton.addEventListener('click', async () => {
        const state = stateInput.value.trim().toUpperCase();

        alertsDisplay.innerHTML = '';
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        if (!state) return;

        try {
            const response = await fetch(`${API_URL}${state}`);

            if (!response.ok) {
                throw new Error('network failure');
            }

            const data = await response.json();

            const count = data.features ? data.features.length : 0;

            const header = document.createElement('h2');
            header.textContent = `Weather Alerts: ${count}`;
            alertsDisplay.appendChild(header);

            if (count > 0) {
                data.features.forEach(item => {
                    const div = document.createElement('div');

                    const title = item.properties?.event || 'Unknown Event';
                    const desc = item.properties?.headline || '';

                    div.textContent = `${title} ${desc}`;
                    alertsDisplay.appendChild(div);
                });
            }

            stateInput.value = '';

        } catch (err) {
            errorMessage.textContent = err.message; // IMPORTANT for regex tests
            errorMessage.classList.remove('hidden');
        }
    });
});