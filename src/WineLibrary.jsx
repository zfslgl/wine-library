import { useState, useMemo, useCallback, useRef, useEffect } from "react";

const INITIAL_LAYOUT = {
  "8B1": "BLUEBERRY", "8A1": "PASSION", "7B1": "NIGHTJAR", "7A1": "ICE",
  "6B1": "UNOAKED", "6A1": "MOSCATO", "5B1": "CAB ZIN", "5A1": "OVZ",
  "4B1": "PETITE", "4A1": "MERLOT", "3B1": "MALBEC", "3A1": "BARBERA",
  "2B1": "LUX RED", "2A1": "LUX RED", "1B1": "SEASONAL", "1A1": "SEASONAL",
  "8B2": "MANGO", "8A2": "MANGO", "7B2": "WHITE SANGRIA", "7A2": "WHITE SANGRIA",
  "6B2": "ROSÉ", "6A2": "RIESLING", "5B2": "SAUV BLANC", "5A2": "SAUV BLANC",
  "4B2": "CAB SAUV", "4A2": "CAB SAUV", "3B2": "ABRILLANTE", "3A2": "ABRILLANTE",
  "2B2": "LUX CAB", "2A2": "LUX CAB", "1B2": "CARRYOUT", "1A2": "CARRYOUT",
  "8B3": "SWEET", "8A3": "SWEET", "7B3": "RED SANGRIA", "7A3": "RED SANGRIA",
  "6B3": "G-WERTZ", "6A3": "G-WERTZ", "5B3": "PINOT GRIS", "5A3": "PINOT GRIS",
  "4B3": "VIN VEL", "4A3": "VIN VEL", "3B3": "CHMX", "3A3": "CHMX",
  "2B3": "LUX PINOT", "2A3": "LUX PINOT", "1B3": "CARRYOUT", "1A3": "CARRYOUT",
  "8B4": "ROMANCE", "8A4": "ROMANCE", "7B4": "STRAW RHU", "7A4": "STRAW RHU",
  "6B4": "VIVANTE", "6A4": "VIVANTE", "5B4": "CHARDONNAY", "5A4": "CHARDONNAY",
  "4B4": "CH RED", "4A4": "CH RED", "3B4": "TUSCAN", "3A4": "TUSCAN",
  "2B4": "LUX WHITE", "2A4": "LUX CHARD", "1B4": "TOP SHELVES", "1A4": "TOP SHELVES",
  "8B5": "CARES", "8A5": "CHOCOLATE", "7B5": "RASP SPK", "7A5": "TBD",
  "6B5": "BUBBLY ROSÉ", "6A5": "BUBBLY ROSÉ", "5B5": "CH WHITE", "5A5": "CH WHITE",
  "4B5": "PINOT NOIR", "4A5": "PINOT NOIR", "3B5": "TEMPRANILLO", "3A5": "SHIRAZ",
  "2B5": "CAMILLE", "2A5": "CAMILLE", "1B5": "SEASONAL", "1A5": "SEASONAL",
};

const WINE_LISTS = {
  RED: ["MERLOT","MALBEC","BARBERA","CAB SAUV","CAB ZIN","PETITE","PINOT NOIR","TEMPRANILLO","SHIRAZ","TUSCAN","CH RED","ABRILLANTE","VIN VEL","CHMX","OVZ"],
  WHITE: ["CHARDONNAY","SAUV BLANC","PINOT GRIS","RIESLING","G-WERTZ","MOSCATO","UNOAKED","CH WHITE","VIVANTE"],
  SWEET: ["SWEET","ROMANCE","BLUEBERRY","MANGO","PASSION","CHOCOLATE","CARES","ICE","NIGHTJAR","RED SANGRIA","WHITE SANGRIA","ROSÉ","BUBBLY ROSÉ"],
  SPARKLING: ["RASP SPK","STRAW RHU"],
  LUX: ["LUX RED","LUX CAB","LUX PINOT","LUX WHITE","LUX CHARD","CAMILLE"],
  OTHER: ["CARRYOUT","SEASONAL","TOP SHELVES","TBD"],
};

const THEMES = {
  dark: {
    bg: "linear-gradient(170deg, #0f0d0a 0%, #1a1510 40%, #12100d 100%)",
    text: "#e8dcc8", textMuted: "#6b5f50", textFaint: "#4a4238",
    surface: "#1a1510", surfaceHover: "#2a2015",
    border: "#2a2218", borderActive: "#C4A94D",
    accent: "#C4A94D", accentSoft: "#C4A94D44",
    searchBg: "#1a1510", searchText: "#e8dcc8",
    popoverBg: "#1f1a14", popoverBorder: "#3a3228", popoverBtn: "#2a2015",
    toastBg: "#2a2015", toastBorder: "#C4A94D44",
    shelfPanelBg: "#1a151088",
    scrollTrack: "#1a1510", scrollThumb: "#3a3228",
    grain: 0.03, shadow: 0.5,
    cat: {
      RED: { color: "#8B2252", bg: "#8B225218" }, WHITE: { color: "#C4A94D", bg: "#C4A94D18" },
      SWEET: { color: "#D4A06A", bg: "#D4A06A18" }, SPARKLING: { color: "#A89060", bg: "#A8906018" },
      LUX: { color: "#9B7DC8", bg: "#9B7DC818" }, OTHER: { color: "#7A8B8B", bg: "#7A8B8B18" },
    },
  },
  light: {
    bg: "linear-gradient(170deg, #F5F2ED 0%, #EDEAE4 40%, #F0EDE7 100%)",
    text: "#2D2A26", textMuted: "#7A7268", textFaint: "#A89E94",
    surface: "#FFFFFF", surfaceHover: "#F5F2ED",
    border: "#D5D0C8", borderActive: "#8B7A2F",
    accent: "#8B7A2F", accentSoft: "#8B7A2F33",
    searchBg: "#FFFFFF", searchText: "#2D2A26",
    popoverBg: "#FFFFFF", popoverBorder: "#D5D0C8", popoverBtn: "#F5F2ED",
    toastBg: "#FFFFFF", toastBorder: "#D5D0C8",
    shelfPanelBg: "#FFFFFF99",
    scrollTrack: "#EDEAE4", scrollThumb: "#C8C0B4",
    grain: 0.02, shadow: 0.12,
    cat: {
      RED: { color: "#7A1D45", bg: "#7A1D4514" }, WHITE: { color: "#8B7A2F", bg: "#8B7A2F14" },
      SWEET: { color: "#B07840", bg: "#B0784014" }, SPARKLING: { color: "#7A6838", bg: "#7A683814" },
      LUX: { color: "#6B4FA0", bg: "#6B4FA014" }, OTHER: { color: "#5A6868", bg: "#5A686814" },
    },
  },
};

// Inventory fill colors
const FILL_COLORS = {
  0: { bar: "#C0392B", label: "#C0392B" },
  1: { bar: "#D35400", label: "#D35400" },
  2: { bar: "#E67E22", label: "#E67E22" },
  3: { bar: "#F39C12", label: "#C4A94D" },
  4: { bar: "#A8B820", label: "#8BA830" },
  5: { bar: "#27AE60", label: "#27AE60" },
  6: { bar: "#27AE60", label: "#27AE60" },
};

function getCategory(wine) {
  if (!wine) return null;
  for (const [cat, wines] of Object.entries(WINE_LISTS)) {
    if (wines.includes(wine)) return cat;
  }
  return "OTHER";
}

const SHELVES = [8, 7, 6, 5, 4, 3, 2, 1];
const SIDES = ["B", "A"];
const LEVELS = [1, 2, 3, 4, 5];

// Walk order: physical path through the room (shelf 8B levels 1-5, then 8A levels 1-5, etc.)
const WALK_ORDER = SHELVES.flatMap(shelf =>
  SIDES.flatMap(side =>
    LEVELS.map(level => `${shelf}${side}${level}`)
  )
);

export default function WineLibrary() {
  const [layout, setLayout] = useState(INITIAL_LAYOUT);
  const [search, setSearch] = useState("");
  const [dragSource, setDragSource] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [swapMode, setSwapMode] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [toast, setToast] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeShelf, setActiveShelf] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Inventory state
  const [inventory, setInventory] = useState({}); // { "8B1": 3, "8A1": 5, ... }
  const [mode, setMode] = useState("map"); // "map" or "inventory"
  const [invPicker, setInvPicker] = useState(null); // position currently being picked
  const [walkthrough, setWalkthrough] = useState(null); // { index: 0 } or null
  const [showInvBars, setShowInvBars] = useState(true);

  const editRef = useRef(null);
  const walkCardRef = useRef(null);

  const t = darkMode ? THEMES.dark : THEMES.light;

  const getCatStyle = useCallback((wine) => {
    const cat = getCategory(wine);
    if (!cat || !t.cat[cat]) return { color: t.textMuted, bg: "transparent", border: t.border };
    return { color: t.cat[cat].color, bg: t.cat[cat].bg, border: t.cat[cat].color + "40" };
  }, [t]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const saveToHistory = useCallback(() => {
    setHistory(prev => [...prev.slice(-20), JSON.parse(JSON.stringify(layout))]);
  }, [layout]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    setLayout(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    showToast("Undone");
  }, [history, showToast]);

  const isHighlighted = useCallback((wine) => {
    if (search) return wine && wine.toLowerCase().includes(search.toLowerCase());
    if (activeCategory) return getCategory(wine) === activeCategory;
    return true;
  }, [search, activeCategory]);

  const searchResults = useMemo(() => {
    if (!search) return null;
    return Object.entries(layout)
      .filter(([, wine]) => wine && wine.toLowerCase().includes(search.toLowerCase()))
      .map(([pos, wine]) => ({ pos, wine }));
  }, [search, layout]);

  // Drag handlers
  const handleDragStart = (pos) => { saveToHistory(); setDragSource(pos); };
  const handleDragOver = (e, pos) => { e.preventDefault(); setDragOver(pos); };
  const handleDrop = (targetPos) => {
    if (dragSource && dragSource !== targetPos) {
      setLayout(prev => {
        const next = { ...prev };
        const tmp = next[targetPos]; next[targetPos] = next[dragSource]; next[dragSource] = tmp;
        return next;
      });
      showToast(`Swapped ${dragSource} ↔ ${targetPos}`);
    }
    setDragSource(null); setDragOver(null);
  };

  const handleCellClick = (pos) => {
    if (mode === "inventory") {
      setInvPicker(invPicker === pos ? null : pos);
      return;
    }
    if (editingCell) return;
    if (swapMode) {
      if (swapMode === pos) { setSwapMode(null); return; }
      saveToHistory();
      setLayout(prev => {
        const next = { ...prev };
        const tmp = next[pos]; next[pos] = next[swapMode]; next[swapMode] = tmp;
        return next;
      });
      showToast(`Swapped ${swapMode} ↔ ${pos}`);
      setSwapMode(null);
    } else {
      setSelectedCell(selectedCell === pos ? null : pos);
    }
  };

  const startSwap = (pos) => { setSwapMode(pos); setSelectedCell(null); showToast("Tap another cell to swap"); };
  const startEdit = (pos) => { setEditingCell(pos); setEditValue(layout[pos] || ""); setSelectedCell(null); setTimeout(() => editRef.current?.focus(), 50); };
  const confirmEdit = () => {
    if (editingCell) { saveToHistory(); setLayout(prev => ({ ...prev, [editingCell]: editValue.toUpperCase() })); setEditingCell(null); setEditValue(""); }
  };

  // Inventory functions
  const setCount = (pos, count) => {
    setInventory(prev => ({ ...prev, [pos]: count }));
  };

  const handleWalkthroughPick = (count) => {
    if (!walkthrough) return;
    const pos = WALK_ORDER[walkthrough.index];
    setCount(pos, count);
    const nextIndex = walkthrough.index + 1;
    if (nextIndex >= WALK_ORDER.length) {
      setWalkthrough(null);
      showToast("Count complete!");
    } else {
      setWalkthrough({ index: nextIndex });
    }
  };

  const handleQuickPick = (count) => {
    if (!invPicker) return;
    setCount(invPicker, count);
    setInvPicker(null);
  };

  // Inventory stats
  const invStats = useMemo(() => {
    const counted = Object.keys(inventory).length;
    const total = WALK_ORDER.length;
    const totalCases = Object.values(inventory).reduce((a, b) => a + b, 0);
    const lowStock = Object.entries(inventory).filter(([, c]) => c <= 1).length;
    const empty = Object.entries(inventory).filter(([, c]) => c === 0).length;
    return { counted, total, totalCases, lowStock, empty };
  }, [inventory]);

  const uniqueWines = Object.keys(
    Object.values(layout).reduce((acc, w) => { if (w) acc[w] = 1; return acc; }, {})
  ).sort();

  const cellId = (shelf, side, level) => `${shelf}${side}${level}`;

  const toolBtn = {
    padding: "6px 12px", borderRadius: "4px", border: `1px solid ${t.border}`,
    background: "transparent", color: t.textMuted, fontSize: "9px",
    fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "1px",
    cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
  };

  const popBtn = {
    padding: "4px 8px", borderRadius: "4px", border: `1px solid ${t.popoverBorder}`,
    background: t.popoverBtn, color: t.accent, fontSize: "9px",
    fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", whiteSpace: "nowrap",
  };

  // Case count selector (reused in quick pick and walkthrough)
  const renderCasePicker = (currentCount, onPick, large = false) => {
    const btnSize = large ? "52px" : "36px";
    const fontSize = large ? "20px" : "14px";
    return (
      <div style={{ display: "flex", gap: large ? "8px" : "4px", justifyContent: "center", flexWrap: "wrap" }}>
        {[0, 1, 2, 3, 4, 5, 6].map(n => {
          const fc = FILL_COLORS[n];
          const isActive = currentCount === n;
          return (
            <button
              key={n}
              onClick={(e) => { e.stopPropagation(); onPick(n); }}
              style={{
                width: btnSize, height: btnSize,
                borderRadius: large ? "12px" : "8px",
                border: `2px solid ${isActive ? fc.bar : t.border}`,
                background: isActive ? fc.bar + "30" : "transparent",
                color: isActive ? fc.label : t.textMuted,
                fontSize, fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCell = (pos) => {
    const wine = layout[pos];
    const cs = getCatStyle(wine);
    const isDragSrc = dragSource === pos;
    const isDragTgt = dragOver === pos;
    const isSwapSrc = swapMode === pos;
    const isSelected = selectedCell === pos;
    const isEditing = editingCell === pos;
    const dimmed = (search || activeCategory) && !isHighlighted(wine);
    const isInvActive = invPicker === pos;
    const isWalkActive = walkthrough && WALK_ORDER[walkthrough.index] === pos;
    const count = inventory[pos];
    const hasCount = count !== undefined;

    return (
      <div
        key={pos}
        draggable={mode === "map" && !isEditing}
        onDragStart={mode === "map" ? () => handleDragStart(pos) : undefined}
        onDragOver={mode === "map" ? (e) => handleDragOver(e, pos) : undefined}
        onDragEnd={mode === "map" ? () => { setDragSource(null); setDragOver(null); } : undefined}
        onDrop={mode === "map" ? () => handleDrop(pos) : undefined}
        onClick={() => handleCellClick(pos)}
        style={{
          position: "relative",
          padding: "6px 4px 4px",
          borderRadius: "4px",
          border: `1px solid ${
            isWalkActive ? "#F39C12" :
            isInvActive ? t.borderActive :
            isSwapSrc ? t.borderActive :
            isDragTgt ? t.borderActive + "aa" :
            isSelected ? t.borderActive + "88" :
            cs.border
          }`,
          background:
            isWalkActive ? (darkMode ? "#F39C1215" : "#F39C1210") :
            isDragSrc ? t.surface :
            isDragTgt ? t.surfaceHover :
            isSwapSrc ? t.surfaceHover :
            cs.bg,
          cursor: mode === "inventory" ? "pointer" : swapMode ? "crosshair" : "grab",
          opacity: dimmed ? 0.2 : isDragSrc ? 0.4 : 1,
          transition: "all 0.2s ease",
          height: "100%", minHeight: "48px",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          userSelect: "none", boxSizing: "border-box",
          boxShadow:
            isWalkActive ? "0 0 0 2px #F39C1244" :
            (isSelected || isSwapSrc) ? `0 0 0 2px ${t.accentSoft}` : "none",
        }}
      >
        {isEditing ? (
          <input
            ref={editRef} value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") confirmEdit(); if (e.key === "Escape") setEditingCell(null); }}
            onBlur={confirmEdit}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "transparent", border: "none", borderBottom: `1px solid ${t.accent}`,
              color: t.text, fontSize: "10px", fontFamily: "'JetBrains Mono', monospace",
              textAlign: "center", width: "100%", outline: "none", padding: "2px 0", textTransform: "uppercase",
            }}
          />
        ) : (
          <>
            <span style={{
              fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              color: cs.color, letterSpacing: "0.3px", textAlign: "center", lineHeight: 1.2,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%",
            }}>
              {wine || "—"}
            </span>
            <span style={{
              fontSize: "7px", color: t.textMuted, fontFamily: "'JetBrains Mono', monospace", marginTop: "1px",
            }}>
              {pos}
            </span>
            {/* Inventory fill bar */}
            {(mode === "inventory" || showInvBars) && hasCount && (
              <div style={{
                width: "100%", marginTop: "3px", display: "flex", alignItems: "center", gap: "3px",
              }}>
                <div style={{
                  flex: 1, height: "4px", borderRadius: "2px",
                  background: darkMode ? "#ffffff10" : "#00000010",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${(count / 6) * 100}%`,
                    height: "100%", borderRadius: "2px",
                    background: FILL_COLORS[count].bar,
                    transition: "width 0.3s ease",
                  }} />
                </div>
                <span style={{
                  fontSize: "7px", fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: FILL_COLORS[count].label,
                  minWidth: "8px", textAlign: "right",
                }}>
                  {count}
                </span>
              </div>
            )}
          </>
        )}

        {/* Map mode popover */}
        {mode === "map" && isSelected && !swapMode && !isEditing && (
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "absolute", bottom: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)",
            background: t.popoverBg, border: `1px solid ${t.popoverBorder}`, borderRadius: "6px",
            padding: "4px", display: "flex", gap: "2px", zIndex: 100,
            boxShadow: `0 4px 16px rgba(0,0,0,${t.shadow})`,
          }}>
            <button onClick={() => startSwap(pos)} style={popBtn}>⇄ Swap</button>
            <button onClick={() => startEdit(pos)} style={popBtn}>✎ Edit</button>
          </div>
        )}

        {/* Inventory quick pick popover */}
        {mode === "inventory" && isInvActive && !walkthrough && (
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
            background: t.popoverBg, border: `1px solid ${t.popoverBorder}`, borderRadius: "10px",
            padding: "10px 8px 8px", zIndex: 100,
            boxShadow: `0 6px 24px rgba(0,0,0,${t.shadow})`,
            minWidth: "200px",
          }}>
            <div style={{
              fontSize: "8px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted,
              textAlign: "center", marginBottom: "6px", letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Cases — {wine}
            </div>
            {renderCasePicker(count, handleQuickPick)}
          </div>
        )}
      </div>
    );
  };

  const renderShelfDetail = (shelfNum) => (
    <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
      {SIDES.map(side => (
        <div key={side} style={{ flex: 1, maxWidth: "260px" }}>
          <div style={{
            textAlign: "center", fontSize: "13px", fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, color: t.textMuted, marginBottom: "8px", letterSpacing: "2px",
          }}>SIDE {side}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {LEVELS.map(level => {
              const pos = cellId(shelfNum, side, level);
              return (
                <div key={level} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "10px", color: t.textMuted, fontFamily: "'JetBrains Mono', monospace", width: "12px", textAlign: "right" }}>{level}</span>
                  <div style={{ flex: 1 }}>{renderCell(pos)}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // Walkthrough card
  const walkthroughPos = walkthrough ? WALK_ORDER[walkthrough.index] : null;
  const walkthroughWine = walkthroughPos ? layout[walkthroughPos] : null;
  const walkthroughCatStyle = walkthroughPos ? getCatStyle(walkthroughWine) : null;

  return (
    <div style={{
      minHeight: "100vh", background: t.bg, color: t.text,
      fontFamily: "'Cormorant Garamond', serif", position: "relative", overflow: "hidden",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <div style={{
        position: "fixed", inset: 0, opacity: t.grain, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "4px", color: t.text, margin: 0, textTransform: "uppercase" }}>
              Wine Library
            </h1>
            <p style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted, margin: "4px 0 0", letterSpacing: "1px" }}>
              8 UNITS · 16 SIDES · 80 POSITIONS · {uniqueWines.length} VARIETALS
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ ...toolBtn, fontSize: "14px", padding: "4px 10px", lineHeight: 1 }}>
              {darkMode ? "☀" : "☾"}
            </button>
            {mode === "map" && (
              <>
                <button onClick={undo} disabled={history.length === 0} style={{ ...toolBtn, opacity: history.length === 0 ? 0.3 : 1 }}>↩ UNDO</button>
                <button
                  onClick={() => { if (swapMode) { setSwapMode(null); } else { setLayout(INITIAL_LAYOUT); setHistory([]); showToast("Reset to original"); } }}
                  style={toolBtn}
                >{swapMode ? "✕ CANCEL" : "↻ RESET"}</button>
              </>
            )}
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ marginTop: "16px", display: "flex", gap: "0", marginBottom: "4px" }}>
          {[
            { key: "map", label: "MAP" },
            { key: "inventory", label: "INVENTORY" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setMode(key);
                setSelectedCell(null); setSwapMode(null); setEditingCell(null);
                setInvPicker(null); setWalkthrough(null);
              }}
              style={{
                padding: "8px 20px",
                borderRadius: key === "map" ? "6px 0 0 6px" : "0 6px 6px 0",
                border: `1px solid ${t.border}`,
                borderRight: key === "map" ? "none" : `1px solid ${t.border}`,
                background: mode === key ? (darkMode ? "#2a2015" : "#FFFFFF") : "transparent",
                color: mode === key ? t.accent : t.textMuted,
                fontSize: "10px", fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "1.5px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Map mode: search & filters */}
        {mode === "map" && (
          <div style={{ marginTop: "12px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 200px", maxWidth: "320px" }}>
              <input
                type="text" placeholder="Search wines..." value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveCategory(null); }}
                style={{
                  width: "100%", padding: "8px 12px 8px 32px", background: t.searchBg,
                  border: `1px solid ${t.border}`, borderRadius: "6px", color: t.searchText,
                  fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", outline: "none", boxSizing: "border-box",
                }}
              />
              <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: t.textMuted, fontSize: "14px" }}>⌕</span>
              {search && (
                <button onClick={() => setSearch("")} style={{
                  position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: t.textMuted, cursor: "pointer", fontSize: "14px", padding: "0 2px",
                }}>×</button>
              )}
            </div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {Object.entries(t.cat).map(([cat, catColors]) => (
                <button key={cat} onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setSearch(""); }}
                  style={{
                    padding: "4px 10px", borderRadius: "12px",
                    border: `1px solid ${activeCategory === cat ? catColors.color : t.border}`,
                    background: activeCategory === cat ? catColors.color + "25" : "transparent",
                    color: activeCategory === cat ? catColors.color : t.textMuted,
                    fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                    letterSpacing: "0.5px", cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        )}

        {/* Map mode: search results */}
        {mode === "map" && search && searchResults && (
          <div style={{ marginTop: "8px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: searchResults.length > 0 ? t.accent : "#8B5E3C" }}>
            {searchResults.length > 0
              ? `${searchResults.length} location${searchResults.length > 1 ? "s" : ""}: ${searchResults.map(r => r.pos).join(", ")}`
              : `No results for "${search}"`}
          </div>
        )}

        {/* Inventory mode: controls */}
        {mode === "inventory" && !walkthrough && (
          <div style={{ marginTop: "12px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setWalkthrough({ index: 0 })}
              style={{
                padding: "10px 20px", borderRadius: "8px",
                border: `1px solid ${t.borderActive}`,
                background: darkMode ? "#C4A94D18" : "#8B7A2F12",
                color: t.accent,
                fontSize: "11px", fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "1px", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              ▶ START FULL COUNT
            </button>
            {invStats.counted > 0 && (
              <button
                onClick={() => { setInventory({}); showToast("Counts cleared"); }}
                style={toolBtn}
              >
                ✕ CLEAR COUNTS
              </button>
            )}
            <div style={{
              fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted,
              display: "flex", gap: "16px", flexWrap: "wrap",
            }}>
              {invStats.counted > 0 && (
                <>
                  <span>{invStats.counted}/{invStats.total} counted</span>
                  <span>{invStats.totalCases} cases</span>
                  {invStats.lowStock > 0 && <span style={{ color: FILL_COLORS[1].label }}>{invStats.lowStock} low</span>}
                  {invStats.empty > 0 && <span style={{ color: FILL_COLORS[0].label }}>{invStats.empty} empty</span>}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Walkthrough overlay */}
      {walkthrough && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: darkMode ? "rgba(10,8,6,0.92)" : "rgba(240,237,231,0.95)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "24px",
          backdropFilter: "blur(8px)",
        }}>
          <div ref={walkCardRef} style={{
            width: "100%", maxWidth: "400px",
            background: t.popoverBg,
            border: `1px solid ${t.border}`,
            borderRadius: "16px",
            padding: "32px 24px",
            boxShadow: `0 8px 40px rgba(0,0,0,${t.shadow})`,
          }}>
            {/* Progress */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px",
            }}>
              <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted, letterSpacing: "1px" }}>
                FULL COUNT
              </span>
              <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted }}>
                {walkthrough.index + 1} / {WALK_ORDER.length}
              </span>
            </div>
            <div style={{
              width: "100%", height: "4px", borderRadius: "2px",
              background: darkMode ? "#ffffff10" : "#00000010",
              marginBottom: "24px", overflow: "hidden",
            }}>
              <div style={{
                width: `${((walkthrough.index) / WALK_ORDER.length) * 100}%`,
                height: "100%", borderRadius: "2px", background: t.accent,
                transition: "width 0.3s ease",
              }} />
            </div>

            {/* Current position */}
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <span style={{
                fontSize: "14px", fontFamily: "'JetBrains Mono', monospace",
                color: t.textFaint, letterSpacing: "2px",
              }}>
                UNIT {walkthroughPos[0]} · SIDE {walkthroughPos[1]} · LEVEL {walkthroughPos[2]}
              </span>
            </div>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <span style={{
                fontSize: "32px", fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700, color: t.accent, letterSpacing: "2px",
              }}>
                {walkthroughPos}
              </span>
            </div>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{
                fontSize: "18px", fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, color: walkthroughCatStyle.color,
                letterSpacing: "1px",
              }}>
                {walkthroughWine || "EMPTY"}
              </span>
            </div>

            {/* Case picker */}
            <div style={{
              fontSize: "9px", fontFamily: "'JetBrains Mono', monospace",
              color: t.textFaint, textAlign: "center", marginBottom: "12px",
              letterSpacing: "1.5px", textTransform: "uppercase",
            }}>
              How many cases?
            </div>
            {renderCasePicker(inventory[walkthroughPos], handleWalkthroughPick, true)}

            {/* Nav */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: "24px", paddingTop: "16px",
              borderTop: `1px solid ${t.border}`,
            }}>
              <button
                onClick={() => {
                  if (walkthrough.index > 0) setWalkthrough({ index: walkthrough.index - 1 });
                }}
                disabled={walkthrough.index === 0}
                style={{ ...toolBtn, opacity: walkthrough.index === 0 ? 0.3 : 1 }}
              >
                ← BACK
              </button>
              <button
                onClick={() => {
                  // Skip without setting a count
                  const next = walkthrough.index + 1;
                  if (next >= WALK_ORDER.length) {
                    setWalkthrough(null);
                    showToast("Count complete!");
                  } else {
                    setWalkthrough({ index: next });
                  }
                }}
                style={toolBtn}
              >
                SKIP →
              </button>
              <button
                onClick={() => { setWalkthrough(null); }}
                style={{ ...toolBtn, color: FILL_COLORS[0].label }}
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div style={{ padding: "20px 16px", overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "750px", borderCollapse: "separate", borderSpacing: "3px", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "28px" }} />
              {SHELVES.map(shelf => (
                <th key={shelf} colSpan={2} onClick={() => setActiveShelf(activeShelf === shelf ? null : shelf)} style={{
                  textAlign: "center", fontSize: "8px", fontFamily: "'JetBrains Mono', monospace",
                  color: activeShelf === shelf ? t.accent : t.textFaint, letterSpacing: "1px", paddingBottom: "4px",
                  borderBottom: `2px solid ${activeShelf === shelf ? t.accentSoft : t.border + "55"}`,
                  fontWeight: 600, cursor: "pointer", transition: "color 0.2s", textTransform: "uppercase",
                }}>UNIT {shelf}</th>
              ))}
            </tr>
            <tr>
              <th style={{ width: "28px" }} />
              {SHELVES.flatMap(shelf => SIDES.map(side => (
                <th key={`${shelf}${side}`} style={{
                  textAlign: "center", padding: "6px 0", fontSize: "10px",
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  color: t.textMuted, letterSpacing: "0.5px", borderBottom: `1px solid ${t.border}`,
                }}>{shelf}{side}</th>
              )))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map(level => (
              <tr key={level}>
                <td style={{ textAlign: "center", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: t.textMuted, width: "28px", padding: "0" }}>{level}</td>
                {SHELVES.flatMap(shelf => SIDES.map(side => {
                  const pos = cellId(shelf, side, level);
                  return <td key={pos} style={{ padding: "0", height: "56px" }}>{renderCell(pos)}</td>;
                }))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shelf Detail */}
      {activeShelf && (
        <div style={{ margin: "0 16px 20px", padding: "20px", background: t.shelfPanelBg, borderRadius: "8px", border: `1px solid ${t.border}`, backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "3px", margin: 0, color: t.accent, textTransform: "uppercase" }}>Unit {activeShelf}</h2>
            <button onClick={() => setActiveShelf(null)} style={{ ...toolBtn, fontSize: "9px" }}>✕ CLOSE</button>
          </div>
          {renderShelfDetail(activeShelf)}
        </div>
      )}

      {/* Legend */}
      <div style={{ padding: "16px 28px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: t.textFaint, marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>
          {mode === "map"
            ? "Drag to rearrange · Tap cell for options · Click unit header to expand"
            : "Tap any cell to set case count · Or use Full Count to walk the room"
          }
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {Object.entries(WINE_LISTS).map(([cat]) => {
            const count = Object.values(layout).filter(w => WINE_LISTS[cat].includes(w)).length;
            return (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: t.cat[cat].color }} />
                <span style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: t.textMuted }}>{cat} ({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
          padding: "10px 20px", background: t.toastBg, border: `1px solid ${t.toastBorder}`,
          borderRadius: "8px", color: t.accent, fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px",
          boxShadow: `0 4px 24px rgba(0,0,0,${t.shadow})`, zIndex: 1000, animation: "fadeIn 0.2s ease",
        }}>{toast}</div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-track { background: ${t.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
