import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: ''
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
      setError('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama) {
      setError('Nama harus diisi');
      return;
    }

    setModalState({
      isOpen: true,
      title: 'Konfirmasi Tambah User',
      message: `Tambahkan user ${formData.nama}?`,
      onConfirm: () => confirmAddUser()
    });
  };

  const confirmAddUser = async () => {
    try {
      console.log('Sending data:', formData);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (res.ok) {
        setFormData({ nama: '' });
        setError('');
        fetchUsers();
      } else {
        setError(data.error || 'Gagal menambahkan user');
      }
    } catch (e) {
      console.error('Error:', e);
      setError('Gagal menambahkan user: ' + e.message);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const handleDelete = (userId, userName) => {
    setModalState({
      isOpen: true,
      title: 'Konfirmasi Hapus',
      message: `Hapus user ${userName}? Aksi ini tidak dapat dibatalkan.`,
      onConfirm: () => confirmDelete(userId)
    });
  };

  const confirmDelete = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <div className="manage-page">
      <Navbar />
      <div className="manage-body">
        <h1 className="manage-title">Manajemen User</h1>
        
        <div className="manage-content">
          <div className="manage-form-card">
          <h2 className="form-title">Tambah User Baru</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="nama">Nama Lengkap</label>
              <input
                id="nama"
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="btn-submit">Tambah User</button>
          </form>
        </div>

        <div className="manage-list-card">
          <h2 className="list-title">Daftar User</h2>
          {loading && <div className="loading-text">Memuat data...</div>}
          {!loading && users.length === 0 && (
            <div className="empty-text">Belum ada user terdaftar.</div>
          )}
          {!loading && users.length > 0 && (
            <div className="user-list">
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <div className="user-name">{user.nama}</div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.id, user.nama)}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
        onCancel={() => setModalState({ ...modalState, isOpen: false })}
      />
    </div>
  );
}

export default ManageUsers;
