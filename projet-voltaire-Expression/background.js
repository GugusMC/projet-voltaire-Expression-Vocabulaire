chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CALL_LM_STUDIO") {
    fetch("http://localhost:1234/api/v1/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.data)
    })
    .then(response => response.json())
    .then(data => {
      // --- EXTRACTION CIBLÉE POUR TON MODÈLE ---
      let text = "";
      
      if (data.output && Array.isArray(data.output) && data.output[0].content) {
        text = data.output[0].content; // Format Granite
      } else if (data.choices && data.choices[0].message) {
        text = data.choices[0].message.content; // Format OpenAI classique
      } else {
        text = JSON.stringify(data); // Sécurité
      }
      
      sendResponse({ success: true, answer: text });
    })
    .catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true; 
  }
});