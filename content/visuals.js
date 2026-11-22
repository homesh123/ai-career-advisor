// Animated diagrams for lessons (SVG + CSS animations, styled by .viz rules in styles.css).
// Chosen over GIF files: sharp at any size, a few KB each, readable in both languages, and they
// stop moving for people who ask their device to reduce motion. Labels are short technical terms
// (the same in English and Hinglish); captions are [English, Hinglish].
var LESSON_VISUALS = (function () {
  // Small builders keep coordinates readable. Each diagram gets its own arrow-marker id.
  const T = (x, y, s, cls = "", anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${s}</text>`;
  const R = (x, y, w, h, cls = "b", rx = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  const box = (x, y, w, h, label, cls = "b", g = "", sub = "") =>
    `<g class="${g}">${R(x, y, w, h, cls)}${T(x + w / 2, y + h / 2 + (sub ? -2 : 5), label)}${sub ? T(x + w / 2, y + h / 2 + 15, sub, "tm ts") : ""}</g>`;
  const arrowDefs = id => `<defs><marker id="ah-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>`;
  const A = (id, d, cls = "ln", g = "") => `<path d="${d}" class="${cls} ${g}" marker-end="url(#ah-${id})"/>`;
  const dot = (path, dur = 3, cls = "dot") => `<circle r="6" class="${cls}"><animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}"/></circle>`;
  const svg = (id, h, body, label) => `<svg viewBox="0 0 640 ${h}" role="img" aria-label="${label}" focusable="false">${arrowDefs(id)}${body}</svg>`;

  const V = {};

  V["what-is-ai"] = {
    caption: ["Each circle sits inside the bigger one: GenAI is a kind of deep learning, which is a kind of machine learning, which is a kind of AI.", "Har circle bade wale ke andar hai: GenAI deep learning ka ek type hai, jo machine learning ka type hai, jo AI ka type hai."],
    svg: svg("ai", 236, [
      `<g class="s1">${R(16, 8, 608, 220, "f1", 22)}${T(36, 34, "AI · any system that does something 'smart'", "", "start")}</g>`,
      `<g class="s2">${R(66, 46, 508, 172, "f2", 20)}${T(86, 72, "Machine Learning · learns patterns from data", "", "start")}</g>`,
      `<g class="s3">${R(116, 84, 408, 124, "f3", 18)}${T(136, 110, "Deep Learning · neural networks", "", "start")}</g>`,
      `<g class="s4">${R(166, 122, 308, 76, "f4", 16)}${T(320, 158, "Generative AI", "tb")}${T(320, 180, "creates text, images, code", "tm ts")}</g>`
    ].join(""), "Nested circles: AI contains machine learning, which contains deep learning, which contains generative AI")
  };

  V["git-github"] = {
    caption: ["Each dot is a commit (a save point). A branch lets you try something safely, then merge it back and push to GitHub.", "Har dot ek commit (save point) hai. Branch se aap safely kuch try karte ho, phir merge karke GitHub pe push karte ho."],
    svg: svg("git", 210, [
      `<path d="M40 120 H600" class="ln"/>`, T(40, 104, "main", "tm ts", "start"),
      `<path d="M210 120 C250 120 250 60 290 60 H420 C460 60 460 120 500 120" class="ln la"/>`, T(300, 44, "branch: try-new-model", "tm ts", "start"),
      ...[[90, "s1"], [160, "s2"], [210, "s3"]].map(([x, s]) => `<circle cx="${x}" cy="120" r="10" class="c-main ${s}"/>`),
      ...[[320, "s4"], [390, "s5"]].map(([x, s]) => `<circle cx="${x}" cy="60" r="10" class="c-br ${s}"/>`),
      `<circle cx="500" cy="120" r="12" class="c-ok s6"/>`, `<g class="s6">${T(500, 152, "merge ✓", "ts")}</g>`,
      `<g class="s7">${A("git", "M560 112 L600 70")}${box(560, 18, 74, 38, "GitHub", "ba")}${T(540, 90, "push", "tm ts")}</g>`,
      T(90, 152, "commit", "tm ts"), T(160, 152, "commit", "tm ts")
    ].join(""), "Git commit graph: commits on main, a branch with two commits merged back, then pushed to GitHub")
  };

  V["stats-center-spread"] = {
    caption: ["Nine salaries sit at ₹30k. When one ₹10 lakh salary arrives, the mean jumps to ₹127k but the median stays at ₹30k.", "Nau salaries ₹30k pe hain. Jab ek ₹10 lakh ki salary aati hai, mean ₹127k pe kood jaata hai, lekin median ₹30k pe hi rehta hai."],
    svg: svg("st", 220, [
      `<path d="M40 170 H600" class="ln"/>`,
      ...[0, 200, 400, 600, 800, 1000].map(v => `${`<path d="M${40 + v * 0.56} 166 V174" class="ln"/>`}${T(40 + v * 0.56, 192, `₹${v}k`, "tm ts")}`),
      ...Array.from({ length: 9 }, (_, i) => `<circle cx="57" cy="${156 - i * 13}" r="6" class="c-main"/>`),
      `<g class="drop"><circle cx="600" cy="156" r="7" class="c-warn"/>${T(600, 136, "₹1000k", "ts")}</g>`,
      `<path d="M57 40 V172" class="mk-ok"/>`, `${T(66, 34, "Median ₹30k", "ok", "start")}`,
      `<g class="mean"><path d="M111 60 V172" class="mk-warn"/>${T(120, 74, "Mean ₹127k", "warn", "start")}</g>`
    ].join(""), "Number line: nine dots at 30 thousand, one outlier at 1000 thousand; the mean marker moves right, the median stays")
  };

  V["sql-joins"] = {
    caption: ["INNER JOIN keeps only customers who have orders (the overlap). LEFT JOIN keeps every customer, with or without orders.", "INNER JOIN sirf un customers ko rakhta hai jinke orders hain (overlap). LEFT JOIN har customer ko rakhta hai, orders hon ya na hon."],
    svg: svg("sj", 230, [
      `<defs><clipPath id="sj-clip"><circle cx="250" cy="125" r="90"/></clipPath></defs>`,
      `<g class="alt1"><circle cx="390" cy="125" r="90" class="hl" clip-path="url(#sj-clip)"/>${T(320, 26, "INNER JOIN · only matching rows", "tb")}</g>`,
      `<g class="alt2"><circle cx="250" cy="125" r="90" class="hl"/>${T(320, 26, "LEFT JOIN · every customer + matches", "tb")}</g>`,
      `<circle cx="250" cy="125" r="90" class="ring"/>`, `<circle cx="390" cy="125" r="90" class="ring"/>`,
      T(200, 130, "customers"), T(445, 130, "orders"), T(320, 130, "match", "ts")
    ].join(""), "Venn diagram of customers and orders, highlighting the overlap for INNER JOIN and the whole customers circle for LEFT JOIN")
  };

  V["ml-how-machines-learn"] = {
    caption: ["Labelled examples go into training, which produces a model. The model then predicts the label for a new example it has never seen.", "Label wale examples training mein jaate hain, jisse model banta hai. Phir model ek naye, pehle kabhi na dekhe example ka label predict karta hai."],
    svg: svg("ml", 230, [
      `<g>${R(16, 20, 190, 120, "b")}${T(111, 42, "Examples (training data)", "ts tb")}${T(28, 68, "🥭 yellow, soft → sweet", "ts", "start")}${T(28, 92, "🥭 green, hard → not sweet", "ts", "start")}${T(28, 116, "… thousands more", "tm ts", "start")}</g>`,
      A("ml", "M210 80 H262", "fl"),
      `<g>${R(268, 44, 110, 72, "ba")}<text x="300" y="88" class="spin" text-anchor="middle" style="font-size:24px">⚙️</text>${T(345, 86, "Training", "ts")}</g>`,
      A("ml", "M382 80 H434", "fl"),
      box(440, 44, 110, 72, "Model", "bo", "", "learned patterns"),
      `<g class="s3">${T(495, 206, "New: 🥭 yellow, soft", "ts")}${A("ml", "M495 190 V122", "fl")}</g>`,
      `<g class="s4">${A("ml", "M554 80 H600", "ln")}${T(590, 64, "Sweet ✓", "ok tb")}${T(590, 104, "0.92", "tm ts")}</g>`
    ].join(""), "Flow: labelled mango examples go into training, which makes a model; a new mango goes into the model, which predicts sweet")
  };

  V["ml-train-test"] = {
    caption: ["Split the data first: the model learns from 80% and is judged on the 20% it never saw. A big gap between the two scores means overfitting.", "Pehle data split karo: model 80% se seekhta hai aur us 20% pe judge hota hai jo usne kabhi nahi dekha. Dono scores mein bada gap matlab overfitting."],
    svg: svg("tt", 210, [
      ...Array.from({ length: 10 }, (_, i) => `<rect x="${30 + i * 58}" y="40" width="48" height="48" rx="8" class="${i < 8 ? "f2" : "f4"} ${i < 8 ? "s2" : "s3"}"/>`),
      ...Array.from({ length: 10 }, (_, i) => `<rect x="${30 + i * 58}" y="40" width="48" height="48" rx="8" class="ring-thin"/>`),
      `<g class="s2">${T(255, 112, "Train · 80% · the model studies these", "ts")}</g>`,
      `<g class="s3">${T(553, 112, "Test · 20% 🔒", "ts")}</g>`,
      `<g class="s5">${T(170, 160, "Train score 0.99", "tb")}${T(470, 160, "Test score 0.71", "tb warn")}</g>`,
      `<g class="s6">${T(320, 194, "Big gap → overfitting (memorised, not learned)", "warn")}</g>`
    ].join(""), "Ten blocks: eight become training data, two become hidden test data; train score 0.99 vs test score 0.71 shows overfitting")
  };

  V["ml-metrics"] = {
    caption: ["Out of 1,000 payments, 10 are fraud. The model flags 20 and 8 of those are real. Precision looks across the 'flagged' row, recall down the 'actually fraud' column.", "1,000 payments mein se 10 fraud hain. Model 20 flag karta hai, jinmein 8 asli hain. Precision 'flagged' row mein dekhta hai, recall 'actually fraud' column mein."],
    svg: svg("cm", 250, [
      T(330, 22, "Actually fraud", "ts tm"), T(470, 22, "Actually genuine", "ts tm"),
      T(185, 78, "Model: fraud", "ts tm", "end"), T(185, 158, "Model: genuine", "ts tm", "end"),
      `<g>${R(260, 34, 140, 70, "bo")}${T(330, 66, "8", "big")}${T(330, 88, "caught ✓", "ts")}</g>`,
      `<g>${R(400, 34, 140, 70, "bw")}${T(470, 66, "12", "big")}${T(470, 88, "false alarms", "ts")}</g>`,
      `<g>${R(260, 114, 140, 70, "bw")}${T(330, 146, "2", "big")}${T(330, 168, "missed", "ts")}</g>`,
      `<g>${R(400, 114, 140, 70, "b")}${T(470, 146, "978", "big")}${T(470, 168, "correctly ignored", "ts")}</g>`,
      `<g class="alt1">${R(254, 28, 292, 82, "hl-box", 14)}${T(320, 222, "Precision = 8 / (8 + 12) = 40%  · few false alarms?", "tb")}</g>`,
      `<g class="alt2">${R(254, 28, 152, 162, "hl-box", 14)}${T(320, 222, "Recall = 8 / (8 + 2) = 80%  · few misses?", "tb")}</g>`
    ].join(""), "Confusion matrix with 8 caught, 12 false alarms, 2 missed and 978 correctly ignored; highlights the precision row, then the recall column")
  };

  V["math-gradients"] = {
    caption: ["Training is a ball rolling down the loss curve: each step goes downhill, and the learning rate sets the step size. It stops at the lowest loss.", "Training ek ball jaisi hai jo loss curve pe neeche lud rahi hai: har step dhalaan pe neeche jaata hai, aur learning rate step ka size tay karta hai. Woh sabse kam loss pe rukti hai."],
    svg: svg("gd", 230, [
      `<path d="M60 40 Q320 340 580 40" class="curve"/>`,
      T(30, 30, "loss ↑", "tm ts", "start"), T(320, 222, "model parameter (weight) →", "tm ts"),
      `<circle cx="320" cy="178" r="11" class="ball"/>`,
      `<g class="s6">${T(320, 160, "lowest loss ✓", "ok tb")}</g>`,
      T(430, 120, "each step: move downhill", "ts", "start"), T(430, 140, "step size = learning rate", "tm ts", "start")
    ].join(""), "A ball rolls down a U-shaped loss curve in steps until it reaches the lowest point")
  };

  V["dl-neural-networks"] = {
    caption: ["Signals flow left to right: pixels → simple patterns (edges) → bigger patterns (loops) → the answer. Training adjusts every connection's weight.", "Signals left se right jaate hain: pixels → simple patterns (edges) → bade patterns (loops) → jawaab. Training har connection ka weight adjust karti hai."],
    svg: (() => {
      const L1 = [50, 95, 140, 185].map(y => [110, y]);
      const L2 = [40, 80, 120, 160, 200].map(y => [320, y]);
      const L3 = [85, 155].map(y => [530, y]);
      const lines = (a, b) => a.flatMap(([x1, y1]) => b.map(([x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" class="ln-thin"/>`)).join("");
      const nodes = (pts, g) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" class="node"/><circle cx="${x}" cy="${y}" r="13" class="glow ${g}"/>`).join("");
      return svg("nn", 236, [
        lines(L1, L2), lines(L2, L3), nodes(L1, "g1"), nodes(L2, "g2"), nodes(L3, "g3"),
        T(110, 226, "input · pixels", "tm ts"), T(320, 226, "hidden · patterns", "tm ts"), T(530, 226, "output · digit", "tm ts"),
        T(552, 90, "7: 0.03", "ts", "start"), T(552, 160, "9: 0.94 ✓", "ts ok", "start")
      ].join(""), "Neural network with input, hidden and output layers; activity flows from left to right and the output says 9");
    })()
  };

  V["dl-transformers"] = {
    caption: ["When the model reads 'it', attention links it to every other word. The strongest link is to 'trophy', so the model understands 'it' means the trophy.", "Jab model 'it' padhta hai, attention use baaki har word se jodta hai. Sabse strong link 'trophy' se hai, isliye model samajhta hai ki 'it' ka matlab trophy hai."],
    svg: (() => {
      const words = [["The", 42], ["trophy", 90], ["didn't", 150], ["fit", 198], ["in", 230], ["the", 262], ["suitcase", 318], ["because", 390], ["it", 438], ["was", 470], ["too", 506], ["big", 542]];
      const arc = (to, h, cls) => `<path d="M438 150 Q${(438 + to) / 2} ${150 - h} ${to} 150" class="${cls}"/>`;
      return svg("tf", 220, [
        arc(42, 40, "att a1"), arc(198, 60, "att a1"), arc(262, 50, "att a1"), arc(542, 40, "att a1"), arc(470, 20, "att a1"),
        arc(318, 70, "att a2"), arc(90, 130, "att a3 pulse-stroke"),
        ...words.map(([w, x]) => T(x, 172, w, w === "it" ? "tb hl-t" : w === "trophy" ? "tb ok" : "")),
        T(320, 206, "attention from 'it' → strongest to 'trophy'", "tm ts")
      ].join(""), "Sentence with arcs from the word it to other words; the thickest arc goes to trophy");
    })()
  };

  V["llm-what"] = {
    caption: ["An LLM scores every possible next token, picks one (here 'ginger'), adds it to the text, and repeats, one token at a time.", "LLM har possible agle token ko score karta hai, ek chunta hai (yahan 'ginger'), use text mein jodta hai, aur repeat karta hai, ek-ek token karke."],
    svg: svg("lm", 230, [
      `<g>${R(20, 18, 600, 44, "b")}${T(40, 46, "Chai is best with", "", "start")}<g class="s5">${T(186, 46, "ginger", "tb ok", "start")}</g><rect x="240" y="30" width="2" height="22" class="cursor"/></g>`,
      T(40, 92, "next-token probabilities", "tm ts", "start"),
      ...[["ginger", 0.41, "bo"], ["biscuits", 0.32, "f2"], ["friends", 0.12, "f2"], ["rain", 0.08, "f2"]].map(([w, p, c], i) =>
        `${T(120, 122 + i * 28, w, "ts", "end")}<rect x="130" y="${108 + i * 28}" width="${p * 900}" height="18" rx="5" class="${c} grow"/>${T(140 + p * 900, 122 + i * 28, `${Math.round(p * 100)}%`, "ts tm", "start")}`),
      `<g class="s5">${T(604, 46, "picked ✓", "ok tb ts", "end")}</g>`
    ].join(""), "Bars show next-word probabilities: ginger 41 percent, biscuits 32, friends 12, rain 8; ginger is appended to the sentence")
  };

  V["llm-tool-use"] = {
    caption: ["The model never calls the API itself. It asks your code to, your code runs it, and the model writes the answer from the result.", "Model khud API call nahi karta. Woh aapke code se kehta hai, aapka code chalata hai, aur model result se jawaab likhta hai."],
    svg: (() => {
      const xs = { u: 70, m: 240, c: 410, a: 570 };
      const lane = (k, label) => `${T(xs[k], 22, label, "tb ts")}<path d="M${xs[k]} 32 V232" class="lane"/>`;
      const msg = (from, to, y, label, s) => `<g class="${s}">${A("tu", `M${xs[from]} ${y} L${xs[to] + (xs[to] > xs[from] ? -6 : 6)} ${y}`, "ln la")}${T((xs[from] + xs[to]) / 2, y - 6, label, "ts")}</g>`;
      return svg("tu", 240, [
        lane("u", "User"), lane("m", "LLM"), lane("c", "Your code"), lane("a", "Orders API"),
        msg("u", "m", 58, "Where is order A123?", "s1"),
        msg("m", "c", 90, "tool_call get_order_status(A123)", "s2"),
        msg("c", "a", 122, "GET /orders/A123", "s3"),
        msg("a", "c", 154, "out for delivery · 7:40 pm", "s4"),
        msg("c", "m", 186, "tool result", "s5"),
        msg("m", "u", 218, "Arriving by 7:40 pm 🛵", "s6")
      ].join(""), "Sequence diagram: user asks the LLM, the LLM requests a tool call, your code calls the orders API, and the answer flows back to the user");
    })()
  };

  V["llm-agents"] = {
    caption: ["An agent loops: think about the next step, act with a tool, observe the result, and repeat, until the goal is met or a step limit stops it.", "Agent loop mein chalta hai: agla step socho, tool se act karo, result dekho, aur repeat karo, jab tak goal poora na ho ya step limit na rok de."],
    svg: svg("ag", 240, [
      `<circle cx="150" cy="122" r="80" class="ring"/>`,
      box(95, 18, 110, 40, "🧠 Think", "ba"), box(200, 162, 110, 40, "🛠️ Act (tool)", "bo"), box(0, 162, 110, 40, "👀 Observe", "bw"),
      dot("M150 42 A80 80 0 1 1 149.9 42", 4),
      T(150, 128, "loop", "tm ts"),
      `<g>${R(330, 18, 296, 204, "b")}${T(346, 42, "Goal: 3 cafés open after 10 pm", "tb ts", "start")}</g>`,
      ...["1 · search_places('cafés')", "2 · 12 results", "3 · get_hours() for each", "4 · filter rating ≥ 4.2 → 3", "5 · ✓ final answer"].map((l, i) =>
        `<g class="s${i + 1}">${T(346, 72 + i * 26, l, i === 4 ? "ts ok tb" : "ts", "start")}</g>`),
      T(346, 210, "guardrail: max_steps = 8", "tm ts", "start")
    ].join(""), "A loop of think, act and observe, with a step log on the right ending in a final answer")
  };

  V["embeddings"] = {
    caption: ["Each text becomes a point. Similar meanings land close together, so the question finds the refund article even though they share no keywords.", "Har text ek point ban jaata hai. Milte-julte matlab paas-paas aate hain, isliye sawaal ko refund wala article mil jaata hai, chahe ek bhi keyword common na ho."],
    svg: svg("em", 236, [
      R(16, 12, 608, 212, "bm", 14),
      ...[[120, 60, "UPI payment failed"], [160, 92, "Card declined"]].map(([x, y, l]) => `<circle cx="${x}" cy="${y}" r="7" class="c-main"/>${T(x + 12, y + 4, l, "ts", "start")}`),
      ...[[60, 178, "Track my delivery"], [110, 204, "Delivery is late"]].map(([x, y, l]) => `<circle cx="${x}" cy="${y}" r="7" class="c-main"/>${T(x + 12, y + 4, l, "ts", "start")}`),
      ...[[400, 70, "Refund policy for broken products"], [420, 108, "Raise a replacement request"]].map(([x, y, l]) => `<circle cx="${x}" cy="${y}" r="7" class="c-ok"/>${T(x + 12, y + 4, l, "ts", "start")}`),
      `<g class="s3"><path d="M330 128 L394 76" class="ln la fl"/><circle cx="330" cy="128" r="9" class="c-warn pulse"/>${T(330, 154, "Q: “How do I return a damaged item?”", "ts tb")}</g>`,
      `<g class="s4">${T(520, 40, "nearest = most similar ✓", "ok ts", "middle")}</g>`
    ].join(""), "Scatter of text embeddings in clusters for payments, delivery and refunds; a question point lands next to the refund policy")
  };

  V["rag"] = {
    caption: ["Indexing happens once: documents → chunks → embeddings → vector DB. For each question, retrieve the best chunks, add them to the prompt, and answer with the source.", "Indexing ek baar hoti hai: documents → chunks → embeddings → vector DB. Har sawaal pe sabse acche chunks retrieve karo, prompt mein jodo, aur source ke saath jawaab do."],
    svg: svg("rg", 236, [
      `<g>${R(16, 12, 608, 44, "bm", 10)}${T(320, 40, "Indexing (once): 📄 documents → ✂️ chunks → 🔢 embeddings → 🗄️ vector DB", "ts")}</g>`,
      ...[["❓ Question", 16], ["🔢 Embed", 140], ["🔎 Search", 264], ["🧩 Prompt", 388], ["✅ Answer", 512]].map(([l, x], i) =>
        `<g class="s${i + 1}">${R(x, 96, 112, 56, i === 4 ? "bo" : i === 2 ? "ba" : "b")}${T(x + 56, 129, l, "ts")}</g>`),
      ...[128, 252, 376, 500].map(x => A("rg", `M${x} 124 H${x + 10}`, "ln")),
      `<path d="M320 56 V94" class="ln la fl"/>`,
      dot("M72 124 H568", 4),
      T(320, 196, "“New joiners get 8 casual leaves [HR-Policy §4.2]”", "ts ok"),
      T(320, 222, "if nothing relevant is found → say so (don't guess)", "tm ts")
    ].join(""), "RAG pipeline: question, embed, search the vector database, add chunks to the prompt, answer with a source")
  };

  V["api-serving"] = {
    caption: ["Apps never touch the model directly. They send a request to the API endpoint, the API runs the model, and a JSON response comes back.", "Apps model ko seedha nahi chhooti. Woh API endpoint ko request bhejti hain, API model chalati hai, aur JSON response wapas aata hai."],
    svg: svg("api", 210, [
      box(16, 70, 110, 64, "📱 App", "b"),
      box(260, 60, 130, 84, "FastAPI", "ba", "", "POST /predict"),
      box(514, 70, 110, 64, "🧠 model.pkl", "bo"),
      A("api", "M128 88 H254", "ln la"), A("api", "M394 92 H508", "ln"), A("api", "M508 114 H398", "ln"), A("api", "M254 118 H132", "ln la"),
      T(192, 78, "{area: 900, bhk: 2}", "ts"), T(192, 140, "{price_lakh: 70.2}", "ts ok"),
      dot("M128 88 H254 M394 92 H508 M508 114 H398 M254 118 H132", 4),
      T(320, 186, "validate input · load model once · log every request", "tm ts")
    ].join(""), "An app sends a request with flat details to a FastAPI endpoint, which calls the model and returns a price as JSON")
  };

  V["docker"] = {
    caption: ["Your code, the exact Python version and the libraries are packed into one image, so the container runs the same on a laptop, a server or the cloud.", "Aapka code, exact Python version aur libraries ek image mein pack hote hain, isliye container laptop, server ya cloud pe ek jaisa chalta hai."],
    svg: svg("dk", 220, [
      ...[["app.py", 30], ["Python 3.12", 80], ["pandas · xgboost", 130]].map(([l, y], i) => `<g class="s${i + 1}">${box(16, y, 150, 36, l, "b")}</g>`),
      `<g class="s4">${A("dk", "M172 110 H230", "fl")}${R(236, 56, 170, 110, "ba", 14)}${T(321, 104, "📦 image", "tb")}${T(321, 128, "everything it needs", "tm ts")}</g>`,
      ...[["💻 Laptop", 28], ["🖥️ Server", 92], ["☁️ Cloud", 156]].map(([l, y], i) => `<g class="s${i + 5}">${A("dk", `M410 110 L470 ${y + 18}`, "ln")}${box(476, y, 148, 36, `${l} ✓`, "bo")}</g>`)
    ].join(""), "Code, Python and libraries go into one container image, which then runs the same on a laptop, a server and the cloud")
  };

  V["kubernetes"] = {
    caption: ["As traffic rises, the autoscaler adds pods. When a pod crashes, Kubernetes replaces it automatically, so the desired state is always kept.", "Traffic badhne pe autoscaler pods jodta hai. Pod crash ho to Kubernetes use apne aap replace kar deta hai, aur desired state hamesha bani rehti hai."],
    svg: svg("k8", 226, [
      T(16, 28, "Traffic", "ts tm", "start"), `<rect x="80" y="16" width="520" height="16" rx="8" class="bm"/><rect x="80" y="16" width="520" height="16" rx="8" class="fw grow"/>`,
      ...[0, 1, 2, 3, 4].map(i => `<g class="${i < 3 ? "" : `s${i + 1}`}">${R(40 + i * 118, 70, 100, 70, "bo", 12)}${T(90 + i * 118, 102, "pod", "tb")}${T(90 + i * 118, 124, "price-api", "tm ts")}</g>`),
      `<g class="crash">${R(158, 70, 100, 70, "bw", 12)}${T(208, 110, "crashed ✗", "warn tb")}</g>`,
      T(320, 176, "Deployment: replicas 3 → 5 (autoscaler)", "tb ts"),
      T(320, 202, "crashed pod → replaced automatically", "tm ts")
    ].join(""), "Traffic bar fills up while pods grow from three to five; a crashed pod is replaced")
  };

  V["data-pipelines"] = {
    caption: ["Like Mumbai's dabbawalas: every night, data is picked up from sources, cleaned and joined, then delivered to the warehouse that dashboards and models use.", "Mumbai ke dabbawalon jaisa: har raat data sources se uthaaya jaata hai, clean aur join hota hai, phir warehouse tak pahunchaaya jaata hai jise dashboards aur models use karte hain."],
    svg: svg("dp", 226, [
      ...[["App DB", 22], ["Payments API", 82], ["CSV files", 142]].map(([l, y]) => box(16, y, 120, 40, l, "b")),
      ...[[42, 86], [102, 102], [162, 118]].map(([y, to]) => A("dp", `M140 ${y} L196 ${to}`, "fl")),
      box(202, 72, 120, 60, "Transform", "ba", "", "clean · join"),
      A("dp", "M326 102 H382", "fl"),
      box(388, 72, 120, 60, "🏬 Warehouse", "bo"),
      A("dp", "M512 92 L540 60", "ln"), A("dp", "M512 112 L540 146", "ln"),
      box(544, 30, 80, 40, "📊", "b"), box(544, 128, 80, 40, "🤖 ML", "b"),
      T(320, 206, "⏰ runs daily at 2:00 AM · retries · alerts if late", "tm ts")
    ].join(""), "Sources flow into a transform step and then a warehouse, which feeds dashboards and ML models, on a nightly schedule")
  };

  V["ab-testing"] = {
    caption: ["Users are split at random: half see the old version (A), half the new one (B). Because the split is random, the difference in results is caused by the feature.", "Users random tarah se baante jaate hain: aadhe purana version (A) dekhte hain, aadhe naya (B). Split random hai, isliye results ka fark feature ki wajah se hai."],
    svg: svg("ab", 226, [
      ...Array.from({ length: 10 }, (_, i) => `<circle cx="${40 + (i % 5) * 26}" cy="${70 + Math.floor(i / 5) * 30}" r="10" class="c-main"/>`),
      T(92, 140, "users", "tm ts"),
      `<g class="s2">${T(220, 64, "🎲 random", "ts")}${A("ab", "M180 80 L280 44", "ln")}${A("ab", "M180 100 L280 150", "ln")}</g>`,
      `<g class="s3">${box(286, 20, 140, 50, "A · old replies", "f2")}${box(286, 126, 140, 50, "B · AI replies", "bo")}</g>`,
      `<g class="s4">${T(450, 50, "9.1 min", "tb", "start")}<rect x="520" y="36" width="91" height="18" rx="5" class="f2 grow"/></g>`,
      `<g class="s4">${T(450, 156, "6.8 min", "tb ok", "start")}<rect x="520" y="142" width="68" height="18" rx="5" class="bo grow"/></g>`,
      `<g class="s6">${T(320, 212, "handling time ↓ 25% · significant ✓ · CSAT unchanged", "ok ts")}</g>`
    ].join(""), "Users are split randomly into group A and group B; group B's handling time is shorter")
  };

  V["mlops-monitoring"] = {
    caption: ["Nothing crashed, but the inputs drifted during the festival season. Monitoring catches the line crossing the alert threshold before accuracy quietly falls apart.", "Kuch crash nahi hua, lekin tyohaar ke season mein inputs drift ho gaye. Monitoring alert threshold paar hone pe line pakad leti hai, isse pehle ki accuracy chupchaap gir jaaye."],
    svg: svg("mo", 226, [
      `<path d="M50 190 H610 M50 190 V20" class="ln"/>`,
      T(56, 30, "avg transaction ₹", "tm ts", "start"), T(610, 212, "weeks →", "tm ts", "end"),
      `<path d="M50 80 H610" class="mk-warn"/>`, T(58, 72, "alert threshold", "warn ts", "start"),
      `<path d="M50 150 L120 146 L190 152 L260 144 L330 148 L400 140 L450 118 L500 84 L550 60 L610 48" class="series draw"/>`,
      `<g class="s5">${T(470, 56, "🚨", "pulse big")}${T(604, 178, "drift detected → retrain", "warn ts tb", "end")}</g>`
    ].join(""), "Line chart of average transaction amount, flat for weeks and then rising past an alert threshold")
  };

  V["rag-advanced"] = {
    caption: ["Hybrid search combines exact keyword matches (BM25) with meaning matches (vectors), then a reranker scores the top candidates to hand only the best 5 chunks to the LLM.", "Hybrid search exact shabd matches (BM25) aur matlab matches (vectors) ko milata hai, phir reranker top candidates ko score karke sirf sabse acche 5 chunks LLM ko deta hai."],
    svg: svg("ra", 226, [
      box(16, 78, 108, 52, "❓ Query", "b", "s1", "code + meaning"),
      `<g class="s2">${A("ra", "M128 92 L182 54", "fl")}${A("ra", "M128 116 L182 154", "fl")}</g>`,
      box(188, 28, 132, 48, "🔤 BM25", "b", "s2", "exact keywords"),
      box(188, 132, 132, 48, "🧭 Vector", "b", "s2", "semantic meaning"),
      `<g class="s3">${A("ra", "M324 52 L368 92", "fl")}${A("ra", "M324 156 L368 116", "fl")}</g>`,
      box(374, 74, 128, 60, "⚖️ Reranker", "ba", "s4", "top 40 → top 5"),
      `<g class="s5">${A("ra", "M506 104 H536", "fl")}${box(542, 74, 86, 60, "🤖 LLM", "bo", "", "cited ✓")}</g>`,
      T(320, 208, "permission filter first · Recall@k (retrieval) + Faithfulness (answer)", "tm ts")
    ].join(""), "A query splits into BM25 keyword search and vector semantic search, merges into a reranker that narrows top 40 to top 5, and feeds the LLM")
  };

  V["agent-workflows"] = {
    caption: ["A state graph keeps the agent on safe rails: small tasks run automatically, while high-risk actions pause at a checkpoint until a human approves.", "State graph agent ko safe patari pe rakhta hai: chhote kaam apne aap chalte hain, jabki risky actions checkpoint pe ruk kar insaan ki approval ka wait karte hain."],
    svg: svg("aw", 226, [
      box(16, 78, 110, 52, "1. Classify", "b", "s1", "state saved"),
      `<g class="s2">${A("aw", "M130 104 H168", "fl")}${box(174, 78, 118, 52, "2. Order Tool", "ba", "", "Pydantic ✓")}</g>`,
      `<g class="s3">${A("aw", "M296 92 L346 52", "fl")}${A("aw", "M296 116 L346 154", "fl")}</g>`,
      box(352, 26, 138, 48, "≤ ₹500: Auto", "bo", "s4", "instant refund"),
      box(352, 134, 138, 48, "> ₹500: Pause", "bw", "s4", "human approval"),
      `<g class="s5">${A("aw", "M494 50 L534 92", "ln")}${A("aw", "M494 158 L534 116", "ln")}${box(540, 78, 88, 52, "Send ✓", "bo")}</g>`,
      T(320, 210, "checkpointed state · max_steps = 6 · human-in-the-loop gate", "tm ts")
    ].join(""), "State graph flowing from Classify to Order Tool, branching into auto-process for small refunds or a human approval pause for large refunds, then sending")
  };

  V["ml-system-design"] = {
    caption: ["Two-stage funnel: fast candidate retrieval narrows 10 million items to 300 in milliseconds, so the heavy ranking model can score those 300 within the 100 ms budget.", "Two-stage funnel: tez candidate retrieval milliseconds mein 1 crore items ko 300 pe le aata hai, taaki bhaari ranking model 100 ms budget ke andar un 300 ko score kar sake."],
    svg: svg("sd", 226, [
      box(16, 62, 132, 84, "10M items", "b", "s1", "full catalogue"),
      `<g class="s2">${A("sd", "M152 104 H192", "fl")}${box(198, 68, 136, 72, "1. Retrieve", "ba", "", "ANN · 300 items · 25ms")}</g>`,
      `<g class="s3">${A("sd", "M338 104 H378", "fl")}${box(384, 74, 128, 60, "2. Rank", "ba", "", "GBDT · 30 items · 45ms")}</g>`,
      `<g class="s4">${A("sd", "M516 104 H544", "fl")}${box(550, 78, 78, 52, "Top 10", "bo", "", "diverse ✓")}</g>`,
      T(320, 198, "Total latency ~80 ms (< 100 ms SLA) · online feature store + fallback", "tm ts")
    ].join(""), "Funnel narrowing 10 million items to 300 in candidate retrieval, then 30 in ranking, and finally the top 10 shown to the user")
  };

  V["feature-stores"] = {
    caption: ["One feature definition writes historical values to the offline warehouse for point-in-time training and the latest values to the online store for millisecond live inference.", "Ek hi feature definition purani values ko point-in-time training ke liye offline warehouse mein aur latest values ko millisecond live inference ke liye online store mein likhti hai."],
    svg: svg("fs", 226, [
      box(18, 76, 150, 56, "Feature Recipe", "ba", "s1", "defined once"),
      `<g class="s2">${A("fs", "M172 92 L232 52", "fl")}${A("fs", "M172 116 L232 156", "fl")}</g>`,
      box(238, 24, 166, 54, "🏬 Offline Store", "b", "s3", "point-in-time history"),
      box(238, 130, 166, 54, "⚡ Online Store", "bo", "s3", "Redis · < 5 ms"),
      `<g class="s4">${A("fs", "M408 51 H458", "fl")}${box(464, 26, 160, 50, "🏋️ Model Training", "b", "", "zero leakage")}</g>`,
      `<g class="s5">${A("fs", "M408 157 H458", "fl")}${box(464, 132, 160, 50, "🚀 Live Serving", "bo", "", "zero skew ✓")}</g>`,
      T(320, 210, "same formula in training and production → no training-serving skew", "tm ts")
    ].join(""), "A shared feature recipe feeds both an offline store for model training and a low-latency online store for live serving")
  };

  // ---------- AI Product Engineer lessons ----------
  V["ai-chat-ui"] = {
    caption: ["The browser sends the question to your server route, the server streams the model's words back over SSE, and each word appears as it arrives. Stop cancels the request and the model call.", "Browser sawaal aapke server route ko bhejta hai, server model ke words SSE se wapas stream karta hai, aur har word aate hi dikhta hai. Stop request aur model call dono cancel karta hai."],
    svg: svg("cu", 250, [
      box(16, 18, 150, 54, "🖥️ Browser", "b", "", "useChat()"),
      box(246, 18, 150, 54, "⚙️ /api/chat", "ba", "", "key stays here"),
      box(476, 18, 148, 54, "🧠 Model", "bo", "", "stream: true"),
      A("cu", "M168 38 H240", "ln la"), A("cu", "M398 38 H470", "ln"),
      A("cu", "M470 56 H402", "fl"), A("cu", "M240 56 H172", "fl"),
      T(320, 92, "tokens flow back over SSE", "tm ts"),
      dot("M470 56 H172", 2.2),
      `<g>${R(16, 110, 420, 92, "bm", 14)}</g>`,
      T(34, 136, "🤖", "", "start"),
      `<g class="s1">${T(62, 136, "Your order", "", "start")}</g>`,
      `<g class="s2">${T(146, 136, "A12345", "hl-t", "start")}</g>`,
      `<g class="s3">${T(208, 136, "ships", "", "start")}</g>`,
      `<g class="s4">${T(254, 136, "tomorrow.", "", "start")}</g>`,
      `<g class="s5">${R(34, 150, 230, 40, "b", 10)}${T(149, 175, "📦 Order card (generative UI)", "ts")}</g>`,
      `<g class="pulse">${R(462, 112, 162, 38, "bw", 19)}${T(543, 136, "⏹ Stop", "tb")}</g>`,
      `<g>${R(462, 160, 162, 38, "b", 19)}${T(543, 184, "↻ Regenerate", "")}</g>`,
      T(320, 232, "status: submitted → streaming → done / stopped / error", "tm ts")
    ].join(""), "A browser chat sends a question to a server route that calls the model; words stream back one by one, a tool result shows as an order card, and Stop and Regenerate buttons sit beside the answer")
  };

  V["structured-output"] = {
    caption: ["The model fills a schema instead of writing free text. Your code validates it: valid data is saved, an invalid answer gets one retry with the error, and anything still wrong goes to a person.", "Model khula text likhne ki jagah schema bharta hai. Aapka code use validate karta hai: sahi data save hota hai, galat jawaab ko error ke saath ek retry milta hai, aur phir bhi galat ho to insaan ke paas jaata hai."],
    svg: svg("so", 250, [
      box(16, 70, 112, 60, "📧 Email", "b", "s1"),
      box(160, 60, 130, 80, "🧠 Model", "ba", "s2", "+ schema"),
      `<g class="s3">${R(322, 40, 150, 120, "b", 10)}${T(334, 64, "{", "", "start")}${T(346, 84, "category: \"billing\"", "ts", "start")}${T(346, 104, "orderId: null", "ts ok", "start")}${T(346, 124, "urgency: 4", "ts", "start")}${T(334, 148, "}", "", "start")}</g>`,
      A("so", "M130 100 H154", "ln"), A("so", "M292 100 H316", "ln"),
      box(506, 70, 118, 60, "✅ Validate", "bo", "s4", "Zod / Pydantic"),
      A("so", "M474 100 H500", "ln la"),
      `<g class="s5">${A("so", "M565 132 V176", "ln")}${R(506, 180, 118, 40, "bo", 10)}${T(565, 205, "💾 Save", "ts")}</g>`,
      `<g class="s6">${A("so", "M520 68 C520 14 225 14 225 54", "mk-warn")}${T(372, 24, "✗ invalid → retry once with the error", "ts warn")}</g>`,
      `<g class="s7">${R(160, 180, 270, 40, "bw", 10)}${T(295, 205, "still wrong → 👩 human review", "ts")}</g>`,
      T(80, 236, "null = \"not found\"", "tm ts", "start")
    ].join(""), "An email goes to the model with a schema, which returns JSON; code validates it, saves valid data, retries once on an invalid answer, and sends anything still wrong to human review")
  };

  V["ts-ai-stack"] = {
    caption: ["The browser only talks to your server. The route checks the user, limits requests and validates input, then one wrapper calls the model and logs cost. Slow work goes to a queue.", "Browser sirf aapke server se baat karta hai. Route user check karta hai, requests limit karta hai aur input validate karta hai, phir ek wrapper model call karta hai aur cost log karta hai. Slow kaam queue mein jaata hai."],
    svg: svg("ts", 262, [
      box(16, 30, 120, 62, "🖥️ Browser", "b", "s1", "no API key"),
      `<g class="s2">${R(170, 14, 190, 96, "ba", 12)}${T(265, 38, "Route handler", "tb")}${T(265, 60, "🔐 auth · ⏱️ rate limit", "ts")}${T(265, 80, "✅ Zod validation", "ts")}${T(265, 100, "🔑 key from server env", "tm ts")}</g>`,
      box(394, 30, 112, 62, "📦 lib/ai.ts", "b", "s3", "log tokens · cost"),
      box(530, 30, 94, 62, "🧠 Model", "bo", "s4"),
      A("ts", "M138 61 H164", "ln la"), A("ts", "M362 61 H388", "ln"), A("ts", "M508 61 H524", "ln"),
      dot("M138 61 H164 M362 61 H388 M508 61 H524", 3),
      `<g class="s5">${A("ts", "M265 112 V150", "fl")}${box(190, 154, 150, 50, "📬 Queue → worker", "bw")}</g>`,
      `<g class="s6">${A("ts", "M342 179 H404", "ln")}${box(410, 154, 214, 50, "🐘 Postgres + pgvector", "b", "", "user_id · tenant_id")}</g>`,
      T(320, 240, "fast path streams · slow path (indexing, batch) runs in the background", "tm ts")
    ].join(""), "A browser with no key calls a Next.js route handler that authenticates, rate limits and validates, then a wrapper calls the model; slow work goes through a queue to Postgres with pgvector")
  };

  V["context-memory"] = {
    caption: ["Every call rebuilds the prompt from parts inside a token budget: rules first, then facts, memories and documents, a summary of old turns, the recent turns, and the question last.", "Har call token budget ke andar hisson se prompt dobara banati hai: pehle rules, phir baatein, memories aur documents, purane turns ki summary, haal ke turns, aur sawaal aakhir mein."],
    svg: svg("cm", 262, [
      T(16, 24, "One model call = a freshly built context", "tb", "start"),
      ...[["📜 Rules (stable, cached)", 120, "f2"], ["👤 User facts", 60, "f1"], ["🧠 Memories (with consent)", 90, "f3"], ["📄 Retrieved docs", 150, "f1"], ["🗜️ Summary of old turns", 70, "f4"], ["💬 Recent turns", 80, "f1"], ["❓ Question", 40, "ba"]]
        .map(([l, w, c], i) => {
          const y = 38 + i * 28;
          return `<g class="s${i + 1}">${R(16, y, w * 2.6, 22, c, 6)}${T(26, y + 16, l, "ts", "start")}</g>`;
        }),
      `<path d="M600 34 V238" class="mk-warn"/>`,
      T(596, 252, "token budget", "ts warn", "end"),
      T(470, 150, "filtered by user_id", "tm ts", "middle"),
      T(470, 168, "and tenant in code", "tm ts", "middle")
    ].join(""), "Stacked prompt parts: rules, user facts, memories, retrieved documents, a summary of old turns, recent turns and the question, all inside a token budget line")
  };

  V["llm-cost-latency"] = {
    caption: ["Check the cache first (with the user in the key). On a miss, a router sends easy requests to a small, cheap model and hard ones to the large model. Log cost and latency for every call.", "Pehle cache dekho (key mein user ke saath). Miss hone pe router aasaan requests chhote saste model ko aur mushkil requests bade model ko bhejta hai. Har call ki cost aur latency log karo."],
    svg: svg("cl", 262, [
      box(16, 100, 104, 56, "❓ Request", "b", "s1"),
      box(150, 96, 120, 64, "🗃️ Cache", "ba", "s2", "tenant:question"),
      A("cl", "M122 128 H144", "ln"),
      `<g class="s3">${A("cl", "M210 94 V52 H300", "mk-ok")}${R(306, 26, 160, 50, "bo", 10)}${T(386, 48, "hit → ~5 ms, ₹0", "ts ok")}${T(386, 66, "return saved answer", "tm ts")}</g>`,
      `<g class="s4">${A("cl", "M272 128 H322", "ln la")}${box(328, 100, 116, 56, "🔀 Router", "b", "", "how hard?")}</g>`,
      `<g class="s5">${A("cl", "M446 116 C480 116 480 88 504 88", "ln")}${box(508, 64, 116, 48, "🐇 Small model", "bo", "", "easy · cheap")}</g>`,
      `<g class="s6">${A("cl", "M446 140 C480 140 480 172 504 172", "ln")}${box(508, 150, 116, 48, "🐘 Large model", "bw", "", "hard tasks")}</g>`,
      dot("M122 128 H322 M446 116 C480 116 480 88 504 88", 3.2),
      `<g class="s7">${R(16, 212, 608, 36, "bm", 10)}${T(320, 235, "📊 log: tokens · ₹ per request · p50 / p95 · cache hit rate · prompt caching on the stable prefix", "ts")}</g>`
    ].join(""), "A request checks a cache keyed by tenant and question; a hit returns instantly, a miss goes to a router that picks a small model for easy tasks or a large model for hard ones, with cost and latency logged")
  };

  V["llm-reliability"] = {
    caption: ["A call times out or gets a 503. The app retries with growing waits, then the circuit breaker switches to a backup model, and if that fails too, users get a helpful non-AI path.", "Call time out hota hai ya 503 milta hai. App badhte intezaar ke saath retry karta hai, phir circuit breaker backup model pe switch karta hai, aur woh bhi fail ho to users ko kaam ka non-AI raasta milta hai."],
    svg: svg("rl", 250, [
      box(16, 26, 110, 56, "📨 Request", "b", "s1", "timeout 10 s"),
      box(160, 26, 130, 56, "🧠 Primary", "bw", "s2", "503 ✗"),
      A("rl", "M128 54 H154", "ln"),
      `<g class="s3">${T(225, 108, "retry 1 s → 2 s → 4 s", "ts warn")}${T(225, 126, "(only 429 · 5xx · timeout)", "tm ts")}</g>`,
      `<g class="s4">${R(320, 30, 118, 48, "bw", 24)}${T(379, 59, "⚡ breaker open", "ts")}</g>`,
      A("rl", "M292 54 H314", "ln"),
      `<g class="s5">${A("rl", "M440 54 H468", "ln la")}${box(474, 26, 150, 56, "🧠 Backup model", "bo", "", "same evals ✓")}</g>`,
      `<g class="s6">${A("rl", "M549 84 V150", "fl")}${R(330, 154, 294, 58, "bm", 12)}${T(477, 178, "still down → template + \"talk to a human\"", "ts")}${T(477, 198, "never a blank screen", "tm ts")}</g>`,
      `<g class="s7">${R(16, 154, 280, 58, "b", 12)}${T(156, 178, "🔑 idempotency key on actions", "ts")}${T(156, 198, "a retry never sends two refunds", "tm ts")}</g>`,
      T(320, 238, "alerts on error rate and fallback rate · test the outage path in staging", "tm ts")
    ].join(""), "A request to the primary model fails with 503, is retried with backoff, a circuit breaker opens and a backup model answers; if everything fails users get a template and a human option, and actions carry idempotency keys")
  };

  V["prompt-release"] = {
    caption: ["A new prompt version must pass the eval gate in CI, then goes to 5% of users behind a flag. If online signals stay healthy it grows to 25% and 100%; if not, one switch rolls it back.", "Naye prompt version ko CI mein eval gate paas karna hota hai, phir flag ke peeche 5% users ko jaata hai. Online signals theek rahein to 25% aur 100% tak badhta hai; nahi to ek switch se rollback."],
    svg: svg("pr", 262, [
      box(16, 30, 120, 56, "📝 support@v14", "b", "s1", "pull request"),
      `<g class="s2">${A("pr", "M138 58 H170", "ln")}${R(176, 18, 170, 80, "ba", 12)}${T(261, 42, "🧪 CI eval gate", "tb")}${T(261, 64, "faithfulness ≥ v13 − 2", "ts")}${T(261, 84, "format 100% · safety ✓", "ts ok")}</g>`,
      `<g class="s3">${A("pr", "M348 58 H380", "ln la")}${box(386, 30, 110, 56, "🚩 flag", "b", "", "v14 vs v13")}</g>`,
      T(16, 130, "traffic on v14", "tb", "start"),
      ...[["5%", 0.05, "s4"], ["25%", 0.25, "s5"], ["100%", 1, "s6"]].map(([l, f, s], i) =>
        `<g class="${s}">${R(16, 142 + i * 30, 420, 22, "f1", 6)}<rect x="16" y="${142 + i * 30}" width="${Math.max(12, 420 * f)}" height="22" rx="6" class="c-ok grow"/>${T(446, 158 + i * 30, l, "tb", "start")}</g>`),
      `<g class="s7">${R(500, 140, 124, 82, "bw", 12)}${T(562, 166, "↩ rollback", "tb")}${T(562, 188, "one switch,", "ts")}${T(562, 206, "no redeploy", "ts")}</g>`,
      T(320, 248, "watch 👎 rate · edits · escalations · p95 · cost before each step", "tm ts")
    ].join(""), "A prompt change passes an eval gate in CI, is released behind a feature flag to 5%, then 25% and 100% of traffic, with a one switch rollback")
  };

  V["ai-feature-metrics"] = {
    caption: ["The data flywheel: real usage creates signals, a weekly review finds failure types, they become eval cases and fixes, and the better feature brings more usage.", "Data flywheel: asli use se signals bante hain, weekly review failure types dhoondhta hai, woh eval cases aur fixes bante hain, aur behtar feature aur use laata hai."],
    svg: svg("fm", 262, [
      `<circle cx="200" cy="130" r="92" class="ring-thin"/>`,
      T(200, 126, "↻ data", "tm ts"), T(200, 144, "flywheel", "tm ts"),
      ...[["👥 Users", 200, 38], ["📶 Signals", 292, 130], ["🔍 Weekly review", 200, 222], ["🧪 Eval cases + fixes", 108, 130]].map(([l, x, y], i) =>
        `<g class="s${i + 1}">${R(x - 70, y - 18, 140, 36, i === 3 ? "bo" : "b", 18)}${T(x, y + 5, l, "ts")}</g>`),
      dot("M200 38 A92 92 0 0 1 292 130 A92 92 0 0 1 200 222 A92 92 0 0 1 108 130 A92 92 0 0 1 200 38", 6),
      `<g class="s5">${R(380, 24, 244, 214, "bm", 14)}${T(396, 50, "Measure in layers", "tb", "start")}${T(396, 80, "🎯 Outcome: handle time ↓ (A/B)", "ts", "start")}${T(396, 108, "📈 Usage: adoption · retention", "ts", "start")}${T(396, 136, "✍️ Quality: edit · accept rate", "ts", "start")}${T(396, 164, "👍👎 with a reason", "ts", "start")}${T(396, 192, "🛡️ Guardrails: complaints,", "ts", "start")}${T(414, 212, "safety, latency, cost", "ts", "start")}</g>`
    ].join(""), "A flywheel loop from users to signals to a weekly review to eval cases and fixes and back to users, beside a list of metric layers: outcome, usage, quality and guardrails")
  };

  V["ai-product-design-interview"] = {
    caption: ["A 45 minute plan for the AI design round: clarify, user experience, architecture, model choices, quality, production limits, then rollout. Talk in trade-offs with numbers.", "AI design round ka 45 minute plan: clarify, user experience, architecture, model choices, quality, production ki limits, phir rollout. Numbers ke saath trade-offs mein baat karo."],
    svg: svg("pd", 250, [
      `<path d="M30 60 H610" class="lane"/>`,
      ...[["❓", "Clarify", "0-5"], ["🎨", "UX", "5-10"], ["🧱", "Architecture", "10-18"], ["🧠", "Models", "18-22"], ["🧪", "Quality", "22-30"], ["⚙️", "Production", "30-38"], ["🚀", "Rollout", "38-45"]].map(([ic, l, t], i) => {
        const cx = 50 + i * 90;
        return `<g class="s${i + 1}"><circle cx="${cx}" cy="60" r="20" class="${i === 0 ? "ba" : "b"}"/>${T(cx, 66, ic)}${T(cx, 104, l, "ts tb")}${T(cx, 122, t + " min", "tm ts")}</g>`;
      }),
      `<g class="s8">${R(30, 150, 580, 74, "bm", 12)}${T(320, 176, "\"A smaller model cuts cost 70%; I'd accept it if evals stay within 2 points.\"", "ts")}${T(320, 202, "users → flow → boxes and arrows → evals → limits → launch plan", "tm ts")}</g>`
    ].join(""), "A timeline of seven stages for a 45 minute AI design interview: clarify, UX, architecture, models, quality, production and rollout, with an example trade-off sentence")
  };

  V["ai-coding-tools"] = {
    caption: ["You lead, the assistant types: write a spec, give project context, let it plan and code in small steps, run the tests, then review the diff before you commit.", "Aap lead karte ho, assistant type karta hai: spec likho, project ka context do, use plan aur chhote steps mein code karne do, tests chalao, phir commit se pehle diff review karo."],
    svg: svg("ac", 250, [
      ...[["📝", "Spec", "goal · done"], ["📚", "Context", "CLAUDE.md"], ["🗺️", "Plan", "small steps"], ["⌨️", "Code", "assistant"], ["🧪", "Tests", "run every step"], ["👀", "Review", "read the diff"], ["✅", "Commit", "small pieces"]].map(([ic, l, sub], i) => {
        const cx = 50 + i * 90;
        return `<g class="s${i + 1}"><circle cx="${cx}" cy="62" r="24" class="${i === 5 ? "bw" : i === 6 ? "bo" : "b"}"/>${T(cx, 69, ic)}${T(cx, 112, l, "ts tb")}${T(cx, 130, sub, "tm ts")}</g>`;
      }),
      ...[0, 1, 2, 3, 4, 5].map(i => A("ac", `M${76 + i * 90} 62 H${112 + i * 90}`, "ln")),
      `<g class="s8">${A("ac", "M500 140 C500 180 320 180 320 144", "mk-warn")}${T(410, 196, "✗ tests fail or diff unclear → back to small steps", "ts warn")}</g>`,
      T(320, 236, "never paste secrets or customer data into unapproved tools", "tm ts")
    ].join(""), "A loop for AI assisted coding: spec, project context, plan, code, tests, review the diff and commit, returning to smaller steps when tests fail")
  };

  V["llm-testing"] = {
    caption: ["A testing pyramid for AI features: many fast unit tests with a fake model, some replayed recorded responses, a few scheduled live smoke tests, and evals judging quality on the side.", "AI features ke liye testing pyramid: nakli model ke saath bahut se tez unit tests, kuch replay kiye recorded responses, schedule pe thode live smoke tests, aur bagal mein quality parakhte evals."],
    svg: svg("lt", 250, [
      `<g class="s1"><path d="M40 220 H420 L380 166 H80 Z" class="f2"/>${T(230, 199, "🧩 Unit tests + fake model · ms · every PR", "ts")}</g>`,
      `<g class="s2"><path d="M80 162 H380 L340 108 H120 Z" class="f1"/>${T(230, 141, "📼 Recorded responses · every PR", "ts")}</g>`,
      `<g class="s3"><path d="M120 104 H340 L280 50 H180 Z" class="f4"/>${T(230, 83, "🌐 Live smoke · nightly", "ts")}</g>`,
      `<g class="s4">${R(450, 50, 174, 170, "bo", 14)}${T(537, 80, "🧪 Evals", "tb")}${T(537, 106, "judge answer quality", "ts")}${T(537, 130, "golden set · judge", "tm ts")}${T(537, 152, "separate job", "tm ts")}${T(537, 186, "tests ≠ evals", "ts ok")}</g>`,
      `<g class="s5">${T(230, 30, "fake: invalid JSON · empty · timeout · 429 → retry & fallback ✓", "tm ts")}</g>`
    ].join(""), "A testing pyramid: many unit tests with a fake model at the bottom, recorded response tests in the middle, a few live smoke tests at the top, and evals as a separate quality check")
  };

  return V;
})();

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_VISUALS };
