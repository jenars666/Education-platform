-- Migration: Add 'not_reachable' status to enrollments table
-- Run this in the Supabase SQL Editor to update the existing constraint

-- Step 1: Drop the old constraint
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_status_check;

-- Step 2: Add the new constraint with 'not_reachable' included
ALTER TABLE public.enrollments 
  ADD CONSTRAINT enrollments_status_check 
  CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'not_reachable'));
