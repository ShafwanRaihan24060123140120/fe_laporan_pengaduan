require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { 
  init, 
  getAdminByUsername, 
  getTeknisiByUsername,
  listReports, 
  getReportById, 
  deleteReport, 
  updateReportStatus,
  listUsers,
  createUser,
  deleteUser
} = require('./db');
const { authenticateToken, requireAdmin, requireAdminOrTeknisi } = require('./middleware/auth');
const { apiLimiter, loginLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('ERROR: JWT_SECRET must be set in .env file and be at least 32 characters long');
  process.exit(1);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration - only allow specific origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, environment: NODE_ENV });
});

// Login endpoint with strict rate limiting and validation
app.post('/api/login', 
  loginLimiter,
  [
    body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { username, password } = req.body;

    // Check admin first
    const admin = await getAdminByUsername(username);
    if (admin) {
      const match = await bcrypt.compare(password, admin.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { sub: username, role: 'admin' }, 
        JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRY || '2h' }
      );
      return res.json({ 
        token,
        user: { username, role: 'admin' }
      });
    }

    // Check teknisi
    const teknisi = await getTeknisiByUsername(username);
    if (teknisi) {
      const match = await bcrypt.compare(password, teknisi.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { sub: username, role: 'teknisi' }, 
        JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRY || '2h' }
      );
      return res.json({ 
        token,
        user: { username, role: 'teknisi' }
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});


// Protected route to get current user info
app.get('/api/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Reports API - Protected routes
app.get('/api/reports', authenticateToken, async (req, res) => {
  try {
    const { search } = req.query;
    let rows = await listReports();
    
    if (search) {
      const term = search.toLowerCase();
      rows = rows.filter(r => {
        const id = (r.id || '').toLowerCase();
        const namaPelapor = (r.email_pelapor || '').toLowerCase(); // now contains nama directly
        const namaBarang = (r.nama_barang || '').toLowerCase();
        const unit = (r.unit || '').toLowerCase();
        const deskripsi = (r.deskripsi || '').toLowerCase();
        const status = (r.status || '').toLowerCase();
        const tanggal = (r.tanggal || '').toLowerCase();
        
        return id.includes(term) || 
               namaPelapor.includes(term) || 
               namaBarang.includes(term) || 
               unit.includes(term) || 
               deskripsi.includes(term) || 
               status.includes(term) ||
               tanggal.includes(term);
      });
    }
    
    res.json(rows);
  } catch (e) {
    console.error('List reports error:', e.message);
    res.status(500).json({ error: 'Failed to list reports' });
  }
});

app.get('/api/reports/:id', authenticateToken, async (req, res) => {
  try {
    const row = await getReportById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Report not found' });
    res.json(row);
  } catch (e) {
    console.error('Get report error:', e.message);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

app.delete('/api/reports/:id', authenticateToken, requireAdminOrTeknisi, async (req, res) => {
  try {
    await deleteReport(req.params.id);
    res.json({ ok: true, message: 'Report deleted successfully' });
  } catch (e) {
    console.error('Delete report error:', e.message);
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

app.put('/api/reports/:id/status', 
  authenticateToken, 
  requireAdminOrTeknisi,
  [
    body('status').isIn(['To-Do', 'In Progress', 'Done']).withMessage('Invalid status value')
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }
    
    const { status } = req.body;
    await updateReportStatus(req.params.id, status);
    res.json({ ok: true, message: 'Status updated successfully' });
  } catch (e) {
    console.error('Update status error:', e.message);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Dashboard summary API
app.get('/api/dashboard/summary', authenticateToken, async (req, res) => {
  try {
    const reports = await listReports();
    const totalReports = reports.length;
    const selesai = reports.filter(r => (r.status || '').toLowerCase().trim() === 'selesai').length;
    // Diproses = semua laporan yang belum selesai (apapun statusnya selain 'Selesai')
    const dalamProses = totalReports - selesai;

    const users = await listUsers();

    res.json({
      totalReports,
      selesai,
      dalamProses,
      totalUsersApproved: users.length,
      verifikasiPending: 0
    });
  } catch (e) {
    console.error('Dashboard summary error:', e.message);
    res.status(500).json({ error: 'Failed to get dashboard summary' });
  }
});

// Users Management API - Admin only
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const rows = await listUsers();
    res.json(rows);
  } catch (e) {
    console.error('List users error:', e.message);
    res.status(500).json({ error: 'Failed to list users' });
  }
});

app.post('/api/users', 
  authenticateToken, 
  requireAdmin,
  [
    body('nama').trim().isLength({ min: 3, max: 100 }).withMessage('Name must be 3-100 characters')
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { nama } = req.body;
    await createUser(nama);
    res.json({ ok: true, message: 'User created successfully' });
  } catch (e) {
    console.error('Create user error:', e.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.delete('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ ok: true, message: 'User deleted successfully' });
  } catch (e) {
    console.error('Delete user error:', e.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to init DB', err);
  process.exit(1);
});
