import React, { useEffect, useRef, useState } from "react";

const PdfViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPDFScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.min.js";
      script.onload = loadPDF;
      document.body.appendChild(script);
    };

    const loadPDF = async () => {
      setLoading(true);
      try {
        const pdfjsLib = window["pdfjs-dist/build/pdf"];
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.min.js";

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        renderPage(1, pdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPDFScript();
  }, [pdfUrl]);

  const renderPage = async (pageNumber, pdf = pdfDoc) => {
    if (!pdf) return;
    setLoading(true);

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    underlineText(page, "Amrita", context, viewport);
    setLoading(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      renderPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      renderPage(currentPage + 1);
    }
  };


  const underlineText = async (page, text, context, viewport) => {
    const textContent = await page.getTextContent();
    textContent.items.forEach((item) => {
      if (item.str.includes(text)) {
        const transform = item.transform;
        const x = transform[4];
        const y = transform[5];

        context.strokeStyle = "red"; // Underline color
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x * viewport.scale, y * viewport.scale);
        context.lineTo((x + item.width) * viewport.scale, y * viewport.scale);
        context.stroke();
      }
    });
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <canvas ref={canvasRef} style={{ border: "1px solid black", width: "100%",height:"100%" }} />
    </div>
  );
};

export default PdfViewer;
