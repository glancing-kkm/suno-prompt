import { useState, useCallback } from "react";

const GENRES = ["K-pop","J-pop","Pop","Indie pop","Indie rock","Rock","Soft rock","Metal","Heavy metal","Jazz","Smooth jazz","Blues","Classical","Orchestral","R&B","Soul","Hip-hop","Rap","Trap","Lo-fi","Ambient","Electronic","EDM","House","Techno","Synthwave","Bossa nova","Reggae","Funk","Folk","Country","Gospel","Opera"];

const MOODS = ["Uplifting","Euphoric","Joyful","Energetic","Powerful","Triumphant","Hopeful","Romantic","Dreamy","Peaceful","Serene","Warm","Melancholic","Sad","Lonely","Dark","Haunting","Tense","Mysterious","Eerie","Nostalgic","Reflective","Cinematic","Epic","Dramatic","Ethereal","Hypnotic","Groovy","Bittersweet"];

const INSTRUMENTS = {
  "현악기": ["Violin","Viola","Cello","Acoustic guitar","Electric guitar","Harp"],
  "건반": ["Piano","Grand piano","Electric piano","Organ","Synthesizer","Harpsichord"],
  "타악기": ["Drums","Drum kit","Percussion","Bongo","Marimba","Drum machine"],
  "관악기": ["Flute","Saxophone","Trumpet","Trombone","French horn","Clarinet"],
  "베이스": ["Bass guitar","Electric bass","808 bass","Synthesizer bass"],
};

const VOCAL_STYLES = ["Smooth","Breathy","Raspy","Powerful belting","Whispering","Falsetto","Operatic","Choir","Harmonies","Spoken word","Rap vocals"];

const PRODUCTION = ["Lo-fi","Hi-fi","Vintage","Analog","Modern","Reverb-heavy","Distortion","Cinematic mix","Minimalist","Wall of sound","Stereo wide","Polished"];

const ERA = ["60s Motown","70s funk","80s synth-pop","90s grunge","2000s emo","Retro","Contemporary","Futuristic"];

const TEMPOS = [
  { label: "매우 느림", value: "very slow 50 BPM" },
  { label: "느림", value: "slow 70 BPM" },
  { label: "보통", value: "moderate 95 BPM" },
  { label: "경쾌함", value: "upbeat 125 BPM" },
  { label: "빠름", value: "fast 155 BPM" },
  { label: "매우 빠름", value: "very fast 180 BPM" },
];

const STRUCTURES = ["Intro","Verse","Pre-chorus","Chorus","Bridge","Outro","Instrumental break","Solo section","Build-up","Drop"];

const LANGUAGES = ["English","Korean","Japanese","Spanish","French","No lyrics (instrumental)"];

function Tag({ label, selected, onClick, color = "purple" }) {
  const colors = {
    purple: selected ? "bg-purple-600 text-white border-purple-500" : "border-purple-800 text-purple-300 hover:border-purple-500 hover:text-white",
    pink: selected ? "bg-pink-600 text-white border-pink-500" : "border-pink-900 text-pink-300 hover:border-pink-500 hover:text-white",
    cyan: selected ? "bg-cyan-600 text-white border-cyan-500" : "border-cyan-900 text-cyan-300 hover:border-cyan-500 hover:text-white",
    amber: selected ? "bg-amber-600 text-white border-amber-500" : "border-amber-900 text-amber-300 hover:border-amber-500 hover:text-white",
    green: selected ? "bg-emerald-600 text-white border-emerald-500" : "border-emerald-900 text-emerald-300 hover:border-emerald-500 hover:text-white",
    blue: selected ? "bg-blue-600 text-white border-blue-500" : "border-blue-900 text-blue-300 hover:border-blue-500 hover:text-white",
    rose: selected ? "bg-rose-600 text-white border-rose-500" : "border-rose-900 text-rose-300 hover:border-rose-500 hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full border transition-all duration-150 cursor-pointer select-none ${colors[color]}`}
    >
      {label}
    </button>
  );
}

function Section({ title, emoji, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-2">
        <span>{emoji}</span>{title}
      </h2>
      {children}
    </div>
  );
}

export default function SunoBuilder() {
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [vocalGender, setVocalGender] = useState(null);
  const [vocalStyles, setVocalStyles] = useState([]);
  const [hasLyrics, setHasLyrics] = useState(null);
  const [language, setLanguage] = useState(null);
  const [tempo, setTempo] = useState(null);
  const [production, setProduction] = useState([]);
  const [era, setEra] = useState([]);
  const [structure, setStructure] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const buildPrompt = useCallback(() => {
    const parts = [];
    if (genres.length) parts.push(genres.join(", "));
    if (era.length) parts.push(era.join(", "));
    if (moods.length) parts.push(moods.join(", "));
    if (tempo) parts.push(tempo);
    if (instruments.length) parts.push(instruments.join(", "));
    if (production.length) parts.push(production.join(", "));

    const vocalParts = [];
    if (hasLyrics === false) {
      vocalParts.push("instrumental, no vocals");
    } else {
      if (vocalGender === "male") vocalParts.push("male vocals");
      else if (vocalGender === "female") vocalParts.push("female vocals");
      if (vocalStyles.length) vocalParts.push(vocalStyles.join(", "));
      if (language && language !== "No lyrics (instrumental)") vocalParts.push(`lyrics in ${language}`);
    }
    if (vocalParts.length) parts.push(vocalParts.join(", "));
    if (structure.length) parts.push(structure.join(", "));

    return parts.join(", ");
  }, [genres, moods, instruments, vocalGender, vocalStyles, hasLyrics, language, tempo, production, era, structure]);

  const prompt = buildPrompt();
  const wordCount = prompt ? prompt.split(",").filter(Boolean).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGenres([]); setMoods([]); setInstruments([]); setVocalGender(null);
    setVocalStyles([]); setHasLyrics(null); setLanguage(null); setTempo(null);
    setProduction([]); setEra([]); setStructure([]);
  };

  const qualityColor = wordCount === 0 ? "text-gray-500" : wordCount <= 3 ? "text-red-400" : wordCount <= 7 ? "text-emerald-400" : "text-amber-400";
  const qualityLabel = wordCount === 0 ? "선택 없음" : wordCount <= 3 ? "더 추가하세요" : wordCount <= 7 ? "최적 범위" : "너무 많음";

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0a0a0f", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "20px 24px", background: "#0d0d1a" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 12px #a855f7" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#6b7280", fontWeight: "bold" }}>SUNO AI</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: "bold", color: "#f1f0ff", marginTop: 4, letterSpacing: "-0.02em" }}>
              Prompt Builder
            </h1>
          </div>
          <button onClick={handleReset} style={{ fontSize: 11, color: "#6b7280", border: "1px solid #2d2d3e", borderRadius: 6, padding: "6px 12px", background: "transparent", cursor: "pointer" }}>
            초기화
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 0, maxWidth: 1100, margin: "0 auto" }}>
        {/* Left panel */}
        <div style={{ padding: "24px 28px", borderRight: "1px solid #1e1e2e", overflowY: "auto" }}>

          {/* 가사 유무 */}
          <Section title="가사 유무" emoji="🎤">
            <div className="flex gap-2">
              {[{ label: "🎵 가사 있음", val: true }, { label: "🎸 인스트루멘탈", val: false }].map(({ label, val }) => (
                <button key={String(val)} onClick={() => setHasLyrics(hasLyrics === val ? null : val)}
                  className="px-4 py-2 rounded-lg text-sm transition-all"
                  style={{ background: hasLyrics === val ? (val ? "#7c3aed" : "#0e7490") : "#1a1a2e", border: `1px solid ${hasLyrics === val ? (val ? "#7c3aed" : "#0e7490") : "#2d2d3e"}`, color: hasLyrics === val ? "#fff" : "#9ca3af", cursor: "pointer" }}>
                  {label}
                </button>
              ))}
            </div>
          </Section>

          {/* 보컬 성별 */}
          {hasLyrics !== false && (
            <Section title="보컬 성별" emoji="👤">
              <div className="flex gap-2">
                {[{ label: "♂ 남성", val: "male" }, { label: "♀ 여성", val: "female" }].map(({ label, val }) => (
                  <button key={val} onClick={() => setVocalGender(vocalGender === val ? null : val)}
                    className="px-4 py-2 rounded-lg text-sm transition-all"
                    style={{ background: vocalGender === val ? "#be185d" : "#1a1a2e", border: `1px solid ${vocalGender === val ? "#be185d" : "#2d2d3e"}`, color: vocalGender === val ? "#fff" : "#9ca3af", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* 장르 */}
          <Section title="장르 / 스타일" emoji="🎵">
            <div className="flex flex-wrap gap-2">
              {GENRES.map(g => <Tag key={g} label={g} selected={genres.includes(g)} onClick={() => toggle(genres, setGenres, g)} color="purple" />)}
            </div>
          </Section>

          {/* 시대 */}
          <Section title="시대 / 레퍼런스" emoji="🕰️">
            <div className="flex flex-wrap gap-2">
              {ERA.map(e => <Tag key={e} label={e} selected={era.includes(e)} onClick={() => toggle(era, setEra, e)} color="blue" />)}
            </div>
          </Section>

          {/* 분위기 */}
          <Section title="분위기 / 감정" emoji="🌙">
            <div className="flex flex-wrap gap-2">
              {MOODS.map(m => <Tag key={m} label={m} selected={moods.includes(m)} onClick={() => toggle(moods, setMoods, m)} color="pink" />)}
            </div>
          </Section>

          {/* 템포 */}
          <Section title="템포" emoji="⏱️">
            <div className="flex flex-wrap gap-2">
              {TEMPOS.map(t => (
                <button key={t.value} onClick={() => setTempo(tempo === t.value ? null : t.value)}
                  className="px-3 py-1 text-xs rounded-full border transition-all"
                  style={{ background: tempo === t.value ? "#d97706" : "transparent", border: `1px solid ${tempo === t.value ? "#d97706" : "#3d3d2e"}`, color: tempo === t.value ? "#fff" : "#d1a254", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </Section>

          {/* 악기 */}
          <Section title="악기" emoji="🎸">
            {Object.entries(INSTRUMENTS).map(([cat, items]) => (
              <div key={cat} className="mb-3">
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6, letterSpacing: "0.1em" }}>{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map(i => <Tag key={i} label={i} selected={instruments.includes(i)} onClick={() => toggle(instruments, setInstruments, i)} color="cyan" />)}
                </div>
              </div>
            ))}
          </Section>

          {/* 보컬 스타일 */}
          {hasLyrics !== false && (
            <Section title="보컬 스타일 / 창법" emoji="🎙️">
              <div className="flex flex-wrap gap-2">
                {VOCAL_STYLES.map(v => <Tag key={v} label={v} selected={vocalStyles.includes(v)} onClick={() => toggle(vocalStyles, setVocalStyles, v)} color="rose" />)}
              </div>
            </Section>
          )}

          {/* 가사 언어 */}
          {hasLyrics !== false && (
            <Section title="가사 언어" emoji="🌍">
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.filter(l => l !== "No lyrics (instrumental)").map(l => (
                  <button key={l} onClick={() => setLanguage(language === l ? null : l)}
                    className="px-3 py-1 text-xs rounded-full border transition-all"
                    style={{ background: language === l ? "#059669" : "transparent", border: `1px solid ${language === l ? "#059669" : "#1e3a2e"}`, color: language === l ? "#fff" : "#6ee7b7", cursor: "pointer" }}>
                    {l}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* 프로덕션 */}
          <Section title="프로덕션 스타일" emoji="🔊">
            <div className="flex flex-wrap gap-2">
              {PRODUCTION.map(p => <Tag key={p} label={p} selected={production.includes(p)} onClick={() => toggle(production, setProduction, p)} color="amber" />)}
            </div>
          </Section>

          {/* 구성 */}
          <Section title="곡 구성" emoji="🎼">
            <div className="flex flex-wrap gap-2">
              {STRUCTURES.map(s => <Tag key={s} label={s} selected={structure.includes(s)} onClick={() => toggle(structure, setStructure, s)} color="green" />)}
            </div>
          </Section>

        </div>

        {/* Right panel - prompt output */}
        <div style={{ padding: "24px 20px", position: "sticky", top: 0, height: "100vh", overflowY: "auto", background: "#0d0d1a" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6b7280", marginBottom: 12, fontWeight: "bold" }}>GENERATED PROMPT</div>

          {/* Quality meter */}
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 11, color: "#6b7280" }}>요소 수: <span className={qualityColor}>{wordCount}</span></span>
            <span style={{ fontSize: 11 }} className={qualityColor}>{qualityLabel}</span>
          </div>
          <div style={{ height: 3, background: "#1e1e2e", borderRadius: 2, marginBottom: 16 }}>
            <div style={{ height: "100%", borderRadius: 2, width: `${Math.min(wordCount / 8 * 100, 100)}%`, background: wordCount <= 3 ? "#ef4444" : wordCount <= 7 ? "#10b981" : "#f59e0b", transition: "all 0.3s" }} />
          </div>

          {/* Prompt box */}
          <div style={{ background: "#111120", border: "1px solid #2d2d3e", borderRadius: 10, padding: 16, minHeight: 160, marginBottom: 16, position: "relative" }}>
            {prompt ? (
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#c4b5fd", wordBreak: "break-word" }}>
                {prompt}
              </p>
            ) : (
              <p style={{ fontSize: 12, color: "#374151", fontStyle: "italic" }}>
                왼쪽에서 옵션을 선택하면<br />프롬프트가 자동으로 생성됩니다
              </p>
            )}
          </div>

          {/* Copy button */}
          <button onClick={handleCopy} disabled={!prompt}
            style={{ width: "100%", padding: "12px", background: prompt ? "#7c3aed" : "#1e1e2e", border: "none", borderRadius: 8, color: prompt ? "#fff" : "#4b5563", fontSize: 13, fontWeight: "bold", cursor: prompt ? "pointer" : "default", transition: "all 0.2s", letterSpacing: "0.05em" }}>
            {copied ? "✓ 복사됨!" : "📋 프롬프트 복사"}
          </button>

          {/* Selected tags summary */}
          {prompt && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 10, color: "#4b5563", letterSpacing: "0.15em", marginBottom: 10 }}>선택된 항목</div>
              <div className="flex flex-wrap gap-1">
                {[...genres, ...era, ...moods, tempo, ...instruments, ...vocalStyles, language, ...production, ...structure]
                  .filter(Boolean)
                  .map((item, i) => (
                    <span key={i} style={{ fontSize: 10, background: "#1a1a2e", border: "1px solid #2d2d3e", borderRadius: 4, padding: "2px 6px", color: "#9ca3af" }}>{item}</span>
                  ))}
                {vocalGender && <span style={{ fontSize: 10, background: "#1a1a2e", border: "1px solid #2d2d3e", borderRadius: 4, padding: "2px 6px", color: "#9ca3af" }}>{vocalGender} vocals</span>}
                {hasLyrics === false && <span style={{ fontSize: 10, background: "#1a1a2e", border: "1px solid #2d2d3e", borderRadius: 4, padding: "2px 6px", color: "#9ca3af" }}>instrumental</span>}
              </div>
            </div>
          )}

          {/* Tips */}
          <div style={{ marginTop: 24, padding: 14, background: "#0f1629", border: "1px solid #1e2d4a", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#3b82f6", letterSpacing: "0.15em", marginBottom: 8 }}>💡 TIP</div>
            <ul style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.7, paddingLeft: 14 }}>
              <li>최적 요소 수: 4~7개</li>
              <li>장르 1개 + 분위기 1~2개 조합 추천</li>
              <li>악기는 2개 이하가 효과적</li>
              <li>같은 프롬프트로 3~5회 생성 후 선택</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
