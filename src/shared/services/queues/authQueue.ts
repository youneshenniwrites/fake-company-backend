import { AuthJob } from '@auth/types/authTypes';
import { BaseQueue } from '@service/queues/baseQueue';

class AuthQueue extends BaseQueue {
  constructor() {
    super('auth');
    // this.processJob('addAuthUserToDB', 5, authWorker.addAuthUserToDB);
  }

  public addAuthUserJob(name: string, data: AuthJob): void {
    this.addJob(name, data);
  }
}

export const authQueue = new AuthQueue();
