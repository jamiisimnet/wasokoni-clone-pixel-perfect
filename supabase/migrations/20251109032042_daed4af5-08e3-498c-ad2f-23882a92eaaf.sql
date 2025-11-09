-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'partner', 'customer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Update partners table RLS to allow admins to view all
CREATE POLICY "Admins can view all partners"
ON public.partners
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update referrals table RLS to allow admins to view all
CREATE POLICY "Admins can view all referrals"
ON public.referrals
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update payouts table RLS to allow admins to view and update all
CREATE POLICY "Admins can view all payouts"
ON public.payouts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert payouts"
ON public.payouts
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payouts"
ON public.payouts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Update partners table to allow admins to update
CREATE POLICY "Admins can update partners"
ON public.partners
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));