// --- INTERFACE ---
const container = document.createElement("div");
container.style = "position: fixed; top: 10px; right: 10px; z-index: 10000; display: flex; flex-direction: column; gap: 8px; font-family: sans-serif; align-items: flex-end;";
document.body.appendChild(container);

// Bouton principal
const btn = document.createElement("button");
btn.innerText = "🔍 ANALYSER (Z)";
btn.style = "padding: 12px 20px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2); width: 160px;";
container.appendChild(btn);

// Affichage de la RÉPONSE (Remplace la pop-up)
const resDiv = document.createElement("div");
resDiv.style = "padding: 15px; background: #fff; color: #2c3e50; border-left: 5px solid #27ae60; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: none; width: 250px; font-weight: 500; font-size: 14px;";
container.appendChild(resDiv);

// Bouton pour la console
const toggleDebug = document.createElement("button");
toggleDebug.innerText = "⚙️ Console";
toggleDebug.style = "padding: 5px 10px; background: #7f8c8d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; opacity: 0.7;";
container.appendChild(toggleDebug);

// Console de debug
const debugPanel = document.createElement("div");
debugPanel.style = "position: fixed; bottom: 0; left: 0; width: 100%; height: 120px; background: #111; color: #0f0; font-family: monospace; font-size: 11px; z-index: 9999; border-top: 2px solid #333; overflow-y: auto; padding: 10px; box-sizing: border-box; display: block;";
document.body.appendChild(debugPanel);

// --- FONCTIONS UI ---

toggleDebug.onclick = () => {
    debugPanel.style.display = debugPanel.style.display === "none" ? "block" : "none";
};

function log(msg, color = "#0f0") {
    const line = document.createElement("div");
    line.style.color = color;
    line.innerHTML = `> [${new Date().toLocaleTimeString()}] ${msg}`;
    debugPanel.appendChild(line);
    debugPanel.scrollTop = debugPanel.scrollHeight;
}

function showResultOnPage(text, isIA = false) {
    resDiv.style.display = "block";
    resDiv.innerHTML = `<div style="font-size:10px; color:#7f8c8d; margin-bottom:4px;">${isIA ? '🤖 RÉPONSE IA' : '✅ BASE DE DONNÉES'}</div>${text}`;
}

// --- LOGIQUE ---

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'z') processDefinition();
});

btn.onclick = processDefinition;

async function processDefinition() {
    log("Scan de la page...");
    const wordEl = document.querySelector(".qccv-question");
    const propEls = document.querySelectorAll(".qc-proposal");

    if (!wordEl) {
        log("ERREUR : Mot introuvable", "#f00");
        return;
    }

    const word = wordEl.innerText.trim();
    const proposals = Array.from(propEls).map(el => el.innerText.trim());

    chrome.storage.local.get(['vocabDB'], async (res) => {
        let db = res.vocabDB || {};
        
        if (db[word]) {
            log(`DB : ${db[word]}`, "#0af");
            showResultOnPage(db[word], false);
        } else {
            log("Appel IA...");
            const aiRes = await askAI(word, proposals);
            if (aiRes) {
                db[word] = aiRes;
                chrome.storage.local.set({ vocabDB: db });
                log(`IA : ${aiRes}`, "#ff0");
                showResultOnPage(aiRes, true);
            }
        }
    });
}

async function askAI(word, options) {
    const requestData = {
        "model": "meta-llama-3-8b-instruct",
        "input": `Choisis la bonne définition pour "${word}" parmi : ${options.join(" | ")}. Réponds uniquement par la définition.`,
        "temperature": 0
    };

    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "CALL_LM_STUDIO", data: requestData }, (response) => {
            if (response && response.success) {
                resolve(response.answer.trim());
            } else {
                log("Erreur API", "#f00");
                resolve(null);
            }
        });
    });
}