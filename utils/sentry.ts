import * as Sentry from '@sentry/node';
import { httpIntegration, modulesIntegration } from '@sentry/node';
import { logError } from './errorLogger';
import * as fs from 'fs';
import * as path from 'path';

// 設定を読み込む関数
function loadConfig() {
  try {
    const configPath = path.resolve(__dirname, '../data/config.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('config.jsonの読み込みに失敗しました:', error);
    return { sentry: { enabled: false } };
  }
}

/**
 * Sentryを初期化する
 */
export function initSentry(): void {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

// 残りの実装は変更なし
export function captureException(error: Error | any, context?: string): void {
  if (context) {
    Sentry.withScope(scope => {
      scope.setTag('context', context);
      if (typeof error === 'string') {
        Sentry.captureMessage(error, 'error');
      } else {
        Sentry.captureException(error);
      }
    });
  } else {
    Sentry.captureException(error);
  }
  
  // 既存のエラーロガーも呼び出す
  logError(context || 'unknown', error instanceof Error ? error : new Error(String(error)));
}