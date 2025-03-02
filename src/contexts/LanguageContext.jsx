import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const translations = {
  id: {
    search: "Cari catatan",
    archive: "Arsip",
    noNotes: "Tidak ada catatan",
    noArchivedNotes: "Tidak ada catatan diarsipkan",
    login: "Masuk",
    register: "Daftar",
    name: "Nama",
    email: "Email",
    password: "Password",
    confirmPassword: "Konfirmasi Password",
    loginAccount: "Masuk Akun",
    registerAccount: "Daftar Akun",
    noAccount: "Belum punya akun?",
    haveAccount: "Sudah punya akun?",
    registerHere: "Daftar disini",
    loginHere: "Masuk disini",
    loading: "Memuat...",
    noteList: "Daftar Catatan",
    archived: "Diarsipkan",
    inArchive: "Pesan dalam arsip",
    logout: "Keluar",
    save: "Simpan",
    back: "Kembali",
    delete: "Hapus",
    noteTitle: "Judul catatan",
    writeNote: "Tulis catatan...",
    remaining: "tersisa",
    characters: "karakter",
  },
  en: {
    search: "Search notes",
    archive: "Archive",
    noNotes: "No notes",
    noArchivedNotes: "No archived notes",
    login: "Login",
    register: "Register",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginAccount: "Login Account",
    registerAccount: "Register Account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerHere: "Register here",
    loginHere: "Login here",
    loading: "Loading...",
    noteList: "Note List",
    archived: "Archived",
    inArchive: "Message in archive",
    logout: "Logout",
    save: "Save",
    back: "Back",
    delete: "Delete",
    noteTitle: "Note title",
    writeNote: "Write a note...",
    remaining: "remaining",
    characters: "characters",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (key) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
