// Script untuk update password admin/teknisi
// Jalankan dengan: node update-password.js

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'app.db');

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

async function updateAdminPassword(username, newPassword) {
  const db = new sqlite3.Database(DB_PATH);
  try {
    const passwordHash = bcrypt.hashSync(newPassword, 12);
    const timestamp = Math.floor(Date.now() / 1000);
    
    await run(db, 
      'UPDATE admins SET password_hash = ?, password_changed_at = ? WHERE username = ?', 
      [passwordHash, timestamp, username]
    );
    
    console.log(`✅ Password admin "${username}" berhasil diupdate!`);
    console.log(`✅ Timestamp: ${timestamp} (${new Date(timestamp * 1000).toLocaleString()})`);
    console.log('✅ Semua user dengan token lama akan auto logout!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    db.close();
  }
}

async function updateTeknisiPassword(username, newPassword) {
  const db = new sqlite3.Database(DB_PATH);
  try {
    const passwordHash = bcrypt.hashSync(newPassword, 12);
    const timestamp = Math.floor(Date.now() / 1000);
    
    await run(db, 
      'UPDATE teknisi SET password_hash = ?, password_changed_at = ? WHERE username = ?', 
      [passwordHash, timestamp, username]
    );
    
    console.log(`✅ Password teknisi "${username}" berhasil diupdate!`);
    console.log(`✅ Timestamp: ${timestamp} (${new Date(timestamp * 1000).toLocaleString()})`);
    console.log('✅ Semua user dengan token lama akan auto logout!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    db.close();
  }
}

// JALANKAN: Ubah username dan password sesuai kebutuhan
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('');
  console.log('📝 CARA PAKAI:');
  console.log('  node update-password.js <role> <username> <password>');
  console.log('');
  console.log('📌 CONTOH:');
  console.log('  node update-password.js admin admin NewPassword123!');
  console.log('  node update-password.js teknisi teknisi NewPassword456!');
  console.log('');
  process.exit(1);
}

const [role, username, password] = args;

if (role === 'admin') {
  updateAdminPassword(username, password);
} else if (role === 'teknisi') {
  updateTeknisiPassword(username, password);
} else {
  console.error('❌ Role harus "admin" atau "teknisi"');
  process.exit(1);
}
