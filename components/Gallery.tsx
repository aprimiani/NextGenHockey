import React, { useState } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const { gallery, loading } = useLeagueData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ng-light-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          {t.gallery.title}
        </h2>
        <div className="mt-4 max-w-xs mx-auto h-1 bg-ng-light-blue rounded"></div>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          {t.gallery.subtitle}
        </p>
      </div>

      {gallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {gallery.map((image) => (
            <div 
              key={image.id} 
              className="relative group aspect-square bg-ng-blue/30 rounded-xl overflow-hidden border border-gray-700 cursor-pointer shadow-lg hover:border-ng-light-blue/50 transition-all duration-300"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.caption || 'Hockey action'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white" size={32} />
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-ng-blue/10 rounded-3xl border border-dashed border-gray-700">
          <p className="text-gray-500 font-bold uppercase tracking-widest">{t.gallery.noImages}</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-ng-light-blue transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Full size action" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;