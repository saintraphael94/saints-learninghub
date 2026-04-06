-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);

INSERT INTO public.courses (name, icon, description) VALUES
  ('Slide Design with Microsoft PowerPoint', 'presentation', 'Master professional slide design and presentation techniques'),
  ('Data Analytics with Microsoft Excel', 'table', 'Learn data analysis, formulas, pivot tables, and dashboards'),
  ('Vector Graphics with Adobe Illustrator', 'pen-tool', 'Create stunning vector illustrations and brand assets'),
  ('Vector Graphics with CorelDRAW', 'shapes', 'Professional vector design with CorelDRAW suite'),
  ('Content Authoring with Microsoft Word', 'file-text', 'Advanced document formatting, templates, and publishing');

-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  selected_courses TEXT[] NOT NULL,
  learning_mode TEXT NOT NULL,
  cohort_start_date TEXT,
  skill_level TEXT NOT NULL,
  occupation TEXT,
  prior_experience TEXT,
  primary_goal TEXT NOT NULL,
  achievement_goal TEXT,
  has_laptop BOOLEAN NOT NULL DEFAULT false,
  internet_strength TEXT NOT NULL,
  software_access TEXT[],
  payment_status TEXT NOT NULL DEFAULT 'Not Paid',
  payment_method TEXT,
  proof_of_payment_url TEXT,
  communication_channel TEXT NOT NULL,
  referral_source TEXT,
  consent_updates BOOLEAN NOT NULL DEFAULT false,
  consent_requirements BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enrollment" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view enrollments" ON public.enrollments FOR SELECT TO authenticated USING (true);

-- Storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', true);
CREATE POLICY "Anyone can upload payment proofs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');
CREATE POLICY "Payment proofs are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'payment-proofs');

-- Admin role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;