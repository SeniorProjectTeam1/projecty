async function sendPrompt() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const prompt = document.getElementById('prompt').value.trim();
    const responseBox = document.getElementById('response');
    
    if (!apiKey || !prompt) {
      alert('Please enter both API key and prompt.');
      return;
    }
  
    responseBox.textContent = 'Loading...';
  
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });
  
      const data = await res.json();
  
      if (data.error) {
        responseBox.textContent = `Error: ${data.error.message}`;
      } else {
        const aiReply = data.choices[0].message.content;
        responseBox.textContent = aiReply;
      }
    } catch (err) {
      responseBox.textContent = `Request failed: ${err.message}`;
    }
  }
  