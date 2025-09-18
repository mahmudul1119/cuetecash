
        document.addEventListener('DOMContentLoaded', function() {
            const openModalBtn = document.getElementById('openPaymentModal');
            const closeModalBtn = document.getElementById('closePaymentModal');
            const cancelModalBtn = document.getElementById('cancelPaymentModal');
            const paymentModal = document.getElementById('paymentModal');
            const proceedToPaymentDetailsBtn = document.getElementById('proceedToPaymentDetails');

            const paymentDetailsModal = document.getElementById('paymentDetailsModal');
            const closePaymentDetailsModalBtn = document.getElementById('closePaymentDetailsModal');
            const cancelPaymentDetailsModalBtn = document.getElementById('cancelPaymentDetailsModal');
            const backToPaymentSetupBtn = document.getElementById('backToPaymentSetup');
            const verifyPaymentBtn = document.getElementById('verifyPaymentBtn'); // New button for payment status

            const paymentStatusModal = document.getElementById('paymentStatusModal'); // Payment Status Modal
            const closePaymentStatusModalBtn = document.getElementById('closePaymentStatusModal');
            const goToDashboardBtn = document.getElementById('goToDashboardBtn');

            const paymentOptionRadios = document.querySelectorAll('input[name="paymentOption"]');
            const paymentMethodButtons = document.querySelectorAll('.payment-method-button'); // Select all payment method buttons

            let selectedMethod = 'bKash'; // Default selected payment method
            let selectedAmount = 12200; // Default amount from "Both" option

            // Function to show a modal
            function showModal(modalElement) {
                modalElement.classList.remove('hidden');
                modalElement.classList.add('flex')
            }

            // Function to hide a modal
            function hideModal(modalElement) {
                modalElement.classList.add('hidden');
            }

            // Function to format amount with Bangladeshi Taka symbol
            function formatTaka(amount) {
                return `৳ ${amount.toLocaleString('en-IN')}`; // Using 'en-IN' for Indian numbering system which is common for Taka
            }

            // Event listener for opening the first modal
            if (openModalBtn) {
                openModalBtn.addEventListener('click', function() {
                    showModal(paymentModal);
                });
            }

            // Event listeners for closing the first modal
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', function() {
                    hideModal(paymentModal);
                });
            }
            if (cancelModalBtn) {
                cancelModalBtn.addEventListener('click', function() {
                    hideModal(paymentModal);
                });
            }
            // Optional: Close first modal when clicking outside of it
            if (paymentModal) {
                paymentModal.addEventListener('click', function(event) {
                    if (event.target === paymentModal) {
                        hideModal(paymentModal);
                    }
                });
            }

            // Event listener for proceeding to payment details
            if (proceedToPaymentDetailsBtn) {
                proceedToPaymentDetailsBtn.addEventListener('click', function() {
                    hideModal(paymentModal); // Hide the first modal

                    // Update dummy data in the payment details modal based on selection
                    document.getElementById('selectedPaymentMethodDisplay').textContent = `Payment Method: ${selectedMethod}`;
                    document.getElementById('paymentAmountDisplay').textContent = `Amount: ${formatTaka(selectedAmount)}`;
                    document.getElementById('amountInput').value = formatTaka(selectedAmount); // Update the readonly amount input

                    showModal(paymentDetailsModal); // Show the second modal
                });
            }

            // Event listeners for closing the second modal
            if (closePaymentDetailsModalBtn) {
                closePaymentDetailsModalBtn.addEventListener('click', function() {
                    hideModal(paymentDetailsModal);
                });
            }
            if (cancelPaymentDetailsModalBtn) {
                cancelPaymentDetailsModalBtn.addEventListener('click', function() {
                    hideModal(paymentDetailsModal);
                });
            }
            // Optional: Close second modal when clicking outside of it
            if (paymentDetailsModal) {
                paymentDetailsModal.addEventListener('click', function(event) {
                    if (event.target === paymentDetailsModal) {
                        hideModal(paymentDetailsModal);
                    }
                });
            }

            // Event listener for "Back" button in the second modal
            if (backToPaymentSetupBtn) {
                backToPaymentSetupBtn.addEventListener('click', function() {
                    hideModal(paymentDetailsModal); // Hide the second modal
                    showModal(paymentModal); // Show the first modal again
                });
            }

            // Event listener for "Verify Payment" button to show Payment Status Modal
            if (verifyPaymentBtn) {
                verifyPaymentBtn.addEventListener('click', function() {
                    hideModal(paymentDetailsModal); // Hide the payment details modal

                    // Update dummy data in the payment status modal
                    document.getElementById('transactionIdDisplay').textContent = `Transaction ID: TXN${Math.floor(Math.random() * 1000000000000)}`; // Dummy TXN ID
                    document.getElementById('amountPaidDisplay').textContent = `Amount Paid: ${formatTaka(selectedAmount)}`;
                    document.getElementById('paymentMethodStatusDisplay').textContent = `Payment Method: ${selectedMethod}`;

                    showModal(paymentStatusModal); // Show the payment status modal
                });
            }

            // Event listeners for closing the Payment Status Modal
            if (closePaymentStatusModalBtn) {
                closePaymentStatusModalBtn.addEventListener('click', function() {
                    hideModal(paymentStatusModal);
                });
            }
            if (goToDashboardBtn) {
                goToDashboardBtn.addEventListener('click', function() {
                    hideModal(paymentStatusModal);
                    // In a real application, you would navigate to the dashboard here.
                    // For now, it just hides the modal.
                });
            }
            // Optional: Close payment status modal when clicking outside of it
            if (paymentStatusModal) {
                paymentStatusModal.addEventListener('click', function(event) {
                    if (event.target === paymentStatusModal) {
                        hideModal(paymentStatusModal);
                    }
                });
            }


            // Event listeners for payment method buttons to update selectedMethod
            paymentMethodButtons.forEach(button => {
                button.addEventListener('click', function() {
                    selectedMethod = this.dataset.paymentMethod;
                    // Remove selected class from all buttons
                    paymentMethodButtons.forEach(btn => btn.classList.remove('payment-method-selected'));
                    // Add selected class to the clicked button
                    this.classList.add('payment-method-selected');
                });
            });

            // Event listeners for payment option radio buttons to update selectedAmount
            paymentOptionRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    selectedAmount = parseInt(this.dataset.amount);
                });
            });

            // Set initial selected method visual feedback on load
            const initialSelectedMethodButton = document.querySelector(`[data-payment-method="${selectedMethod}"]`);
            if (initialSelectedMethodButton) {
                initialSelectedMethodButton.classList.add('payment-method-selected');
            }
        });
