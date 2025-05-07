fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.2', prompt: 'test', stream: false }),
  }).then(r => r.json()).then(console.log).catch(console.error);