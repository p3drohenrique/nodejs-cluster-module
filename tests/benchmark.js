import autocannon from "autocannon";
import { createWriteStream } from "fs";

const instance = autocannon(
  {
    url: "http://localhost:3333",
    connections: 500,
    duration: 30,
    workers: 10,
  },
  (err, result) => {
    if (err) console.log(err);
  }
);

const file = createWriteStream(`./benchmark/${Date.now()}.txt`);

autocannon.track(instance, {
  renderProgressBar: true,
  renderLatencyTable: true,
  outputStream: file,
});
