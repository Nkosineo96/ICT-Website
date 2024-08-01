document.addEventListener('DOMContentLoaded', function() {
    // Set the current date and time
    const dateElement = document.getElementById('quotation-date');
    const timeElement = document.getElementById('quotation-time');
    const currentDate = new Date();
    dateElement.textContent = currentDate.toLocaleDateString();
    timeElement.textContent = currentDate.toLocaleTimeString();

    // Add functionality to add new items to the table
    const addItemButton = document.getElementById('add-item');
    const quotationItems = document.getElementById('quotation-items');

    addItemButton.addEventListener('click', function() {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><textarea name="product-description" rows="1" required></textarea></td>
            <td><input type="text" name="serial-number" required></td>
            <td><input type="text" name="item" required></td>
            <td><input type="number" name="quantity" required></td>
            <td><input type="text" name="unit-price" required></td>
            <td><input type="text" name="amount" readonly></td>
        `;

        quotationItems.appendChild(newRow);

        updateAmountCalculation();
    });

    // Calculate the amount for each row and the total cost
    function updateAmountCalculation() {
        const rows = quotationItems.querySelectorAll('tr');

        rows.forEach(row => {
            const quantityInput = row.querySelector('input[name="quantity"]');
            const unitPriceInput = row.querySelector('input[name="unit-price"]');
            const amountInput = row.querySelector('input[name="amount"]');

            function calculateAmount() {
                const quantity = parseFloat(quantityInput.value) || 0;
                const unitPrice = parseFloat(unitPriceInput.value) || 0;
                const amount = quantity * unitPrice;
                amountInput.value = amount.toFixed(2);
                updateTotalCost();
            }

            quantityInput.addEventListener('input', calculateAmount);
            unitPriceInput.addEventListener('input', calculateAmount);
        });
    }

    // Calculate and update the total cost
    function updateTotalCost() {
        const amountInputs = quotationItems.querySelectorAll('input[name="amount"]');
        let totalCost = 0;

        amountInputs.forEach(input => {
            totalCost += parseFloat(input.value) || 0;
        });

        const totalCostInput = document.getElementById('total-cost');
        totalCostInput.value = totalCost.toFixed(2);
    }

    updateAmountCalculation();
});

const hamMenu = document.querySelector('.hamburger');
const NavLinks = document.querySelector('.nav')

hamMenu.addEventListener('click', function() {
    hamMenu.classList.toggle('active');
    mobileNavLinks.classList.toggle('active');
});

document.querySelector('.contact-form').addEventListener('submit', function(event) {
    // Example: Check if the email field is properly filled
    const email = document.querySelector('#email').value;
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        event.preventDefault();
    }
    // Add more client-side validation as needed
});

test('Form submission with email address without top-level domain', () => {
    const event = { preventDefault: jest.fn() };
    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.value = 'invalid@email';
    document.body.appendChild(emailInput);

    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', event.preventDefault);

    form.dispatchEvent(new Event('submit'));

    expect(event.preventDefault).not.toHaveBeenCalled();
});