-- ===== PUBLIC READ POLICIES =====
CREATE POLICY "public_read_tour_images" ON storage.objects
FOR SELECT USING (bucket_id = 'tour-images');

CREATE POLICY "public_read_guide_images" ON storage.objects
FOR SELECT USING (bucket_id = 'guide-images');

CREATE POLICY "public_read_credential_images" ON storage.objects
FOR SELECT USING (bucket_id = 'credential-images');

-- ===== ADMIN WRITE POLICIES =====
CREATE POLICY "admin_insert_tour" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'tour-images');

CREATE POLICY "admin_insert_guide" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'guide-images');

CREATE POLICY "admin_insert_credential" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'credential-images');

-- ===== DELETE POLICIES =====
CREATE POLICY "admin_delete_tour" ON storage.objects
FOR DELETE USING (bucket_id = 'tour-images');

CREATE POLICY "admin_delete_guide" ON storage.objects
FOR DELETE USING (bucket_id = 'guide-images');

CREATE POLICY "admin_delete_credential" ON storage.objects
FOR DELETE USING (bucket_id = 'credential-images');