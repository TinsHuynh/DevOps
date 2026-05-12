const dns = require('dns');
dns.resolveSrv('_mongodb._tcp.quanlysinhvien.4wxqpuq.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS Resolve Error:', err);
  } else {
    console.log('DNS Resolve Success:', addresses);
  }
});
