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
resDiv.style = "padding: 30px; background: #fff; color: #2c3e50; border-left: 10px solid #27ae60; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: none; width: 250px; font-weight: 500; font-size: 10px;";
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
    resDiv.innerHTML = `<div style="font-size:15px; color:#7f8c8d; margin-bottom:4px;">${isIA ? '🤖 RÉPONSE IA' : '✅ BASE DE DONNÉES'}</div><div style="font-size:15px">${text}</div>`;
}

// --- LOGIQUE ---

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'z') processDefinition();
});

btn.onclick = processDefinition;

async function processDefinition() {
    log("Scan de la page...");
    const wordEl = document.querySelector(".qccv-question");
    const consigneE1 = document.querySelector(".qccv-instructions");
    const propEls = document.querySelectorAll(".qc-proposal");

    if (!wordEl) {
        log("ERREUR : Mot introuvable", "#f00");
        return;
    }

    const word = wordEl.innerText.trim();
    const consigne = consigneE1.innerText.trim();
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
        "input": `Choisis la bonne définition pour "${word}" parmi : ${options.join(" | ")}. Voici la consigne : $consigne . Réponds uniquement par la définition.`,
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

// --- SYSTÈME D'AUTO-CORRECTION (V3 - Sélecteurs Précis) ---

document.addEventListener("click", () => {
    log("Clic détecté, attente de la validation du site...");
    
    // On attend un peu plus longtemps (400ms) pour être sûr que l'animation 
    // de validation du Projet Voltaire est terminée et que les classes sont posées.
    setTimeout(() => {
        // Sélecteur précis : on cherche l'élément qui a TOUTES ces classes
        const correctEl = document.querySelector(".qc-proposal.correct.locked");
        const wordEl = document.querySelector(".qccv-question");

        if (correctEl && wordEl) {
            const trueDefinition = correctEl.innerText.trim();
            const word = wordEl.innerText.trim();
            
            log(`Analyse post-clic pour "${word}"...`);

            chrome.storage.local.get(['vocabDB'], (res) => {
                let db = res.vocabDB || {};

                // Si la définition en base est différente de la réalité (correctEl)
                if (db[word] !== trueDefinition) {
                    log(`⚠️ Discordance ! IA disait: "${db[word]}", La vérité est: "${trueDefinition}"`, "#f39c12");
                    
                    db[word] = trueDefinition;
                    chrome.storage.local.set({ vocabDB: db }, () => {
                        log("✅ Base de données corrigée avec succès.", "#2ecc71");
                        
                        // Mise à jour visuelle immédiate
                        resDiv.style.display = "block";
                        resDiv.style.borderLeft = "5px solid #f39c12";
                        resDiv.innerHTML = `<div style="font-size:15px; color:#f39c12; margin-bottom:4px;">🎯 ERREUR IA CORRIGÉE</div><div style="font-size:15px">${trueDefinition}</div>`;
                        
                        // Auto-hide après 5s pour la flemme
                        setTimeout(() => { resDiv.style.display = "none"; }, 5000);
                    });
                } else {
                    log("✅ L'IA avait raison (ou DB déjà à jour).", "#2ecc71");
                }
            });
        } else {
            log("⏳ Pas encore de classe '.correct.locked' détectée.");
        }
    }, 400); 
}, true);
