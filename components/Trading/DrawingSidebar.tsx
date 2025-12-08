import { X, ChevronRight, Trash2 } from 'lucide-react';

interface DrawingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawingTools = [
  { id: 'arc', label: 'Arc', hasSubmenu: true },
  { id: 'cross-line', label: 'Cross Line', hasSubmenu: true },
  { id: 'curve', label: 'Curve', hasSubmenu: true },
  { id: 'cyclic-lines', label: 'Cyclic Lines', hasSubmenu: true },
  { id: 'date-range', label: 'Date Range', hasSubmenu: true },
  { id: 'date-price-range', label: 'Date and Price Range', hasSubmenu: true },
  { id: 'disjoint-channel', label: 'Disjoint Channel', hasSubmenu: true },
  { id: 'extended-line', label: 'Extended Line', hasSubmenu: true },
  { id: 'fibonacci-fan', label: 'Fibonacci Fan', hasSubmenu: true },
  { id: 'fibonacci-retracement', label: 'Fibonacci Retracement', hasSubmenu: true },
  { id: 'flat-top-bottom', label: 'Flat Top/Bottom', hasSubmenu: true },
  { id: 'gann-box', label: 'Gann Box', hasSubmenu: true },
  { id: 'horizontal-line', label: 'Horizontal line', hasSubmenu: true },
  { id: 'parallel-channel', label: 'Parallel Channel', hasSubmenu: true },
  { id: 'pitchfan', label: 'Pitchfan', hasSubmenu: true },
  { id: 'pitchfork', label: 'Pitchfork', hasSubmenu: true },
  { id: 'price-range', label: 'Price Range', hasSubmenu: true },
  { id: 'ray', label: 'Ray', hasSubmenu: true },
  { id: 'rectangle', label: 'Rectangle', hasSubmenu: true },
];

const DrawingSidebar = ({ isOpen, onClose }: DrawingSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#101729] z-40 lg:hidden"
        onClick={onClose}
      />
      <aside 
        className="fixed top-0 left-[70px] h-full z-50 w-[220px] bg-[#101729] border-r border-[#2a3040] flex flex-col animate-slide-in"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Drawings</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="px-4 py-2">
          <span className="text-[10px] font-semibold text-muted-foreground tracking-wider">DRAWINGS</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {drawingTools.map((tool) => (
            <button
              key={tool.id}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-accent transition-colors group"
            >
              <span className="text-sm text-foreground">{tool.label}</span>
              {tool.hasSubmenu && (
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors">
            <Trash2 size={16} />
            <span className="text-sm font-medium">Delete all</span>
          </button>
        </div>
      </aside>
    </>
  );
};


export default DrawingSidebar;