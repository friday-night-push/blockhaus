export const BASE_API_URL = 'https://ya-praktikum.tech/api/v2';

export const RESOURCE_URL = BASE_API_URL + '/resources';

export enum PAGE_ROUTES {
  MENU = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  YANDEX = '/yandex',
  RESET_PAGE = '/reset-password',
  RECOVER_PASSWORD = '/recover-password',
  PROFILE = '/profile',
  GAME = '/game',
  GAME_PAUSE = '/game-pause',
  GAME_RESULT = '/game-result',
  GAME_SETUP = '/game-setup',
  LEADER_BOARD = '/leader-board',
  ERROR_BOUNDARY = '/error-boundary',
  FORUM = '/forum',
  FORUM_TOPIC = '/forum/:topicId/:page?',
}
