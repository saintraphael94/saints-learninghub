
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can view enrollments" ON public.enrollments;
CREATE POLICY "Admins can view all enrollments"
  ON public.enrollments
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can submit enrollment" ON public.enrollments;
CREATE POLICY "Anyone can submit enrollment"
  ON public.enrollments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (payment_status = 'Not Paid');

DROP POLICY IF EXISTS "Payment proofs are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload payment proofs" ON storage.objects;

CREATE POLICY "Admins can view payment proofs"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'payment-proofs'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Authenticated users can upload payment proofs"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs');
