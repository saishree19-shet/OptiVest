const http = require('http');

const data = JSON.stringify({
  budget: 1000000,
  riskAppetite: "Aggressive",
  duration: 5
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/optimize',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => {
    console.log("RESPONSE:", JSON.parse(body));
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
