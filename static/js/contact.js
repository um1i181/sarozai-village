document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('[data-contact-form]');
    const errorBox = document.querySelector('[data-contact-error]');
    const country = document.getElementById('contactCountry');
    const phone = document.getElementById('contactPhone');
    const code = document.querySelector('[data-country-code]');
    if (!form || !errorBox) return;

    function updateCallingCode() {
        const option = country && country.options[country.selectedIndex];
        const callingCode = option ? option.dataset.callingCode : '';
        if (code) {
            code.textContent = callingCode;
            code.hidden = !callingCode;
        }
        if (phone) phone.placeholder = callingCode ? 'Local number (code applied)' : 'Optional local number';
    }

    if (country) {
        country.addEventListener('change', updateCallingCode);
        updateCallingCode();
    }

    form.addEventListener('submit', function (event) {
        const name = form.elements.name.value.trim();
        const soName = form.elements.so_name.value.trim();
        const email = form.elements.email.value.trim();
        const contact = form.elements.contact.value.trim();
        const message = form.elements.message.value.trim();
        const namePattern = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{1,79}$/;
        const gmailPattern = /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9.]{0,28}[A-Za-z0-9])?@gmail\.com$/;
        const phonePattern = /^[+0-9().\-\s]{7,25}$/;
        const errors = [];

        if (!namePattern.test(name)) errors.push('Please enter a valid name.');
        if (!namePattern.test(soName)) errors.push('Please enter a valid S/O name.');
        if (!gmailPattern.test(email)) errors.push('Please enter a valid Gmail address ending in @gmail.com.');
        if (contact && !form.elements.country.value) errors.push('Please select a country before entering a contact number.');
        if (contact && (!phonePattern.test(contact) || contact.replace(/\D/g, '').length < 7)) errors.push('Please enter a valid contact number for the selected country.');
        if (!message) errors.push('Please enter a message.');

        if (errors.length) {
            event.preventDefault();
            errorBox.textContent = errors.join(' ');
            errorBox.hidden = false;
        } else {
            errorBox.hidden = true;
        }
    });
});
