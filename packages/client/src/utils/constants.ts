export const BASE_API_URL = 'http://localhost:3001/api/v1';

export const RESOURCE_URL = BASE_API_URL + '/resources';

export enum PAGE_ROUTES {
  MENU = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  CHANGE_PASSWORD = '/change-password',
  RECOVER_PASSWORD = '/recover-password',
  PROFILE = '/profile',
  GAME = '/game',
  GAME_PAUSE = '/game-pause',
  GAME_RESULT = '/game-result',
  GAME_SETUP = '/game-setup',
  GAME_DIFFICULT = '/game-difficult',
  LEADER_BOARD = '/leader-board',
  ERROR_BOUNDARY = '/error-boundary',
  FORUM = '/forum',
  FORUM_TOPIC = '/forum/:topicId/:page?',
}
