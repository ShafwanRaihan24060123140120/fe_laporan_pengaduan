import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DetailLaporan.css';

function DetailLaporan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reportDetail = {
    namaPelapor: 'Shafwan Raihan',
    jenisPengaduan: 'Aset Rusak',
    namaBarang: 'Atap',
    tanggalKejadian: '25/08/24',
    unit: 'Shared Service & General Support',
    deskripsi: 'Atap bocor mas'
  };

  const handleComplete = () => {
    alert('Laporan diselesaikan');
    navigate('/laporan-aset');
  };

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus laporan ini?')) {
      navigate('/laporan-aset');
    }
  };

  return (
    <div className="detail-container">
      <Navbar />
      
      <div className="detail-content">
        <h2>Detail Laporan {id}</h2>
        
        <div className="detail-box">
          <div className="detail-row">
            <span className="label">Nama Pelapor :</span>
            <span className="value">{reportDetail.namaPelapor}</span>
          </div>
          <div className="detail-row">
            <span className="label">Jenis Pengaduan :</span>
            <span className="value">{reportDetail.jenisPengaduan}</span>
          </div>
          <div className="detail-row">
            <span className="label">Nama barang:</span>
            <span className="value">{reportDetail.namaBarang}</span>
          </div>
          <div className="detail-row">
            <span className="label">Tanggal Kejadian :</span>
            <span className="value">{reportDetail.tanggalKejadian}</span>
          </div>
          <div className="detail-row">
            <span className="label">Unit :</span>
            <span className="value">{reportDetail.unit}</span>
          </div>
          <div className="detail-row">
            <span className="label">Deskripsi:</span>
            <span className="value">{reportDetail.deskripsi}</span>
          </div>

          <div className="action-buttons">
            <button onClick={handleComplete} className="btn btn-success">
              Selesai
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailLaporan;
