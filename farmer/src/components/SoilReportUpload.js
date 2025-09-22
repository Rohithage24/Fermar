import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Import your language context

function SoilReportUpload() {
  const { translations } = useLanguage(); // Get current language translations
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert(translations.invalidImage || "Please upload a valid image (JPG, PNG).");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      alert(`${translations.submitButton} "${file.name}" ${translations.uploaded || "uploaded successfully!"}`);
      
      // Hide image preview after 5 seconds
      setTimeout(() => {
        setPreview(null);
        setFile(null);
      }, 5000);
    } else {
      alert(translations.selectImage || "Please select an image before submitting.");
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1b4332, #081c15)",
        padding: "40px 20px",
        textAlign: "center",
        color: "#f1f1f1",
        borderTop: "4px solid #a7c957",
        borderBottom: "4px solid #a7c957",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "15px", color: "#fefae0" }}>
        {translations.soilUploadTitle}
      </h2>
      <p style={{ marginBottom: "20px", fontSize: "16px", color: "#e9edc9" }}>
        {translations.soilUploadText}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#2d6a4f",
          display: "inline-block",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            marginBottom: "15px",
            padding: "8px",
            background: "#fefae0",
            border: "2px solid #a7c957",
            borderRadius: "6px",
            color: "#333",
          }}
        />
        <br />
        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt={translations.previewAlt || "Soil Report Preview"}
              style={{
                maxWidth: "250px",
                borderRadius: "8px",
                border: "2px solid #a7c957",
              }}
            />
          </div>
        )}
        <button
          type="submit"
          style={{
            background: "#a7c957",
            color: "#081c15",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {translations.submitButton}
        </button>
      </form>
    </section>
  );
}

export default SoilReportUpload;
