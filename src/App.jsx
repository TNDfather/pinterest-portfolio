import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MasonryGrid from './components/MasonryGrid';
import PinCard from './components/PinCard';
import PinModal from './components/PinModal';
import PdfModal from './components/PdfModal';
import CreateModal from './components/CreateModal';
import { fetchSheetData, normalizeData, submitSheetData } from './services/SheetService';

// Fallback dummy data if sheet fails or is empty
const DUMMY_PINS = Array.from({ length: 10 }).map((_, i) => ({
  id: `dummy-${i}`,
  title: `Example Item ${i + 1}`,
  description: `This is a placeholder. Please configure the Google Sheet URL.`,
  image: `https://picsum.photos/seed/${i + 1}/800/1200`, // High res for modal
  thumbnail: `https://picsum.photos/seed/${i + 1}/400/${Math.floor(Math.random() * (600 - 300 + 1) + 300)}`, // Low res for grid
  author: `System`,
  part: `AI`,
}));

// TODO: Replace with your actual Google Drive PDF preview link
// Format: https://drive.google.com/file/d/[FILE_ID]/preview
const PROFILE_PDF_URL = 'https://drive.google.com/file/d/0B_NheelsJXSnbVB3eC0yclBHTVE/preview?resourcekey=0-oJXVSx496I9xdlhBS1DfvA';

function App() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [filterCompany, setFilterCompany] = useState(null);
  const [filterPart, setFilterPart] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch data from Google Sheet
        const rawData = await fetchSheetData();

        if (rawData && rawData.length > 0) {
          setPins(normalizeData(rawData));
        } else {
          console.warn("No data found in sheet, using dummy data.");
          setPins(DUMMY_PINS);
        }

      } catch (err) {
        console.error("Failed to load sheet data:", err);
        setError(err);
        setPins(DUMMY_PINS); // Fallback
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreatePin = async (newPinData) => {
    // Optimistic update
    const newPin = {
      id: `new-${Date.now()}`,
      ...newPinData
    };
    setPins(prevPins => [newPin, ...prevPins]);

    try {
      await submitSheetData(newPinData);
      console.log('Pin submitted to Google Sheet');
      // Optionally reload data here to get the real ID from the sheet
    } catch (err) {
      console.error('Failed to submit pin:', err);
      alert('Failed to save to Google Sheet. Please check console.');
    }
  };

  const filteredPins = pins.filter(pin => {
    const matchCompany = filterCompany ? pin.author && pin.author.toLowerCase().includes(filterCompany.toLowerCase()) : true;
    const matchPart = filterPart ? pin.part && pin.part.toLowerCase().includes(filterPart.toLowerCase()) : true;

    const query = searchQuery.toLowerCase();
    const matchSearch = searchQuery
      ? (pin.title && pin.title.toLowerCase().includes(query)) ||
      (pin.description && pin.description.toLowerCase().includes(query)) ||
      (pin.author && pin.author.toLowerCase().includes(query)) ||
      (pin.part && pin.part.toLowerCase().includes(query))
      : true;

    return matchCompany && matchPart && matchSearch;
  });

  return (
    <div>
      <Header
        onFilter={setFilterCompany}
        onPartFilter={setFilterPart}
        onProfileClick={() => setShowPdfModal(true)}
        onCreateClick={() => setShowCreateModal(true)}
        onSearch={setSearchQuery}
      />
      <main className="main-content">
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
        {error && <div style={{ textAlign: 'center', color: 'red', padding: '10px' }}>Note: Using placeholder data (Sheet load failed)</div>}

        {!loading && (
          <MasonryGrid>
            {filteredPins.map((pin) => (
              <PinCard
                key={pin.id}
                image={pin.thumbnail} // Use thumbnail for grid view
                title={pin.title}
                description={pin.description}
                author={pin.author}
                onClick={() => setSelectedPin(pin)}
              />
            ))}
          </MasonryGrid>
        )}
      </main>

      {selectedPin && (
        <PinModal
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onNext={() => {
            const currentIndex = pins.findIndex(p => p.id === selectedPin.id);
            const nextIndex = (currentIndex + 1) % pins.length;
            setSelectedPin(pins[nextIndex]);
          }}
          onPrev={() => {
            const currentIndex = pins.findIndex(p => p.id === selectedPin.id);
            const prevIndex = (currentIndex - 1 + pins.length) % pins.length;
            setSelectedPin(pins[prevIndex]);
          }}
        />
      )}

      {showPdfModal && (
        <PdfModal
          pdfUrl={PROFILE_PDF_URL}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {showCreateModal && (
        <CreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePin}
        />
      )}
    </div>
  );
}

export default App;
