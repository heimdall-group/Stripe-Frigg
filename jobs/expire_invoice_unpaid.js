import { exit } from 'process';
import { parentPort } from 'worker_threads';

(async () => {
  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage('done');
  else exit(400);
})();
