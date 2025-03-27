import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujrouzcdanfkdaawduml.supabase.co'; // Reemplaza con tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqcm91emNkYW5ma2RhYXdkdW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTEwNDYsImV4cCI6MjA1ODY2NzA0Nn0.O2NrFgtNtbIbFFTPqOTOX_GPUnWvpYAMNOjVxE37vmk'; // Reemplaza con tu clave
export const supabase = createClient(supabaseUrl, supabaseKey);