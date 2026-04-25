const area = document.getElementById('dbJSON');

// Charger la DB au démarrage
chrome.storage.local.get(['vocabDB'], (res) => {
    area.value = JSON.stringify(res.vocabDB || {}, null, 4);
});

// Sauvegarder les modifs
document.getElementById('save').addEventListener('click', () => {
    try {
        const newData = JSON.parse(area.value);
        chrome.storage.local.set({ vocabDB: newData }, () => {
            alert("Base de données mise à jour !");
        });
    } catch (e) {
        alert("Erreur de format JSON ! Vérifie les virgules et les guillemets.");
    }
});