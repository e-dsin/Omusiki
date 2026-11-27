# Resolve the Compose service name "db" to an IPv4 address and put that
# address in DATABASE_URL. Prisma's engine reports P1001 for the hostname
# db even when Postgres is accepting connections on the Compose network.
node << 'JS'
const dns = require("dns");
const fs = require("fs");
const net = require("net");

dns.setDefaultResultOrder("ipv4first");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function wait(attempt) {
  dns.lookup("db", { family: 4 }, (error, address) => {
    if (error) return retry(attempt, `cannot resolve db: ${error.message}`);
    const socket = net.connect({ host: address, port: 5432, family: 4 });
    const giveUp = (reason) => {
      socket.destroy();
      retry(attempt, `${address}:5432 ${reason}`);
    };
    socket.setTimeout(2000);
    socket.once("connect", () => {
      socket.end();
      fs.writeFileSync("/tmp/omusiki-db-host", address);
      console.error(`Postgres is reachable at ${address}:5432`);
      process.exit(0);
    });
    socket.once("timeout", () => giveUp("timed out"));
    socket.once("error", (connectError) => giveUp(connectError.message));
  });
}

function retry(attempt, message) {
  if (attempt > 30) fail(message);
  console.error(`Waiting for Postgres (${message})`);
  setTimeout(() => wait(attempt + 1), 2000);
}

wait(1);
JS

export DATABASE_URL="$(node -e '
const url = new URL(process.env.DATABASE_URL);
const fs = require("fs");
url.hostname = fs.readFileSync("/tmp/omusiki-db-host", "utf8").trim();
url.searchParams.set("sslmode", "disable");
process.stdout.write(url.toString());
')"
