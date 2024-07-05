
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mapdbsccautrydobqxvs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcGRic2NjYXV0cnlkb2JxeHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MzI4OTIsImV4cCI6MjAzMDMwODg5Mn0.6DVrJ_6Zz9C2gHk4w-xxTyzvLZ1BnhLrZ2kGL0DmAcI'
// const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)