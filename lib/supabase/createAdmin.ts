import { adminSupabase } from './admin';

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;

  console.log(`Setting up Admin User: ${email}...`);

  const { data, error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('✅ Admin user created successfully.');
  }
}

createAdmin();
