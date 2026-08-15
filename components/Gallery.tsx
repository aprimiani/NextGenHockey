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
      <div className="mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
          {t.gallery.title}
        </h2>
        <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-2xl pl-8 border-l-8 border-transparent">
          {t.gallery.subtitle}
        </p>
      </div>

      {gallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {gallery.map((image) => (
            <div 
              key={image.id} 
              className="relative group aspect-square bg-ng-blue/30 rounded-2xl overflow-hidden border border-gray-700/80 cursor-pointer shadow-lg hover:border-ng-light-blue/60 hover:shadow-xl hover:shadow-ng-light-blue/10 transition-all duration-300"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.caption || 'Hockey action'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-ng-navy/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-ng-light-blue/20 rounded-full border border-ng-light-blue/40 text-ng-light-blue">
                  <Maximize2 size={24} />
                </div>
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-black uppercase tracking-widest leading-tight">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-ng-blue/20 rounded-3xl border border-dashed border-gray-700">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{t.gallery.noImages}</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-gray-300 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <X size={28} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Full size action" 
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;