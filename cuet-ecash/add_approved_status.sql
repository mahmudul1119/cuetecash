-- Add APPROVED status to payment_status enum
-- This script updates the payment table to include the new APPROVED status

ALTER TABLE payment 
MODIFY COLUMN payment_status ENUM('PENDING', 'APPROVED', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING';

-- Update the default value to PENDING since new payments should start as pending
-- and be approved by admin before being marked as COMPLETED