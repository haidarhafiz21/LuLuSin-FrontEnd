import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const GuruKategori = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        console.log("Starting fetch subjects...");
        console.log("Base URL:", axiosInstance.defaults.baseURL);
        console.log("Full URL:", `${axiosInstance.defaults.baseURL}/API/teacher/subjectcategory`);
        
        const response = await axiosInstance.get("/API/teacher/subjectcategory");
        console.log("Full API Response:", response);
        
        if (response.data.dataSubjectCategory) {
          console.log("Subjects data:", response.data.dataSubjectCategory);
          setSubjects(response.data.dataSubjectCategory);
          setError(null);
        } else {
          console.error("API returned unexpected structure:", response.data);
          setError("Gagal memuat data subjek: Format data tidak sesuai");
        }
      } catch (err) {
        console.error("Detailed error information:", {
          message: err.message,
          response: err.response,
          config: err.config,
          stack: err.stack
        });
        
        if (err.response) {
          console.error("Server response:", {
            status: err.response.status,
            statusText: err.response.statusText,
            data: err.response.data,
            headers: err.response.headers
          });
          setError(err.response.data?.message || `Error ${err.response.status}: Gagal memuat data subjek`);
        } else if (err.request) {
          console.error("No response received:", err.request);
          setError("Tidak ada respon dari server. Periksa koneksi internet Anda atau pastikan server berjalan.");
        } else {
          console.error("Request setup error:", err);
          setError(err.message || "Terjadi kesalahan saat memuat data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      setError("Nama subjek tidak boleh kosong");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/API/teacher/subjectcategory/create", {
        name: newSubject
      });

      if (response.data.success) {
        setSubjects([...subjects, response.data.data]);
        setNewSubject("");
        navigate("/guru/kategorisubjek");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan subjek");
      console.error("Add error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE7]">
      {/* Konten */}
      <div className="flex-grow p-10">
        <h1 className="text-2xl font-bold text-[#213555] mb-6">Subjek UTBK SNBT 2025</h1>

        {/* Form Tambah Kategori */}
        <div className="flex justify-end mb-4 gap-2">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Masukkan nama subjek baru"
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#213555]"
          />
          <button
            onClick={handleAddSubject}
            disabled={loading}
            className="bg-[#213555] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            <FaPlus /> {loading ? "Menambahkan..." : "Tambah Kategori Subjek"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Tabel */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">Memuat data...</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#3E5879] text-white text-left">
                  <th className="px-4 py-3 w-16">No</th>
                  <th className="px-4 py-3">Subjek</th>
                  <th className="px-4 py-3 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[#213555]">
                {subjects.map((subject, index) => (
                  <tr key={subject.subject_category_id || index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{subject.subject_category_name}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button className="text-[#213555] hover:text-blue-500 transition bg-transparent">
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button className="text-[#213555] hover:text-red-500 transition bg-transparent">
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuruKategori;
