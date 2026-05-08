
-- Create public bucket for product PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-pdfs', 'product-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public read product pdfs"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-pdfs');

-- Allow anonymous upload/update/delete (admin auth is client-side password)
CREATE POLICY "Anyone can upload product pdfs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-pdfs');

CREATE POLICY "Anyone can update product pdfs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-pdfs');

CREATE POLICY "Anyone can delete product pdfs"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-pdfs');
