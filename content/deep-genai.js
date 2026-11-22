// Deeper lesson content, part 3: generative AI and LLM applications. See deep-foundations.js.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "llm-what": {
    steps: [
      ["Your text is split into tokens (pieces of words). \"Unbelievable\" might become \"un\", \"believ\", \"able\".", "Aapka text tokens (shabdon ke tukde) mein toota jaata hai. \"Unbelievable\" ban sakta hai \"un\", \"believ\", \"able\"."],
      ["Everything the model sees at once, your instructions, documents, chat history and its own answer, must fit in the context window.", "Model ek saath jo kuch dekhta hai, aapke instructions, documents, chat history aur uska khud ka jawaab, sab context window mein fit hona chahiye."],
      ["The model predicts a probability for every possible next token, picks one, appends it, and repeats.", "Model har mumkin agle token ki probability nikaalta hai, ek chunta hai, jodta hai, aur repeat karta hai."],
      ["Temperature controls how adventurous that pick is: low for facts and formats, higher for brainstorming.", "Temperature tay karta hai woh chunaav kitna adventurous ho: facts aur formats ke liye kam, brainstorming ke liye zyaada."],
      ["It has no memory between API calls. Chat apps resend the conversation each time, which is why long chats cost more.", "API calls ke beech isko kuch yaad nahi rehta. Chat apps har baar poori baatcheet dobara bhejti hain, isliye lambi chats mehengi padti hain."]
    ],
    mistakes: [
      ["Treating answers as facts. LLMs produce plausible text; verify anything important or ground it with sources.", "Jawaabon ko facts maan lena. LLMs sahi lagne wala text banate hain; zaroori cheezein verify karo ya sources se ground karo."],
      ["Ignoring the knowledge cutoff. A model doesn't know events after its training data unless you give it that information.", "Knowledge cutoff ignore karna. Model training data ke baad ki baatein nahi jaanta jab tak aap woh jaankari na do."]
    ],
    faq: [
      [["How many tokens is a page of text?", "Ek page text mein kitne tokens?"], ["Roughly 500 to 700 tokens for a page of English. Hindi and other scripts often use more tokens for the same meaning.", "English ke ek page mein lagbhag 500 se 700 tokens. Hindi aur doosri scripts aksar same matlab ke liye zyaada tokens leti hain."]],
      [["Why does the same prompt give different answers?", "Same prompt alag jawaab kyun deta hai?"], ["Because a token is sampled from probabilities. Lower the temperature (towards 0) for more consistent output.", "Kyunki token probabilities se sample hota hai. Zyaada consistent output ke liye temperature kam karo (0 ki taraf)."]]
    ]
  },

  "llm-prompting": {
    steps: [
      ["State the role and the goal: \"You are a support assistant for a bank. Answer customer questions about cards.\"", "Role aur goal batao: \"You are a support assistant for a bank. Answer customer questions about cards.\""],
      ["Give the context the model needs: the policy text, the customer's plan, today's date.", "Model ko jo context chahiye do: policy text, customer ka plan, aaj ki date."],
      ["Spell out rules and limits: answer only from the policy, say \"I don't know\" otherwise, keep it under 100 words.", "Rules aur limits saaf likho: sirf policy se jawaab do, warna \"I don't know\" kaho, 100 shabdon se kam rakho."],
      ["Show one or two examples of a good answer, and define the output format (bullets, JSON with named fields).", "Acche jawaab ke ek do examples dikhao, aur output format define karo (bullets, naam wale fields ke saath JSON)."],
      ["Test on 20 or more real inputs, look at failures, adjust one thing at a time, and keep versions of your prompt.", "20 ya zyaada asli inputs pe test karo, failures dekho, ek baar mein ek cheez badlo, aur prompt ke versions rakho."]
    ],
    mistakes: [
      ["Vague prompts like \"make it better\". Say what better means: shorter, friendlier, with a call to action.", "\"Behtar banao\" jaise vague prompts. Batao behtar ka matlab kya: chhota, friendly, call to action ke saath."],
      ["Judging a prompt on one or two tries. Prompts that look great on one example often fail on others.", "Ek do try mein prompt judge karna. Ek example pe badhiya dikhne wale prompts aksar doosron pe fail hote hain."],
      ["Putting secrets or private data in prompts sent to tools that aren't approved by your company.", "Company se approved na hon aise tools ko bheje prompts mein secrets ya private data daalna."]
    ],
    faq: [
      [["Do long prompts work better?", "Kya lambe prompts behtar kaam karte hain?"], ["Clear beats long. Include what's needed, remove what isn't. Long irrelevant context can confuse the model and costs more.", "Saaf, lambe se behtar hai. Jo zaroori hai woh daalo, jo nahi woh hatao. Lamba bekaar context model ko confuse kar sakta hai aur mehenga bhi padta hai."]],
      [["What is chain of thought?", "Chain of thought kya hai?"], ["Asking the model to reason step by step before answering. It helps on maths and multi step problems; many modern models do it internally.", "Model se jawaab se pehle step by step sochne ko kehna. Maths aur multi step problems mein madad karta hai; kai naye models yeh andar hi karte hain."]]
    ]
  },

  "llm-api": {
    steps: [
      ["Create an API key in the provider's console and store it in an environment variable, never in code.", "Provider ke console mein API key banao aur use environment variable mein rakho, code mein kabhi nahi."],
      ["Send a request with the model name, a system message (instructions) and user messages; read the text from the response.", "Model ka naam, system message (instructions) aur user messages ke saath request bhejo; response se text padho."],
      ["Log input and output token counts. Cost = tokens × price per token, so you can estimate cost per user.", "Input aur output token counts log karo. Cost = tokens × per token price, isse per user cost ka andaaza lagta hai."],
      ["Handle failures: set a timeout, retry rate limit (429) and server errors with exponential backoff, and show a friendly message if all retries fail.", "Failures sambhalo: timeout set karo, rate limit (429) aur server errors pe exponential backoff ke saath retry karo, aur sab retries fail hon to friendly message dikhao."],
      ["Stream long answers so users see text immediately, and set a max token limit to control cost.", "Lambe jawaab stream karo taaki users ko turant text dikhe, aur cost control ke liye max token limit lagao."]
    ],
    mistakes: [
      ["Committing API keys to GitHub. Bots find them within minutes; rotate the key immediately if it happens.", "API keys GitHub pe commit karna. Bots minuton mein dhoondh lete hain; aisa ho to turant key badlo."],
      ["Calling the API from browser code, which exposes your key. Call it from your server.", "Browser code se API call karna, jisse key khul jaati hai. Apne server se call karo."],
      ["No usage limits. A bug or abuse can create a huge bill; set budgets and per user limits.", "Koi usage limit nahi. Ek bug ya misuse bahut bada bill bana sakta hai; budgets aur per user limits lagao."]
    ],
    faq: [
      [["Which model should I start with?", "Kis model se shuru karun?"], ["Start with a strong general model to prove the feature works, then test smaller, cheaper models on your eval set and switch where quality holds.", "Feature kaam karta hai yeh prove karne ke liye ek strong general model se shuru karo, phir apne eval set pe chhote, saste models test karo aur jahan quality bani rahe wahan switch karo."]],
      [["Is my data used for training?", "Kya mera data training ke liye use hota hai?"], ["Policies differ by provider and plan. Business API plans usually don't train on your data by default, but always check the current terms.", "Policies provider aur plan ke hisaab se alag hain. Business API plans aam taur pe default mein aapke data pe train nahi karte, par current terms hamesha check karo."]]
    ]
  },

  "llm-tool-use": {
    steps: [
      ["Write a normal function, for example get_order_status(order_id).", "Ek normal function likho, jaise get_order_status(order_id)."],
      ["Describe it to the model: name, what it does, and a JSON schema of its parameters.", "Model ko iske baare mein batao: naam, kya karta hai, aur parameters ka JSON schema."],
      ["When the user asks \"where is order 4512?\", the model replies with a tool call: get_order_status with order_id 4512.", "Jab user poochhe \"order 4512 kahan hai?\", model tool call se jawaab deta hai: get_order_status, order_id 4512."],
      ["Your code validates the arguments, checks permissions, runs the function and sends the result back.", "Aapka code arguments validate karta hai, permissions check karta hai, function chalata hai aur result wapas bhejta hai."],
      ["The model uses the result to answer the user, or calls another tool if needed.", "Model result se user ko jawaab deta hai, ya zaroorat ho to doosra tool call karta hai."]
    ],
    mistakes: [
      ["Trusting arguments blindly. The model can invent an order ID or a wrong amount; validate everything.", "Arguments pe aankh band karke bharosa. Model order ID ya galat amount bana sakta hai; sab validate karo."],
      ["Giving powerful tools without limits, like delete or refund with no confirmation step.", "Bina limits ke powerful tools dena, jaise delete ya refund bina confirmation step ke."],
      ["Too many similar tools with vague descriptions. The model picks the wrong one; keep tools few and clearly described.", "Vague descriptions wale bahut saare milte julte tools. Model galat chunta hai; tools kam aur saaf described rakho."]
    ],
    faq: [
      [["Does the model run my code?", "Kya model mera code chalata hai?"], ["No. It only says which tool to call with which arguments. Your application runs it and decides whether to allow it.", "Nahi. Woh sirf batata hai kaunsa tool kin arguments ke saath call karna hai. Aapki application use chalati hai aur tay karti hai allow karna hai ya nahi."]],
      [["Can it call several tools at once?", "Kya ek saath kai tools call kar sakta hai?"], ["Many models support parallel tool calls, for example checking stock in three warehouses at once. Your code runs them and returns all results.", "Kai models parallel tool calls support karte hain, jaise teen warehouses mein ek saath stock check karna. Aapka code unhe chalata hai aur saare results lautata hai."]]
    ]
  },

  "llm-agents": {
    steps: [
      ["Give the agent a clear goal and a small set of tools.", "Agent ko ek saaf goal aur kuch tools do."],
      ["Loop: the model plans the next step, calls a tool, reads the result, and decides again.", "Loop: model agla step plan karta hai, tool call karta hai, result padhta hai, aur phir decide karta hai."],
      ["Set limits: maximum steps, maximum cost and a timeout, so it can't loop forever.", "Limits lagao: maximum steps, maximum cost aur timeout, taaki hamesha loop na chale."],
      ["Require human approval before risky actions like payments, emails to customers or deleting data.", "Payments, customers ko emails ya data delete jaise risky actions se pehle human approval zaroori karo."],
      ["Log every step (a trace) so you can see why it did what it did, and evaluate on realistic tasks.", "Har step log karo (trace) taaki dekh sako usne jo kiya kyun kiya, aur realistic tasks pe evaluate karo."]
    ],
    mistakes: [
      ["Using an agent where a fixed workflow works. Fixed steps are cheaper, faster and easier to test.", "Jahan fixed workflow kaam kare wahan agent lagana. Fixed steps saste, tez aur test karne mein aasaan hain."],
      ["No stopping rules, leading to runaway loops and big bills.", "Rukne ke rules na hona, jisse loops bhaagte rehte hain aur bill bada hota hai."],
      ["Letting web pages or documents give the agent instructions (prompt injection). Treat them as data.", "Web pages ya documents ko agent ko instructions dene dena (prompt injection). Unhe data maano."]
    ],
    faq: [
      [["What's the difference between an agent and a chatbot?", "Agent aur chatbot mein kya fark hai?"], ["A chatbot mostly answers. An agent takes actions with tools over several steps to complete a task.", "Chatbot zyaadatar jawaab deta hai. Agent kai steps mein tools se actions leta hai taaki kaam poora ho."]],
      [["Do I need a framework like LangGraph?", "Kya LangGraph jaisa framework chahiye?"], ["Not to start. A simple loop in your own code teaches you the most. Frameworks help later with state, retries and multi step flows.", "Shuru mein nahi. Apne code mein simple loop sabse zyaada sikhata hai. Frameworks baad mein state, retries aur multi step flows mein madad karte hain."]]
    ]
  },

  "llm-mcp": {
    steps: [
      ["An MCP server wraps a system (tickets, files, a database) and exposes tools, resources and prompts in a standard format.", "MCP server ek system (tickets, files, database) ko wrap karta hai aur tools, resources aur prompts standard format mein deta hai."],
      ["An MCP client lives inside an AI app (an assistant, an IDE, your own agent) and connects to one or more servers.", "MCP client ek AI app (assistant, IDE, aapka apna agent) ke andar rehta hai aur ek ya zyaada servers se judta hai."],
      ["The client lists the server's tools and passes them to the model, which can then call them.", "Client server ke tools ki list leta hai aur model ko deta hai, phir model unhe call kar sakta hai."],
      ["Calls flow through the client to the server, which runs them with its own authentication and permissions.", "Calls client se server tak jaati hain, jo apne authentication aur permissions ke saath unhe chalata hai."],
      ["Build once, reuse everywhere: the same server works with every MCP compatible app.", "Ek baar banao, har jagah use karo: wahi server har MCP compatible app ke saath chalta hai."]
    ],
    mistakes: [
      ["Installing MCP servers from unknown sources. A server can read data and take actions; treat it like any software you install.", "Anjaan sources se MCP servers install karna. Server data padh sakta hai aur actions le sakta hai; ise kisi bhi install kiye software ki tarah dekho."],
      ["Exposing write or delete tools by default. Start read only and add powerful tools carefully.", "Default mein write ya delete tools dena. Read only se shuru karo aur powerful tools dhyaan se jodo."]
    ],
    faq: [
      [["Is MCP only for one company's models?", "Kya MCP sirf ek company ke models ke liye hai?"], ["No. It's an open protocol supported by many AI apps and model providers.", "Nahi. Yeh open protocol hai jise kai AI apps aur model providers support karte hain."]],
      [["MCP or normal tool calling?", "MCP ya normal tool calling?"], ["They work together. Tool calling is how the model asks for an action; MCP is a standard way to package and share those tools across apps.", "Dono saath kaam karte hain. Tool calling woh tarika hai jisse model action maangta hai; MCP un tools ko apps ke beech pack aur share karne ka standard tarika hai."]]
    ]
  },

  "embeddings": {
    steps: [
      ["Send text to an embedding model; you get back a vector of hundreds of numbers.", "Text embedding model ko bhejo; badle mein sainkdon numbers ka vector milta hai."],
      ["Do this for every document chunk and store the vectors, with the text and metadata, in a vector database.", "Har document chunk ke liye yeh karo aur vectors ko text aur metadata ke saath vector database mein store karo."],
      ["At search time, embed the user's query the same way.", "Search ke time user ki query ko bhi same tarah embed karo."],
      ["Find the nearest vectors with cosine similarity; the vector database does this quickly even for millions.", "Cosine similarity se sabse paas ke vectors dhoondo; vector database laakhon mein bhi yeh jaldi karta hai."],
      ["Return the matching chunks, optionally filtered by metadata (department, date, permissions).", "Match hue chunks lautao, chaaho to metadata se filter karke (department, date, permissions)."]
    ],
    mistakes: [
      ["Mixing embedding models. Vectors from different models aren't comparable; re-embed everything when you switch.", "Embedding models mix karna. Alag models ke vectors compare nahi ho sakte; switch karo to sab dobara embed karo."],
      ["Relying only on vector search for exact codes, names or IDs. Add keyword search (hybrid).", "Exact codes, naam ya IDs ke liye sirf vector search pe nirbhar rehna. Keyword search bhi jodo (hybrid)."]
    ],
    faq: [
      [["Do I need a special vector database?", "Kya special vector database chahiye?"], ["Not always. For small projects, pgvector in PostgreSQL or even an in memory library works. Dedicated databases help at large scale.", "Hamesha nahi. Chhote projects ke liye PostgreSQL mein pgvector ya in memory library bhi chal jaati hai. Bade scale pe dedicated databases kaam aate hain."]],
      [["Do embeddings work for Hindi?", "Kya embeddings Hindi ke liye kaam karti hain?"], ["Multilingual embedding models do, and can even match a Hindi question to an English document. Test with your own examples.", "Multilingual embedding models karte hain, aur Hindi sawaal ko English document se match bhi kar sakte hain. Apne examples se test karo."]]
    ]
  },

  "rag": {
    steps: [
      ["Collect and clean the documents: remove duplicates, old versions and junk text.", "Documents ikattha karo aur saaf karo: duplicates, purane versions aur bekaar text hatao."],
      ["Chunk them along headings and paragraphs, a few hundred tokens each, and keep title, section and date as metadata.", "Headings aur paragraphs ke hisaab se chunks banao, har ek kuch sau tokens ka, aur title, section aur date metadata mein rakho."],
      ["Embed the chunks and store them; for each question, retrieve the top matches (ideally hybrid search plus a reranker).", "Chunks embed karke store karo; har sawaal ke liye top matches nikaalo (behtar hai hybrid search plus reranker)."],
      ["Prompt: \"Answer only from the sources below and cite them. If they don't contain the answer, say so.\"", "Prompt mein likho: \"Answer only from the sources below and cite them. If they don't contain the answer, say so.\" Yaani sirf sources se jawaab, citation ke saath, aur jawaab na mile to saaf bolo."],
      ["Build an eval set of real questions; measure retrieval (was the right chunk found?) and answers (correct and faithful?) separately.", "Asli sawaalon ka eval set banao; retrieval (sahi chunk mila?) aur answers (sahi aur source ke mutaabik?) alag alag naapo."]
    ],
    mistakes: [
      ["Fixed size chunks that cut tables and lists in half. Respect document structure.", "Fixed size chunks jo tables aur lists ko beech se kaat dete hain. Document ka structure maano."],
      ["Stuffing 30 chunks into the prompt. More isn't better; a few relevant chunks usually beat many.", "Prompt mein 30 chunks thoos dena. Zyaada behtar nahi; kuch relevant chunks aksar bahut saaron se behtar hain."],
      ["Ignoring permissions, so users see documents they shouldn't. Filter at retrieval time.", "Permissions ignore karna, jisse users woh documents dekh lete hain jo nahi dekhne chahiye. Retrieval ke time filter karo."]
    ],
    faq: [
      [["RAG or a bigger context window?", "RAG ya bada context window?"], ["Even with huge context windows, RAG is usually cheaper, faster and more accurate, because the model sees only what's relevant. For one small document, just put it in the prompt.", "Bahut bade context windows ke saath bhi RAG aksar sasta, tez aur zyaada accurate hai, kyunki model sirf relevant cheez dekhta hai. Ek chhote document ke liye seedha prompt mein daal do."]],
      [["How do I keep the index up to date?", "Index ko up to date kaise rakhun?"], ["Run a sync job that re-embeds changed documents and deletes removed ones, triggered by changes or on a schedule.", "Ek sync job chalao jo badle documents dobara embed kare aur hataye gaye documents delete kare, changes pe ya schedule pe."]]
    ]
  },

  "llm-evals": {
    steps: [
      ["Write down what good means for your feature, with examples of good and bad outputs.", "Likho aapke feature ke liye accha ka matlab kya hai, acche aur bure outputs ke examples ke saath."],
      ["Collect 50 to 200 real inputs: common cases, edge cases and past failures.", "50 se 200 asli inputs ikattha karo: common cases, edge cases aur purane failures."],
      ["Choose how to score each: code checks where possible (valid JSON, right category), a rubric for open answers.", "Har ek ko score karne ka tarika chuno: jahan ho sake code checks (valid JSON, sahi category), open answers ke liye rubric."],
      ["Use an LLM judge for the rubric only after checking it agrees with human ratings on a sample.", "Rubric ke liye LLM judge tabhi use karo jab sample pe check kar lo ki woh human ratings se sehmat hai."],
      ["Run the eval on every prompt or model change, track the score over time, and add every new production failure to the set.", "Har prompt ya model change pe eval chalao, waqt ke saath score track karo, aur har naya production failure set mein jodo."]
    ],
    mistakes: [
      ["Testing by trying a few prompts by hand ('vibe checks'). It misses regressions you didn't think to try.", "Haath se kuch prompts try karke test karna ('vibe checks'). Jo aapne try karne ka socha nahi woh regressions chhoot jaate hain."],
      ["An eval set made only of easy examples. Include the tricky and adversarial ones.", "Sirf aasaan examples wala eval set. Mushkil aur adversarial wale bhi daalo."]
    ],
    faq: [
      [["How many examples do I need?", "Kitne examples chahiye?"], ["Start with 50 good ones; that already catches most regressions. Grow towards hundreds per important category over time.", "50 acche examples se shuru karo; inse hi zyaadatar regressions pakad mein aa jaate hain. Waqt ke saath har important category ke liye sainkdon tak badhao."]],
      [["What are online evals?", "Online evals kya hain?"], ["Signals from real usage after launch: thumbs up or down, edits to AI output, escalations to humans, task completion.", "Launch ke baad asli usage ke signals: thumbs up ya down, AI output mein edits, insaanon tak escalations, task completion."]]
    ]
  },

  "llm-safety": {
    steps: [
      ["Ground answers in sources and allow \"I don't know\" to reduce hallucinations.", "Hallucinations kam karne ke liye jawaab sources pe based rakho aur \"I don't know\" kehne do."],
      ["Treat user input and retrieved content as data, never as instructions; mark them clearly in the prompt.", "User input aur retrieved content ko data maano, instructions kabhi nahi; prompt mein unhe saaf mark karo."],
      ["Give tools the least privilege, and require confirmation for risky actions.", "Tools ko kam se kam privilege do, aur risky actions ke liye confirmation zaroori karo."],
      ["Filter inputs and outputs: block personal data leaving the system, unsafe content and secrets.", "Inputs aur outputs filter karo: personal data ka bahar jaana, unsafe content aur secrets block karo."],
      ["Red team regularly: try known attacks and add them to your eval set.", "Regularly red team karo: jaane maane attacks try karo aur unhe eval set mein jodo."]
    ],
    mistakes: [
      ["Relying on \"please don't reveal the system prompt\" as security. Instructions in a prompt are not access control.", "\"please don't reveal the system prompt\" ko security maan lena. Prompt ke instructions access control nahi hain."],
      ["Logging full conversations with personal data without consent or protection.", "Bina consent ya protection ke personal data wali poori conversations log karna."]
    ],
    faq: [
      [["Can prompt injection be fully prevented?", "Kya prompt injection poori tarah rok sakte hain?"], ["Not today. You reduce the impact with layers: limited tools, confirmations, output checks and monitoring.", "Aaj nahi. Layers se asar kam karte ho: limited tools, confirmations, output checks aur monitoring."]],
      [["Who is responsible for AI mistakes?", "AI ki galtiyon ke liye zimmedaar kaun?"], ["The company deploying it. That's why high stakes uses need human review, clear disclaimers and audit logs.", "Jo company use deploy karti hai. Isiliye high stakes uses mein human review, saaf disclaimers aur audit logs chahiye."]]
    ]
  },

  "ai-ux": {
    steps: [
      ["Set expectations: label AI output as a draft or suggestion, and say what it can and can't do.", "Expectations set karo: AI output ko draft ya suggestion label karo, aur batao woh kya kar sakta hai kya nahi."],
      ["Show sources or reasons so users can check quickly.", "Sources ya reasons dikhao taaki users jaldi check kar sakein."],
      ["Make editing and undo easy; never auto apply important changes.", "Edit aur undo aasaan banao; important changes kabhi apne aap apply mat karo."],
      ["Design the failure path: what happens when the AI is unsure, slow or wrong? Offer a fallback or a human.", "Failure ka raasta design karo: AI unsure, slow ya galat ho to kya hoga? Fallback ya insaan ka option do."],
      ["Collect feedback in the flow (thumbs, edits) and review it weekly to improve prompts and evals.", "Flow ke andar feedback lo (thumbs, edits) aur prompts aur evals sudhaarne ke liye har hafte review karo."]
    ],
    mistakes: [
      ["Hiding that content is AI generated. Users trust products more when it's clear.", "Chhupana ki content AI ne banaya. Saaf ho to users product pe zyaada bharosa karte hain."],
      ["A blank chat box as the only interface. Suggest example prompts or put AI where users already work.", "Sirf ek khaali chat box interface. Example prompts suggest karo ya AI wahan rakho jahan users pehle se kaam karte hain."]
    ],
    faq: [
      [["Chat interface or buttons?", "Chat interface ya buttons?"], ["For repeated, well defined tasks, a button (\"Summarise\", \"Draft reply\") is faster. Chat suits open ended exploration.", "Baar baar ke, saaf defined tasks ke liye button (\"Summarise\", \"Draft reply\") tez hai. Open ended exploration ke liye chat theek hai."]],
      [["How do I show uncertainty?", "Uncertainty kaise dikhayein?"], ["Highlight parts that need checking, show sources, or say \"I'm not sure\" and offer options, rather than showing raw confidence numbers.", "Jo hisse check karne hain unhe highlight karo, sources dikhao, ya \"I'm not sure\" kaho aur options do, raw confidence numbers dikhaane ke bajaye."]]
    ]
  },

  "rag-advanced": {
    steps: [
      ["Parse documents with structure intact: keep section headings with their paragraphs, and keep tables together as Markdown or HTML rather than slicing mid-row.", "Documents ko structure ke saath parse karo: headings ko unke paragraphs ke saath rakho, aur tables ko beech se kaatne ke bajaye Markdown ya HTML mein poora rakho."],
      ["Attach rich metadata to every chunk: document_id, title, section_path, updated_at, and allowed_roles for permission filtering.", "Har chunk ke saath zaroori metadata jodo: document_id, title, section_path, updated_at, aur permission filter ke liye allowed_roles."],
      ["Run hybrid retrieval: combine BM25 lexical search (exact keywords, SKUs, names) and vector search (semantic meaning) using Reciprocal Rank Fusion (RRF).", "Hybrid retrieval chalao: BM25 keyword search (exact shabd, SKUs, naam) aur vector search (matlab) ko Reciprocal Rank Fusion (RRF) se milao."],
      ["Pass the top 30–50 retrieved chunks to a cross-encoder reranker (e.g. BGE-Reranker or Cohere Rerank) and send only the top 5–8 to the LLM.", "Top 30–50 chunks ko cross-encoder reranker (jaise BGE-Reranker ya Cohere Rerank) se score karo aur sirf top 5–8 LLM ko bhejo."],
      ["Evaluate retrieval and generation separately on a 50-question golden set: track Recall@5 and MRR for retrieval, and faithfulness/groundedness for the answer.", "50 sawaalon ke golden set pe retrieval aur generation alag naapo: retrieval ke liye Recall@5 aur MRR, aur jawaab ke liye faithfulness/groundedness."]
    ],
    mistakes: [
      ["Debugging a wrong RAG answer by tweaking the system prompt before checking whether the right document chunk was even retrieved!", "Galat RAG jawaab aane par yeh dekhe bina ki sahi chunk retrieve bhi hua tha ya nahi, seedha system prompt badalne lagna!"],
      ["Dumping 30 chunks into the LLM prompt ('lost in the middle'): latency and cost jump while answer accuracy drops compared with 5 reranked chunks.", "LLM prompt mein 30 chunks bhar dena ('lost in the middle'): 5 reranked chunks ke mukaable kharch aur time badh jaata hai aur accuracy gir jaati hai."]
    ],
    faq: [
      [["Why not just put every document into a 1-million-token context window instead of RAG?", "RAG ke bajaye 10-lakh token wale context window mein saare documents kyun na daal dein?"], ["Passing 500,000 tokens on every user query costs dollars per question and takes 15–30 seconds to first token. RAG retrieves the relevant 2,000 tokens in 50 ms at 1/200th the cost.", "Har sawaal pe 5 lakh tokens bhejne mein har baar bhaari kharch aur 15–30 second lagte hain. RAG 50 ms mein aur 200 guna kam kharch mein zaroori 2,000 tokens nikal laata hai."]],
      [["What is query rewriting or HyDE in RAG?", "RAG mein query rewriting ya HyDE kya hota hai?"], ["Users type short or messy follow-up questions ('what about for contractors?'). A fast LLM step rewrites the follow-up into a standalone search query using chat history before searching the index.", "Users chhote ya adhure follow-up sawaal likhte hain ('aur contractors ke liye?'). Index mein dhoondhne se pehle ek chhota LLM step chat history dekhkar use poora search query bana deta hai."]]
    ]
  },

  "agent-workflows": {
    steps: [
      ["Start with the simplest pattern that works: a single LLM call or a fixed 3-step pipeline beats an autonomous agent whenever the steps are predictable.", "Sabse simple pattern se shuru karo: jab steps pehle se pata hon, tab ek LLM call ya tay 3-step pipeline autonomous agent se behtar hota hai."],
      ["Model multi-step workflows as an explicit state graph: define a typed State object and small node functions that read and update state.", "Multi-step workflows ko saaf state graph ki tarah banao: ek typed State object aur chhote node functions jo state padhein aur update karein."],
      ["Enforce hard safety guards in code: max_steps (e.g. 8), per-run token/cost ceiling, tool timeouts, and cycle detection if the agent repeats the same tool call.", "Code mein pakke safety guards lagao: max_steps (jaise 8), token/cost limit, tool timeouts, aur ek hi tool call repeat hone par cycle detection."],
      ["Persist state checkpoints to Postgres/Redis after each node so the workflow can pause at a human-in-the-loop approval gate before write/delete actions.", "Har node ke baad Postgres/Redis mein state checkpoint save karo taaki write/delete action se pehle workflow insaan ki approval ke liye ruk sake."],
      ["Log full execution traces (every prompt, tool input/output, latency and token count) and test the agent on 30+ realistic end-to-end scenarios.", "Poore execution traces (har prompt, tool input/output, latency aur tokens) log karo aur 30+ asli scenarios pe agent ko test karo."]
    ],
    mistakes: [
      ["Building a 5-agent 'autonomous crew' where agents chat back and forth with no step cap, burning 50,000 tokens on a task a 3-node workflow solves in 2 seconds.", "Bina step limit ke 5 agents ka 'autonomous crew' banana jo aapas mein baat karke 50,000 tokens jala dein, jabki 3-node workflow wahi kaam 2 second mein kar de."],
      ["Letting an agent pass raw, unvalidated strings into a SQL query or shell command instead of strict Pydantic tool schemas and parameterised queries.", "Strict Pydantic tool schemas aur parameterised queries ke bajaye agent ko seedha SQL ya shell command mein unvalidated text bhejne dena."]
    ],
    faq: [
      [["How should an agent handle short-term vs long-term memory?", "Agent mein short-term aur long-term memory kaise sambhalni chahiye?"], ["Keep short-term memory (current task messages and tool results) in the graph state, trimming old raw tool outputs once summarised. Store long-term facts (user profile, past resolutions) in a database or vector store and retrieve only what's relevant.", "Short-term memory (abhi ke messages aur tool results) graph state mein rakho aur summarise hone ke baad purane bhaari tool outputs chhota kar do. Long-term facts database mein rakho aur zaroorat pe hi nikalo."]],
      [["What do you do when a tool fails mid-workflow?", "Workflow ke beech mein koi tool fail ho jaaye to kya karein?"], ["Retry transient errors (429/503) in the tool wrapper; for validation or business errors, return a clear structured error message to the state graph so it can either self-correct once or hand off cleanly to a human.", "Temporary errors (429/503) ko tool wrapper mein retry karo; business errors pe saaf message state graph ko do taaki woh ek baar sudhaar kare ya insaan ko saunp de."]]
    ]
  },

  "multimodal-ai": {
    steps: [
      ["Inspect your input documents first: are they digital PDFs with selectable text, or scanned images, photos, complex multi-column tables and handwriting?", "Pehle apne input documents dekho: kya woh selectable text wale digital PDFs hain, ya scanned images, photos, tables aur handwriting?"],
      ["For layout-heavy or scanned pages, render pages at readable resolution (~150–200 DPI) or use a layout-aware parser that extracts tables as structured Markdown.", "Tables ya scan wale pages ko ~150–200 DPI image mein render karo ya layout-aware parser se tables ko Markdown mein nikalo."],
      ["Call a Vision-Language Model with structured output (Pydantic schema) and ask it to return both the extracted fields and the page/bounding-box citation.", "Structured output (Pydantic schema) ke saath Vision-Language Model call karo aur extracted fields ke saath page citation bhi maango."],
      ["Run deterministic validation rules in Python (dates parse cleanly, line items sum to total, IDs match regex); auto-approve clean docs and queue flagged ones for human review.", "Python mein deterministic validation rules chalao (dates sahi hon, line items ka jod total se mile, IDs regex match karein); saaf docs auto-approve karo aur baaki human review mein bhejo."],
      ["For voice AI, stream audio in chunks: use Voice Activity Detection (VAD) + streaming STT → concise LLM response streamed sentence by sentence → streaming TTS.", "Voice AI ke liye audio chunks mein stream karo: VAD + streaming STT → chhote sentences mein LLM stream → streaming TTS."]
    ],
    mistakes: [
      ["Sending 4000×3000 raw camera photos for every page of a 50-page PDF, blowing up vision token costs and latency. Resize to the minimum resolution where text is crisp.", "50-page PDF ke har page ke liye 4000×3000 ki bhaari photo bhejna, jisse vision tokens ka kharch aur latency bahut badh jaati hai. Utna hi resize karo jismein text saaf dikhe."],
      ["Using plain text extraction on multi-column financial tables, which scrambles numbers across rows and causes the LLM to hallucinate figures.", "Multi-column financial tables pe plain text extraction lagana, jisse alag rows ke numbers aapas mein mil jaate hain aur LLM galat figures de deta hai."]
    ],
    faq: [
      [["When should I use traditional OCR vs a Vision LLM?", "Traditional OCR aur Vision LLM mein kab kaunsa use karun?"], ["For millions of uniform, clean pages where speed and cost are paramount, specialised OCR + layout models are very cheap. For diverse layouts, messy receipts, charts or zero-shot extraction into JSON, a Vision LLM (or OCR + small LLM cascade) is far more accurate.", "Laakhon ek jaise saaf pages ke liye specialised OCR bahut sasta padta hai. Alag-alag layouts, tedhi raseedon, charts ya seedha JSON nikalne ke liye Vision LLM (ya OCR + chhota LLM) kahin zyaada sahi kaam karta hai."]],
      [["How do you get voice assistant latency under 800 ms?", "Voice assistant ki latency 800 ms se neeche kaise laayein?"], ["Stream every stage: detect end-of-speech with fast VAD, stream transcripts, prompt the LLM to begin with a short first clause, and start TTS audio as soon as the first clause arrives — or use a native speech-to-speech model.", "Har stage stream karo: fast VAD se baat rukna pakdo, transcript stream karo, LLM se pehla chhota jumla turant lo, aur pehla jumla aate hi TTS audio shuru kar do — ya native speech-to-speech model lagao."]]
    ]
  },

  "ai-chat-ui": {
    steps: [
      ["Model each message as { id, role, parts, status } where status is pending, streaming, done, stopped or failed, so the UI always knows what to show.", "Har message ko { id, role, parts, status } ki tarah rakho jahan status pending, streaming, done, stopped ya failed ho, taaki UI ko hamesha pata ho kya dikhana hai."],
      ["On send, add the user message and an empty assistant message at once (optimistic UI), disable send, and show a typing indicator until the first token.", "Send karte hi user message aur ek khaali assistant message turant jodo (optimistic UI), send band karo, aur pehle token tak typing indicator dikhao."],
      ["Stream from a server route with SSE or a streamed response, append chunks to the assistant message, and throttle re-renders (for example every 50 ms) so long answers don't lag.", "Server route se SSE ya streamed response ke zariye stream karo, chunks assistant message mein jodo, aur re-renders ko throttle karo (jaise har 50 ms) taaki lambe jawaab atkein nahi."],
      ["Wire Stop to an AbortController that cancels the fetch and the model call; keep the partial text and mark it stopped. Add Regenerate and Edit question.", "Stop ko AbortController se jodo jo fetch aur model call dono cancel kare; adhoora text rakho aur stopped mark karo. Regenerate aur Edit question jodo."],
      ["Render Markdown with a sanitiser, highlight code with a copy button, and auto scroll only if the user is already at the bottom.", "Markdown sanitiser ke saath dikhao, code ko copy button ke saath highlight karo, aur auto scroll sirf tab karo jab user pehle se neeche ho."],
      ["Show tool steps as status lines (\"Looking up order A12345…\") and render tool results as components such as an order card, not raw JSON.", "Tool steps ko status lines ki tarah dikhao (\"Order A12345 dekh raha hoon…\") aur tool results ko components ki tarah dikhao jaise order card, raw JSON nahi."],
      ["Handle errors per message with a Retry button, save the conversation so a refresh doesn't lose it, and test on a slow 3G connection and a phone.", "Har message pe Retry button ke saath errors sambhalo, conversation save karo taaki refresh pe kho na jaaye, aur slow 3G aur phone pe test karo."]
    ],
    mistakes: [
      ["Rendering model output as raw HTML. A crafted answer or document can inject a script; always sanitise.", "Model output ko raw HTML ki tarah dikhana. Banaaya hua jawaab ya document script ghusa sakta hai; hamesha sanitise karo."],
      ["Stop only hides the text while the server keeps generating, so you still pay for tokens nobody reads.", "Stop sirf text chhupata hai jabki server likhta rehta hai, to aap un tokens ka bhi paisa dete ho jinhe koi nahi padhta."],
      ["Forcing the scroll to the bottom while the user is trying to read an earlier part of the answer.", "User jab jawaab ka pehle wala hissa padh raha ho tab bhi scroll ko zabardasti neeche le jaana."]
    ],
    faq: [
      [["SSE or WebSockets for streaming?", "Streaming ke liye SSE ya WebSockets?"], ["SSE (or a streamed HTTP response) is enough for model answers because data flows one way and it works through most proxies. Use WebSockets when the browser must also stream to the server, such as live voice.", "Model ke jawaabon ke liye SSE (ya streamed HTTP response) kaafi hai kyunki data ek taraf jaata hai aur zyaadatar proxies se chal jaata hai. WebSockets tab use karo jab browser ko bhi server ko stream karna ho, jaise live voice."]],
      [["Do I need the Vercel AI SDK?", "Kya Vercel AI SDK zaroori hai?"], ["No, but it saves time: it handles streaming formats, message state, tool calls and many providers. Learn how streaming works underneath once, then use whatever your team uses.", "Nahi, par time bachaata hai: streaming formats, message state, tool calls aur kai providers sambhaal leta hai. Ek baar samjho neeche streaming kaise kaam karti hai, phir jo team use karti hai woh use karo."]],
      [["Should AI features always be a chat?", "Kya AI features hamesha chat hone chahiye?"], ["No. Many of the best AI features are a button inside an existing screen (\"Summarise\", \"Draft reply\") that streams into a panel. Use chat for open ended questions.", "Nahi. Bahut se behtareen AI features maujooda screen ke andar ek button hote hain (\"Summarise\", \"Draft reply\") jo ek panel mein stream karta hai. Chat khule sawaalon ke liye use karo."]]
    ]
  },

  "structured-output": {
    steps: [
      ["Write the schema first (Zod or Pydantic) with a description on every field, enums for categories and nullable fields for values that may be missing.", "Pehle schema likho (Zod ya Pydantic), har field pe description, categories ke liye enums aur jo values na ho sakein unke liye nullable fields."],
      ["Use the provider's structured output or tool calling mode and pass the schema, instead of asking for JSON in plain words.", "Saade shabdon mein JSON maangne ki jagah provider ka structured output ya tool calling mode use karo aur schema do."],
      ["Validate every response against the same schema; on failure, retry once with the validation error in the prompt.", "Har response ko usi schema se validate karo; fail ho to validation error prompt mein daalkar ek baar retry karo."],
      ["Check business rules in plain code: totals add up, IDs exist, dates make sense. Route anything that fails to human review.", "Business rules plain code mein check karo: totals milte hain, IDs hain, dates sahi hain. Jo fail ho use human review mein bhejo."],
      ["Build an eval set of 50 or more real inputs with expected fields and measure accuracy per field, not just \"valid JSON\".", "50 ya zyaada asli inputs ka eval set banao jismein expected fields hon aur har field ki accuracy naapo, sirf \"valid JSON\" nahi."]
    ],
    mistakes: [
      ["Parsing JSON out of a free text answer with a regex. It breaks on the first unusual reply; use schema mode and validation.", "Free text jawaab se regex se JSON nikaalna. Pehle hi ajeeb reply pe toot jaata hai; schema mode aur validation use karo."],
      ["Making every field required, which pushes the model to invent order numbers, dates and amounts.", "Har field required rakhna, jisse model order numbers, dates aur amounts banaane pe majboor hota hai."],
      ["Huge nested schemas with 60 fields in one call. Split into steps or smaller schemas for better accuracy.", "Ek call mein 60 fields wale bade nested schemas. Behtar accuracy ke liye steps ya chhote schemas mein baanto."]
    ],
    faq: [
      [["Structured output or tool calling?", "Structured output ya tool calling?"], ["Use structured output when you always want one object back. Use tool calling when the model should decide which action to take, each with its own schema.", "Jab hamesha ek hi object wapas chahiye to structured output use karo. Jab model ko tay karna ho kaunsa action lena hai, har ek apne schema ke saath, tab tool calling."]],
      [["Can the model still return wrong values in valid JSON?", "Kya valid JSON mein bhi model galat values de sakta hai?"], ["Yes. Valid shape doesn't mean correct content. That's why you add range checks, business rules and a field level eval set.", "Haan. Sahi shape ka matlab sahi content nahi. Isiliye range checks, business rules aur field level eval set jodte ho."]]
    ]
  },

  "ts-ai-stack": {
    steps: [
      ["Create a Next.js app, add the AI SDK and a provider package, and put the API key in a server environment variable (never one prefixed for the browser, such as NEXT_PUBLIC_).", "Next.js app banao, AI SDK aur provider package jodo, aur API key server environment variable mein rakho (browser wale prefix jaise NEXT_PUBLIC_ wala kabhi nahi)."],
      ["Write one route handler per AI feature that authenticates the user, rate limits, validates the body with Zod and calls the model.", "Har AI feature ke liye ek route handler likho jo user authenticate kare, rate limit lagaye, body ko Zod se validate kare aur model call kare."],
      ["Put every model call behind one wrapper module that logs task, user, tokens, cost, latency and the prompt version.", "Har model call ko ek wrapper module ke peeche rakho jo task, user, tokens, cost, latency aur prompt version log kare."],
      ["Store chats, documents and embeddings in Postgres (pgvector) with user and tenant IDs on every row.", "Chats, documents aur embeddings Postgres (pgvector) mein rakho, har row pe user aur tenant IDs ke saath."],
      ["Move slow work such as indexing uploads or nightly summaries to a queue and worker; show progress in the UI.", "Uploads index karna ya raat ki summaries jaisa slow kaam queue aur worker pe bhejo; UI mein progress dikhao."],
      ["Deploy with preview environments so every pull request gets a live link to test the AI feature and run evals.", "Preview environments ke saath deploy karo taaki har pull request ko AI feature test karne aur evals chalane ka live link mile."]
    ],
    mistakes: [
      ["Exposing the API key through a NEXT_PUBLIC_ variable or a client component. Anyone can copy it and run up your bill.", "API key ko NEXT_PUBLIC_ variable ya client component se expose karna. Koi bhi copy karke aapka bill badha sakta hai."],
      ["No auth or rate limit on AI routes, so bots and loops call the model thousands of times.", "AI routes pe na auth na rate limit, to bots aur loops model ko hazaaron baar call karte hain."],
      ["Doing a 40 second indexing job inside the request, which times out on serverless platforms.", "40 second ka indexing job request ke andar karna, jo serverless platforms pe time out ho jaata hai."]
    ],
    faq: [
      [["TypeScript or Python for AI product work?", "AI product kaam ke liye TypeScript ya Python?"], ["Use the language of your product for the app and API; TypeScript is common for web products. Learn enough Python for notebooks, data checks and eval scripts, where Python has the most tools.", "App aur API ke liye apne product ki bhasha use karo; web products ke liye TypeScript aam hai. Notebooks, data checks aur eval scripts ke liye kaafi Python seekho, jahan Python ke sabse zyaada tools hain."]],
      [["Do I need a framework like LangChain?", "Kya LangChain jaisa framework zaroori hai?"], ["Not to start. Provider SDKs plus a small wrapper cover most product features. Add a framework when it clearly saves work, such as complex agents or many retrievers.", "Shuru mein nahi. Provider SDKs aur ek chhota wrapper zyaadatar product features sambhaal lete hain. Framework tab jodo jab woh saaf kaam bachaaye, jaise complex agents ya kai retrievers."]]
    ]
  },

  "context-memory": {
    steps: [
      ["List every context source for your feature: rules, user facts, memories, documents, tool results, recent turns, and the question.", "Apne feature ke saare context sources likho: rules, user ki baatein, memories, documents, tool results, haal ke turns, aur sawaal."],
      ["Set a token budget per source (for example rules 800, documents 3,000, history 1,500) and trim the lowest value parts first.", "Har source ka token budget rakho (jaise rules 800, documents 3,000, history 1,500) aur sabse kam kaam ke hisse pehle kaato."],
      ["Order it: stable instructions first, then facts and documents, then recent turns, with the question last.", "Order: pakke instructions pehle, phir facts aur documents, phir haal ke turns, aur sawaal aakhir mein."],
      ["Summarise older turns when the chat passes a limit and keep the summary updated as the chat grows.", "Chat limit paar kare to purane turns summarise karo aur chat badhne ke saath summary update rakho."],
      ["Save long term memories only with consent, show users what is remembered, and let them edit or delete it.", "Long term memories sirf permission se save karo, users ko dikhao kya yaad rakha hai, aur unhe edit ya delete karne do."],
      ["Enforce user and tenant filters in every database and vector query, and test that user A can never see user B's data.", "Har database aur vector query mein user aur tenant filters lagao, aur test karo ki user A kabhi user B ka data na dekh sake."]
    ],
    mistakes: [
      ["Sending the full chat history forever. Cost and latency grow with every message and quality drops.", "Poori chat history hamesha bhejte rehna. Har message ke saath kharch aur latency badhti hai aur quality girti hai."],
      ["Asking the model to \"only use this user's documents\" instead of filtering in code. A prompt is not an access control.", "Code mein filter karne ki jagah model se kehna \"sirf is user ke documents use karo\". Prompt access control nahi hai."],
      ["Remembering sensitive details (health, money, passwords) without asking, or without a way to delete them.", "Bina poochhe sensitive baatein (health, paisa, passwords) yaad rakhna, ya unhe delete karne ka tareeka na dena."]
    ],
    faq: [
      [["Isn't a 1 million token context window enough to skip all this?", "Kya 10 lakh token ka context window yeh sab chhodne ke liye kaafi nahi?"], ["It fits more, but every token still costs money and time, and models use long context less reliably. Choosing the right context is still cheaper and more accurate.", "Zyaada fit hota hai, par har token ka paisa aur time phir bhi lagta hai, aur models lamba context kam bharose se use karte hain. Sahi context chunna ab bhi sasta aur zyaada sahi hai."]],
      [["How is memory different from RAG?", "Memory RAG se kaise alag hai?"], ["RAG retrieves shared knowledge such as help articles. Memory stores facts about one user. Both are added to the prompt, but memory needs consent, editing and strict per-user isolation.", "RAG shared knowledge laata hai jaise help articles. Memory ek user ke baare mein baatein rakhti hai. Dono prompt mein judte hain, par memory ko permission, editing aur sakht per-user isolation chahiye."]]
    ]
  },

  "llm-cost-latency": {
    steps: [
      ["Log tokens, cost and latency (time to first token and total) for every call, tagged by feature, model and prompt version.", "Har call ke tokens, cost aur latency (pehle token tak aur total) log karo, feature, model aur prompt version ke tag ke saath."],
      ["Build a dashboard of cost per request, cost per active user and p50/p95 latency per feature, with a monthly budget alert.", "Har feature ka cost per request, cost per active user aur p50/p95 latency ka dashboard banao, monthly budget alert ke saath."],
      ["Find the biggest spender and try a smaller model for it; keep the switch only if your evals stay within the agreed limit.", "Sabse zyaada kharch wala hissa dhoondho aur uske liye chhota model try karo; switch tabhi rakho jab evals tay limit ke andar rahein."],
      ["Make the long prompt prefix identical across calls and enable prompt caching; measure the cache hit rate.", "Lamba prompt prefix har call mein same rakho aur prompt caching on karo; cache hit rate naapo."],
      ["Add a response cache for repeated questions with identity in the key and a sensible expiry.", "Repeat sawaalon ke liye response cache lagao, key mein identity aur sahi expiry ke saath."],
      ["Cut tokens: shorter instructions, fewer reranked chunks, max output tokens; then stream and parallelise the remaining steps.", "Tokens kam karo: chhote instructions, kam reranked chunks, max output tokens; phir baaki steps stream aur parallel karo."]
    ],
    mistakes: [
      ["Using the biggest model for every step, including simple classification, \"just to be safe\".", "Har step ke liye sabse bada model use karna, simple classification ke liye bhi, \"safe rehne ke liye\"."],
      ["A cache key without user or tenant identity, which can leak one customer's answer to another.", "Bina user ya tenant identity ki cache key, jo ek customer ka jawaab doosre ko leak kar sakti hai."],
      ["Optimising average latency while p95 users wait 12 seconds. Users remember the slow cases.", "Average latency sudhaarna jabki p95 users 12 second intezaar karte hain. Users slow cases yaad rakhte hain."]
    ],
    faq: [
      [["How do I estimate cost before building?", "Banaane se pehle cost kaise andaaza lagaayein?"], ["Multiply expected requests per day by average input and output tokens and the model prices, then add 30% for retries and growth. Compare it with the value per task.", "Roz ki expected requests ko average input aur output tokens aur model prices se guna karo, phir retries aur growth ke liye 30% jodo. Har kaam ki value se compare karo."]],
      [["Does streaming reduce cost?", "Kya streaming se cost kam hoti hai?"], ["No, it reduces perceived latency: users see words sooner, but the same tokens are generated. It does let users stop early, which can save some tokens.", "Nahi, yeh mehsoos hone wali latency kam karti hai: users ko shabd jaldi dikhte hain, par tokens utne hi bante hain. Haan, users jaldi rok sakte hain, jisse kuch tokens bachte hain."]]
    ]
  },

  "llm-reliability": {
    steps: [
      ["Set a timeout on every model and tool call, shorter for interactive screens than for background jobs.", "Har model aur tool call pe timeout lagao, interactive screens ke liye background jobs se chhota."],
      ["Retry only temporary errors (429, 5xx, timeouts) with exponential backoff, jitter and a cap of two or three tries; honour Retry-After.", "Sirf temporary errors (429, 5xx, timeouts) retry karo, exponential backoff, jitter aur do teen tries ki limit ke saath; Retry-After maano."],
      ["Give every action that changes something (email, refund, ticket) an idempotency key so retries can't repeat it.", "Kuch badalne wale har action (email, refund, ticket) ko idempotency key do taaki retries use dohra na sakein."],
      ["Define the fallback chain per feature: backup model, cached or simpler answer, then a non-AI path with a clear message.", "Har feature ki fallback chain tay karo: backup model, cached ya simple jawaab, phir saaf message ke saath non-AI raasta."],
      ["Add per-user rate limits and daily budgets in front of the model, plus a circuit breaker per provider.", "Model ke aage per-user rate limits aur daily budgets lagao, aur har provider ke liye circuit breaker."],
      ["Alert on error rate, fallback rate and budget, and test failures on purpose (block the provider in staging and watch what users see).", "Error rate, fallback rate aur budget pe alert lagao, aur failures jaan boojh kar test karo (staging mein provider block karke dekho users ko kya dikhta hai)."]
    ],
    mistakes: [
      ["Retrying immediately in a tight loop during a rate limit, which makes the overload worse and gets you blocked longer.", "Rate limit ke dauraan turant tight loop mein retry karna, jisse overload aur badhta hai aur aap zyaada der block hote ho."],
      ["Retrying an agent step that already sent an email, so the customer gets it twice.", "Aise agent step ko retry karna jo email bhej chuka tha, to customer ko do baar milti hai."],
      ["A blank screen or raw stack trace when the model is down, instead of a useful fallback.", "Model down hone pe khaali screen ya raw stack trace, kaam ke fallback ki jagah."]
    ],
    faq: [
      [["Should I use two model providers?", "Kya do model providers use karne chahiye?"], ["For important features, yes: keep a tested backup model and run your evals on it too, because prompts don't always transfer perfectly between models.", "Zaroori features ke liye haan: ek tested backup model rakho aur uspe bhi evals chalao, kyunki prompts models ke beech hamesha perfectly kaam nahi karte."]],
      [["What is a good timeout for an AI feature?", "AI feature ke liye accha timeout kitna hai?"], ["Base it on the user's patience and your p99: often 10 to 20 seconds for a streaming answer (with first token expected within 2 to 3 seconds) and longer for background jobs.", "User ke sabr aur apne p99 ke hisaab se: streaming jawaab ke liye aksar 10 se 20 second (pehla token 2 se 3 second mein) aur background jobs ke liye zyaada."]]
    ]
  },

  "prompt-release": {
    steps: [
      ["Move prompts out of scattered strings into versioned files or a prompt registry, each with an ID like support@v14.", "Prompts ko bikhri strings se nikaal kar versioned files ya prompt registry mein rakho, har ek ki ID jaise support@v14."],
      ["Log the prompt version and model with every request so any answer can be traced back.", "Har request ke saath prompt version aur model log karo taaki har jawaab ka pata lagaaya ja sake."],
      ["Add an eval job to CI that compares the candidate with the current version and fails the pull request on agreed regressions.", "CI mein eval job jodo jo candidate ko current version se compare kare aur tay regressions pe pull request fail kare."],
      ["Review a sample of changed answers side by side, not only the scores.", "Sirf scores nahi, badle hue jawaabon ka sample saath saath dekho."],
      ["Release behind a feature flag to 5% of traffic, watch online signals for a day or two, then increase in steps.", "Feature flag ke peeche 5% traffic ko release karo, ek do din online signals dekho, phir steps mein badhao."],
      ["Keep rollback to one switch, and write a changelog entry for each version.", "Rollback ek switch pe rakho, aur har version ki changelog entry likho."]
    ],
    mistakes: [
      ["Editing the prompt directly in production on a Friday evening because \"it's only text\".", "Shukravaar shaam production mein seedha prompt edit karna kyunki \"sirf text hai\"."],
      ["Upgrading to a newer model without running evals, assuming newer always means better for your task.", "Bina evals chalaaye naye model pe upgrade karna, yeh maan kar ki naya hamesha aapke kaam ke liye behtar hai."],
      ["An eval set that never grows, so new failure types from production keep slipping through.", "Aisa eval set jo kabhi nahi badhta, to production ke naye failure types nikalte rehte hain."]
    ],
    faq: [
      [["How big should the CI eval set be?", "CI eval set kitna bada hona chahiye?"], ["Start with 50 to 200 cases covering common, hard and risky inputs, and add every real failure you fix. Keep it fast enough to run on every pull request.", "Aam, mushkil aur risky inputs wale 50 se 200 cases se shuru karo, aur har asli failure jo theek karo use jodo. Itna tez rakho ki har pull request pe chal sake."]],
      [["Can LLM-as-judge scores be trusted in CI?", "Kya CI mein LLM-as-judge scores pe bharosa kar sakte hain?"], ["Partly. Check the judge against human labels first, use clear rubrics, and combine it with exact checks (format, required facts) that don't need a judge.", "Kuch had tak. Pehle judge ko human labels se check karo, saaf rubrics use karo, aur exact checks (format, zaroori facts) ke saath milao jinhe judge ki zaroorat nahi."]]
    ]
  },

  "ai-feature-metrics": {
    steps: [
      ["Write down the one outcome the feature should move and how you'll measure it, before launch.", "Launch se pehle likho ki feature kaunsa ek outcome badlega aur use kaise naapoge."],
      ["Instrument events: feature shown, used, accepted, edited (how much), regenerated, abandoned, escalated, feedback with reason.", "Events track karo: feature dikha, use hua, accept hua, edit hua (kitna), regenerate hua, chhoda gaya, escalate hua, wajah ke saath feedback."],
      ["Add guardrail metrics (complaints, safety flags, latency, cost) with alert thresholds.", "Guardrail metrics (shikaayatein, safety flags, latency, cost) alert thresholds ke saath jodo."],
      ["Each week, sample real interactions, label failures by type and count them.", "Har hafte asli interactions ka sample lo, failures ko type ke hisaab se label karo aur gino."],
      ["Turn the top failure types into eval cases and fixes, and track the counts falling over time.", "Sabse bade failure types ko eval cases aur fixes mein badlo, aur dekho ki counts samay ke saath girein."],
      ["Run an A/B test or keep a holdout group to measure real impact on the outcome.", "Outcome pe asli asar naapne ke liye A/B test chalao ya holdout group rakho."]
    ],
    mistakes: [
      ["Reporting only thumbs up rate. Few people click it and those who do aren't typical users.", "Sirf thumbs up rate report karna. Kam log dabate hain aur jo dabate hain woh aam users nahi hote."],
      ["Counting usage as success. People can use a feature a lot and still not save any time.", "Usage ko success ginna. Log feature bahut use karke bhi koi time nahi bacha sakte."],
      ["Reading real user conversations without privacy rules, consent or redaction of personal data.", "Bina privacy rules, permission ya personal data redact kiye asli user conversations padhna."]
    ],
    faq: [
      [["What if I can't run an A/B test?", "Agar A/B test na chala sakein to?"], ["Use a staged rollout by team or region and compare against groups that don't have it yet, and be honest about other changes happening at the same time.", "Team ya region ke hisaab se staged rollout karo aur un groups se compare karo jinke paas abhi nahi hai, aur usi time ho rahe doosre badlaavon ke baare mein imaandaar raho."]],
      [["Which single quality metric is best for drafts?", "Drafts ke liye sabse accha ek quality metric kaunsa hai?"], ["Edit rate (how much users change a draft before sending) is usually the most honest, because it measures what users actually did, not what they said.", "Edit rate (users bhejne se pehle draft kitna badalte hain) aam taur pe sabse imaandaar hai, kyunki yeh naapta hai ki users ne asal mein kya kiya, kya kaha nahi."]]
    ]
  },

  "ai-product-design-interview": {
    steps: [
      ["Spend the first 5 minutes on clarifying questions: users, job to be done, scale, languages, constraints and success metric.", "Pehle 5 minute clarifying questions pe lagao: users, karne wala kaam, scale, bhashaayein, constraints aur success metric."],
      ["Describe the user flow: entry point, what streams, how users verify and correct, and the failure path.", "User flow batao: entry point, kya stream hota hai, users kaise verify aur sudhaarte hain, aur failure ka raasta."],
      ["Draw the architecture: client, API, model wrapper, retrieval pipeline, tools, storage, queue; walk one request through it.", "Architecture banao: client, API, model wrapper, retrieval pipeline, tools, storage, queue; ek request ko usmein se guzaar ke dikhao."],
      ["Choose models per step with reasons, and say where you use structured output and where you stream.", "Har step ke liye model wajah ke saath chuno, aur batao kahan structured output aur kahan streaming use karoge."],
      ["Explain quality: eval set, launch criteria, online signals, feedback loop.", "Quality samjhao: eval set, launch criteria, online signals, feedback loop."],
      ["Cover production: latency budget, cost per request, caching, limits, fallbacks, privacy, permissions and prompt injection.", "Production cover karo: latency budget, cost per request, caching, limits, fallbacks, privacy, permissions aur prompt injection."],
      ["Finish with rollout and a version two plan, and summarise your key trade-offs in one minute.", "Rollout aur version do ke plan ke saath khatam karo, aur apne main trade-offs ek minute mein summarise karo."]
    ],
    mistakes: [
      ["Jumping straight to a model name and a vector database before understanding the user and goal.", "User aur goal samjhe bina seedha model ka naam aur vector database pe kood jaana."],
      ["No word on evaluation. \"How will you know it works?\" is the question interviewers care about most.", "Evaluation pe ek shabd nahi. \"Aapko kaise pata chalega ki kaam karta hai?\" interviewers ke liye sabse zaroori sawaal hai."],
      ["Ignoring cost and latency, or giving no numbers at all.", "Cost aur latency ko nazarandaaz karna, ya koi numbers hi na dena."]
    ],
    faq: [
      [["How deep should I go on model internals?", "Model ke andar ki baaton mein kitna gehra jaana chahiye?"], ["For product roles, only as far as it affects decisions: context limits, latency, cost, reliability of formats. Spend the time on UX, quality and trade-offs.", "Product roles ke liye utna hi jitna decisions pe asar daale: context limits, latency, cost, formats ki reliability. Time UX, quality aur trade-offs pe lagao."]],
      [["How do I practise this round?", "Is round ki practice kaise karein?"], ["Pick 10 everyday AI features (email reply drafts, meeting notes, search, a shopping assistant), set a 45 minute timer, talk through the 7 parts out loud and draw the diagram. Review against this lesson.", "10 rozmarra ke AI features chuno (email reply drafts, meeting notes, search, shopping assistant), 45 minute ka timer lagao, 7 hisse bol kar samjhao aur diagram banao. Is lesson se milaan karo."]]
    ]
  },

  "ai-coding-tools": {
    steps: [
      ["Pick the tool your team uses (Claude Code, Cursor, Copilot or similar) and learn its three modes: completion, editor chat and agent.", "Jo tool aapki team use karti hai (Claude Code, Cursor, Copilot ya waisa) chuno aur uske teen modes seekho: completion, editor chat aur agent."],
      ["Write a project context file with the stack, commands, folder layout and rules, and keep it short and current.", "Stack, commands, folder layout aur rules ke saath project context file likho, aur use chhota aur up to date rakho."],
      ["Before each task, write a 5 line spec: goal, files involved, constraints, tests, and what done looks like.", "Har task se pehle 5 line ka spec likho: goal, judi files, constraints, tests, aur done ka matlab."],
      ["Ask for a plan first, then implement in small steps, running tests after each step.", "Pehle plan maango, phir chhote steps mein implement karo, har step ke baad tests chalao."],
      ["Review every diff: does it match the spec and conventions, handle errors, avoid new dependencies you didn't want, and keep secrets out?", "Har diff review karo: kya spec aur conventions se match karta hai, errors sambhaalta hai, bina chaahi nayi dependencies nahi jodta, aur secrets bahar rakhta hai?"],
      ["Commit in small pieces with clear messages so you can roll back a bad step.", "Chhote tukdon mein saaf messages ke saath commit karo taaki kharab step rollback ho sake."]
    ],
    mistakes: [
      ["Accepting a huge change you don't understand because the demo works.", "Bahut bada change accept karna jo samajh nahi aata, sirf isliye ki demo chal raha hai."],
      ["Pasting API keys, customer data or private code into a tool your company hasn't approved.", "Company ne jo tool approve nahi kiya usmein API keys, customer data ya private code paste karna."],
      ["Vague prompts like \"make it better\", which produce random changes across many files.", "\"Isse behtar banao\" jaise vague prompts, jo kai files mein random changes karte hain."]
    ],
    faq: [
      [["Will AI coding tools replace AI product engineers?", "Kya AI coding tools AI product engineers ki jagah le lenge?"], ["They change the job more than remove it: less typing, more specifying, reviewing, testing and product judgement. Engineers who direct these tools well ship much faster.", "Yeh kaam ko hataate kam, badalte zyaada hain: kam typing, zyaada spec likhna, review, testing aur product samajh. Jo engineers in tools ko achhe se direct karte hain woh bahut tez ship karte hain."]],
      [["Can I use AI tools in interviews?", "Kya interviews mein AI tools use kar sakte hain?"], ["Only if the company says so; many now allow them in some rounds. Ask at the start, and if allowed, explain your plan, check the output aloud and fix issues yourself.", "Sirf tab jab company kahe; kai ab kuch rounds mein allow karti hain. Shuru mein poocho, aur allow ho to apna plan samjhao, output bol kar check karo aur problems khud theek karo."]]
    ]
  },

  "llm-testing": {
    steps: [
      ["Wrap every model call in one function so tests can replace it with a fake.", "Har model call ko ek function mein wrap karo taaki tests uski jagah nakli rakh sakein."],
      ["Write unit tests with a fake model for the happy path and for bad cases: invalid JSON, empty text, a timeout, a 429.", "Nakli model ke saath unit tests likho, sahi raaste ke liye aur kharab cases ke liye: galat JSON, khaali text, timeout, 429."],
      ["Record a few real responses as fixtures and replay them in end to end tests; re-record when the prompt or model changes.", "Kuch asli responses fixtures ki tarah record karo aur end to end tests mein replay karo; prompt ya model badle to dobara record karo."],
      ["Add contract tests: outputs match the schema, prompts include only the current user's data, tools get validated arguments.", "Contract tests jodo: outputs schema se match karein, prompts mein sirf current user ka data ho, tools ko validated arguments milein."],
      ["Run a small live smoke test on a schedule, separate from pull requests, and alert if it fails.", "Pull requests se alag, schedule pe chhota live smoke test chalao, aur fail ho to alert karo."],
      ["Keep evals as a separate job that judges quality, and link both in your CI checklist.", "Evals ko quality parakhne wala alag job rakho, aur dono ko CI checklist mein jodo."]
    ],
    mistakes: [
      ["Calling the real model in every unit test, making CI slow, costly and randomly red.", "Har unit test mein asli model call karna, jisse CI slow, mehnga aur bina wajah red hota hai."],
      ["Only testing the happy path, so the first malformed response crashes production.", "Sirf sahi raasta test karna, to pehla bigda response production crash kar deta hai."],
      ["Treating evals and tests as the same thing; you need both.", "Evals aur tests ko ek hi cheez samajhna; dono chahiye."]
    ],
    faq: [
      [["How do I test something whose output changes every time?", "Jiska output har baar badalta hai use kaise test karein?"], ["Test the parts that shouldn't change: your code's logic with fake responses, the shape of outputs with schemas, and required facts with simple checks. Judge the wording with evals.", "Un hisson ko test karo jo nahi badalne chahiye: fake responses ke saath code ka logic, schemas se outputs ki shape, aur simple checks se zaroori facts. Wording ko evals se parkho."]],
      [["Should temperature be 0 in tests?", "Kya tests mein temperature 0 hona chahiye?"], ["For live smoke tests, a low temperature reduces variation but doesn't remove it completely. That's why the main test suite uses fakes and fixtures instead.", "Live smoke tests ke liye kam temperature variation kam karta hai par poora khatam nahi karta. Isiliye main test suite fakes aur fixtures use karta hai."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
