import { ServerError } from '@global/helpers/handleErrors';
import { BaseRedisCache } from '@service/redis/baseRedisCache';
import { UserDocument } from '@user/types/userTypes';

export class UserCache extends BaseRedisCache {
  constructor() {
    super('USER CACHE');
  }

  public async saveUserToRedisCache(redisKey: string, userUId: string, createdUser: UserDocument) {
    const createdAt = new Date();
    const {
      _id,
      uId,
      username,
      email,
      avatarColor,
      blocked,
      blockedBy,
      postsCount,
      profilePicture,
      followersCount,
      followingCount,
      notifications,
      work,
      location,
      school,
      quote,
      bgImageId,
      bgImageVersion,
      social
    } = createdUser;

    const dataTosaveInRedisAsKeyValuePairs = {
      _id: `${_id}`,
      uId: `${uId}`,
      username: `${username}`,
      email: `${email}`,
      avatarColor: `${avatarColor}`,
      createdAt: `${createdAt}`,
      postsCount: `${postsCount}`,
      blocked: JSON.stringify(blocked),
      blockedBy: JSON.stringify(blockedBy),
      profilePicture: `${profilePicture}`,
      followersCount: `${followersCount}`,
      followingCount: `${followingCount}`,
      notifications: JSON.stringify(notifications),
      social: JSON.stringify(social),
      work: `${work}`,
      location: `${location}`,
      school: `${school}`,
      quote: `${quote}`,
      bgImageVersion: `${bgImageVersion}`,
      bgImageId: `${bgImageId}`
    };

    try {
      if (!this.redisClient.isOpen) {
        await this.redisClient.connect();
      }
      await this.redisClient.zAdd('userCache', { score: parseInt(userUId, 10), value: redisKey });
      for (const [itemKey, itemValue] of Object.entries(dataTosaveInRedisAsKeyValuePairs)) {
        await this.redisClient.hSet(`CachedUsers:${redisKey}`, `${itemKey}`, `${itemValue}`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}

export const userCache = new UserCache();
