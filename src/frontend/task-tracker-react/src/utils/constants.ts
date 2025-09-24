export const APP_CONFIG = {
  APP_NAME: 'Task Tracker',
  APP_VERSION: '1.0.0',
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:2900/graphql',
  API_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const TASK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export const TASK_LIMITS = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_TASKS_PER_PAGE: 20,
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300, // milliseconds
  NOTIFICATION_DURATION: 5000, // milliseconds
  ANIMATION_DURATION: 300, // milliseconds
  MODAL_Z_INDEX: 1000,
  TOAST_Z_INDEX: 2000,
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1440,
} as const;

export const KEYBOARD_SHORTCUTS = {
  NEW_TASK: 'ctrl+n',
  SEARCH: 'ctrl+k',
  TOGGLE_THEME: 'ctrl+shift+t',
  ESCAPE: 'escape',
  ENTER: 'enter',
} as const;

export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
} as const;

export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TASK_COMPLETED: 'Task marked as completed',
  SETTINGS_SAVED: 'Settings saved successfully',
} as const;