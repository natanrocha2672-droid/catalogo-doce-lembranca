import React, { useState, useMemo } from 'react';
import { ShoppingCart, Info, X, ChevronRight, Heart, Menu } from 'lucide-react';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 3l-1.4 5.4L21 11.5z" />
  </svg>
);

const PRODUCTS = [
  {
    id: 1,
    name: "Flor de Limpador de Cachimbo (Rosa)",
    price: 35.00,
    category: "Flores",
    image: "Gemini_Generated_Image_8hpgo78hpgo78hpg.png",
    description: "Delicada flor artesanal em tons de rosa vibrante, com centro amarelo e folhas verdes, montada em um vaso de cerâmica branca com selo 'Feliz Dia das Mães'."
  },
  {
    id: 2,
    name: "Buquê de Rosas de Cetim Premium",
    price: 120.00,
    category: "Buquês",
    image: "Gemini_Generated_Image_hb7kunhb7kunhb7k.png",
    description: "Luxuoso buquê de rosas de cetim vermelhas, decorado com uma borboleta dourada brilhante e embalagem elegante com estampa de corações."
  },
  {
    id: 3,
    name: "Cesta de Café 'Envelope Luxo'",
    price: 85.00,
    category: "Cestas",
    image: "Gemini_Generated_Image_xk49bxxk49bxxk49.png",
    description: "Caixa em formato de envelope com listras, contendo uma caneca rosa, snacks Bauducco, bombons Sonho de Valsa e flores permanentes."
  },
  {
    id: 4,
    name: "Orquídea Roxa de Limpador",
    price: 45.00,
    category: "Flores",
    image: "Gemini_Generated_Image_fruslnfruslnfrus.png",
    description: "Orquídea detalhada feita à mão, apresentada em um vaso branco texturizado. Acompanha embalagem transparente com laço de cetim roxo."
  },
  {
    id: 5,
    name: "Vaso de Girassóis Artesanais",
    price: 50.00,
    category: "Flores",
    image: "Screenshot 2026-05-05 064550.png",
    description: "Trio de girassóis vibrantes feitos à mão, simbolizando alegria e gratidão. Ideais para iluminar o dia de alguém especial."
  },
  {
    id: 6,
    name: "Combo Coração Ouro Branco",
    price: 150.00,
    category: "Combos",
    image: "Gemini_Generated_Image_dgpnnxdgpnnxdgpn.png",
    description: "O presente completo: Buquê de rosas, caixa de chocolates Ouro Branco em formato de coração e uma mensagem personalizada de carinho."
  }
];

const CATEGORIES = ["Todos", "Flores", "Buquês", "Cestas", "Combos"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const formatPrice = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const sendWhatsApp = () => {
    const message = `Olá! Gostaria de fazer um pedido na Doce Lembrança:\n\n${cart.map(item => `- ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`).join('\n')}\n\n*Total: ${formatPrice(cartTotal)}*`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5500000000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Heart size={22} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold text-rose-600 tracking-tight">Doce Lembrança</h1>
          </div>

          <div className="hidden md:flex gap-8 font-medium text-gray-500">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`hover:text-rose-500 transition-colors relative py-1 ${activeCategory === cat ? 'text-rose-600' : ''}`}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 rounded-full"></span>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <header className="relative bg-white py-16 px-4 overflow-hidden border-b border-rose-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest">
              <Heart size={14} fill="currentColor" /> Feito à Mão com Amor
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1]">
              Crie memórias com uma <span className="text-rose-500 italic">Doce Lembrança</span>.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl">
              Nossa coleção exclusiva de artesanatos foi pensada para transformar gestos simples em momentos inesquecíveis.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold shadow-xl shadow-rose-100 transition-all transform hover:-translate-y-1"
              >
                Explorar Catálogo
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg">
            <div className="absolute inset-0 bg-rose-200 rounded-full blur-3xl opacity-20 -z-10"></div>
            <img 
              src="Gemini_Generated_Image_dgpnnxdgpnnxdgpn.png" 
              alt="Coleção Doce Lembrança" 
              className="rounded-[2.5rem] shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-all duration-700 w-full"
            />
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 p-4 space-y-1">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`block w-full text-left py-3 px-4 rounded-xl font-semibold ${activeCategory === cat ? 'bg-rose-50 text-rose-600' : 'text-gray-600'}`}
              onClick={() => { setActiveCategory(cat); setIsMobileMenuOpen(false); }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <main id="products" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <div>
            <h3 className="text-3xl font-black text-gray-900 mb-2">Coleção Especial</h3>
            <p className="text-gray-500 font-medium">Exibindo <span className="text-rose-500">{activeCategory}</span></p>
          </div>
          <div className="hidden md:flex bg-white p-1.5 rounded-2xl shadow-sm border border-rose-50">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400 hover:text-rose-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-rose-50 group flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-rose-50/30">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-rose-600 uppercase tracking-widest shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">{product.name}</h4>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A partir de</span>
                    <span className="text-2xl font-black text-gray-900">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-stone-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all"
                    >
                      <Info size={20} />
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-100 transition-all active:scale-90"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">Seu Pedido</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={40} className="text-rose-200" />
                  </div>
                  <p className="text-gray-400 font-bold">Nenhum mimo adicionado ainda.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 leading-tight">{item.name}</h5>
                      <p className="text-rose-500 font-black mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all">-</button>
                        <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-rose-500 p-2">
                      <X size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t bg-rose-50/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-rose-600">{formatPrice(cartTotal)}</span>
                </div>
                <button 
                  onClick={sendWhatsApp}
                  className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-[1.25rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-green-100 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  <WhatsAppIcon size={24} /> Confirmar pelo WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-all"
            >
              <X size={20} />
            </button>
            <div className="md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-block bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">
                {selectedProduct.category}
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-6">{selectedProduct.name}</h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-10">
                {selectedProduct.description}
              </p>
              <div className="flex items-baseline gap-4 mb-10">
                <div className="text-4xl font-black text-rose-600">{formatPrice(selectedProduct.price)}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Unidade</div>
              </div>
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={22} /> Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-rose-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
                <Heart size={18} fill="currentColor" />
              </div>
              <h1 className="text-xl font-black text-gray-900">Doce Lembrança</h1>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">Artesanato com alma e mimos personalizados para tornar cada presente uma memória eterna.</p>
          </div>
          <div>
            <h5 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Produtos</h5>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              {CATEGORIES.slice(1).map(c => <li key={c} className="hover:text-rose-500 cursor-pointer transition-colors" onClick={() => setActiveCategory(c)}>{c}</li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Informações</h5>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li className="hover:text-rose-500 cursor-pointer transition-colors">Como Encomendar</li>
              <li className="hover:text-rose-500 cursor-pointer transition-colors">Prazos de Produção</li>
              <li className="hover:text-rose-500 cursor-pointer transition-colors">Dúvidas Frequentes</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Social</h5>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                <WhatsAppIcon size={20} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-rose-50 pt-10 text-center">
          <p className="text-gray-300 text-xs font-black uppercase tracking-widest">&copy; 2024 Doce Lembrança &bull; Artesanatos Exclusivos</p>
        </div>
      </footer>

      {cart.length > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl shadow-2xl flex items-center justify-between px-6 transform transition-all active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="bg-rose-500 p-2 rounded-lg text-white">
                <ShoppingCart size={20} />
              </div>
              <span className="font-black">{cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'Item' : 'Itens'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-rose-400">{formatPrice(cartTotal)}</span>
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
