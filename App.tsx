import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, Sparkles, ChevronDown, Gift } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import UserForm from './components/UserForm';
import TemplateCard from './components/TemplateCard';
import CardPreview from './components/CardPreview';
import { templates } from './templates';
import { UserData } from './types';

function App() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    imageUrl: null,
    selectedTemplate: 1,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === userData.selectedTemplate) || templates[0];

  const handleDownload = async () => {
    const element = document.getElementById('card-preview');
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `acode-birthday-${userData.name || 'card'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const element = document.getElementById('card-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'acode-birthday.png', { type: 'image/png' });

          if (navigator.share && navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: 'Acode Birthday Celebration',
              text: `Happy Birthday ${userData.name}! 🎉`,
            });
          } else {
            const whatsappText = encodeURIComponent(`Happy Birthday ${userData.name}! 🎉 From Acode Team`);
            window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
          }
        }
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen">
        <header className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Acode Birthday Creator</h1>
                  <p className="text-sm text-gray-300">Create stunning birthday wishes</p>
                </div>
              </div>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-white drop-shadow-lg">
                Create Your Perfect Birthday Card
              </h2>
              <p className="text-xl text-gray-300">
                Choose a template, add your name and photo, then share your celebration!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    Your Information
                  </h3>
                  <UserForm
                    userName={userData.name}
                    onNameChange={(name) => setUserData({ ...userData, name })}
                    onImageChange={(imageUrl) => setUserData({ ...userData, imageUrl })}
                  />
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="w-full flex items-center justify-between text-2xl font-bold text-white mb-6"
                  >
                    <span className="flex items-center gap-2">
                      <Gift className="w-6 h-6 text-pink-400" />
                      Choose Template ({userData.selectedTemplate}/15)
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${showTemplates ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {showTemplates && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {templates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          isSelected={userData.selectedTemplate === template.id}
                          onSelect={() => setUserData({ ...userData, selectedTemplate: template.id })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <CardPreview
                  template={selectedTemplate}
                  userName={userData.name}
                  userImage={userData.imageUrl}
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading || !userData.name}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    {isDownloading ? 'Downloading...' : 'Download Card'}
                  </button>

                  <button
                    onClick={handleShare}
                    disabled={!userData.name}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
                  >
                    <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Share on WhatsApp
                  </button>
                </div>

                {!userData.name && (
                  <p className="text-center text-yellow-400 text-sm animate-pulse">
                    Please enter your name to enable download and share
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Enter Your Info</h4>
                  <p className="text-gray-300">Add your name and upload your photo</p>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Choose Template</h4>
                  <p className="text-gray-300">Select from 15 premium designs</p>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-pink-500/30 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Download & Share</h4>
                  <p className="text-gray-300">Save or share on WhatsApp instantly</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md border-t border-white/10 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-300">
              Made with love for{' '}
              <span className="text-blue-400 font-bold">Acode - Code Editor</span> Community
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Create beautiful birthday wishes in seconds
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default App;
