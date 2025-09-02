import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const USAGE_LIMITS_KEY = "usage_limits";
const DEFAULT_LIMITS = {
  dailyActions: 5,
  weeklyActions: 20,
  monthlyActions: 50,
};

export interface UsageLimits {
  dailyActions: number;
  weeklyActions: number;
  monthlyActions: number;
}

export interface UsageCounts {
  daily: number;
  weekly: number;
  monthly: number;
  lastReset: {
    daily: string;
    weekly: string;
    monthly: string;
  };
}

/**
 * 利用制限の管理を行うクラス
 */
export class UsageLimitManager {
  private static instance: UsageLimitManager;
  private limits: UsageLimits;
  private counts: UsageCounts;

  private constructor() {
    this.limits = DEFAULT_LIMITS;
    this.counts = {
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastReset: {
        daily: new Date().toISOString().split("T")[0],
        weekly: this.getWeekStart(),
        monthly: new Date().toISOString().split("T")[0].substring(0, 7),
      },
    };
  }

  public static getInstance(): UsageLimitManager {
    if (!UsageLimitManager.instance) {
      UsageLimitManager.instance = new UsageLimitManager();
    }
    return UsageLimitManager.instance;
  }

  /**
   * 利用制限を初期化し、保存されたデータを読み込む
   */
  async initialize(): Promise<void> {
    try {
      const savedLimits = await AsyncStorage.getItem(USAGE_LIMITS_KEY);
      if (savedLimits) {
        const data = JSON.parse(savedLimits);
        this.limits = { ...this.limits, ...data.limits };
        this.counts = { ...this.counts, ...data.counts };
      }

      // 日付が変わっている場合はカウントをリセット
      await this.checkAndResetCounts();
    } catch (error) {
      console.error("利用制限の初期化に失敗しました:", error);
    }
  }

  /**
   * アクションを実行し、制限に達しているかチェック
   */
  async performAction(): Promise<{ canPerform: boolean; reason?: string }> {
    await this.checkAndResetCounts();

    // 制限チェック
    if (this.counts.daily >= this.limits.dailyActions) {
      return { canPerform: false, reason: "daily_limit" };
    }
    if (this.counts.weekly >= this.limits.weeklyActions) {
      return { canPerform: false, reason: "weekly_limit" };
    }
    if (this.counts.monthly >= this.limits.monthlyActions) {
      return { canPerform: false, reason: "monthly_limit" };
    }

    // アクション実行
    this.counts.daily++;
    this.counts.weekly++;
    this.counts.monthly++;

    await this.saveData();

    return { canPerform: true };
  }

  /**
   * 制限に達しているかチェック
   */
  async isLimitReached(): Promise<boolean> {
    await this.checkAndResetCounts();

    return (
      this.counts.daily >= this.limits.dailyActions ||
      this.counts.weekly >= this.limits.weeklyActions ||
      this.counts.monthly >= this.limits.monthlyActions
    );
  }

  /**
   * 現在の利用状況を取得
   */
  getCurrentUsage(): { counts: UsageCounts; limits: UsageLimits } {
    return {
      counts: { ...this.counts },
      limits: { ...this.limits },
    };
  }

  /**
   * 利用制限を設定
   */
  async setLimits(limits: Partial<UsageLimits>): Promise<void> {
    this.limits = { ...this.limits, ...limits };
    await this.saveData();
  }

  /**
   * カウントをリセット
   */
  async resetCounts(): Promise<void> {
    this.counts = {
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastReset: {
        daily: new Date().toISOString().split("T")[0],
        weekly: this.getWeekStart(),
        monthly: new Date().toISOString().split("T")[0].substring(0, 7),
      },
    };
    await this.saveData();
  }

  /**
   * 日付が変わっている場合にカウントをリセット
   */
  private async checkAndResetCounts(): Promise<void> {
    const today = new Date().toISOString().split("T")[0];
    const currentWeek = this.getWeekStart();
    const currentMonth = today.substring(0, 7);

    let needsReset = false;

    // 日次リセット
    if (this.counts.lastReset.daily !== today) {
      this.counts.daily = 0;
      this.counts.lastReset.daily = today;
      needsReset = true;
    }

    // 週次リセット
    if (this.counts.lastReset.weekly !== currentWeek) {
      this.counts.weekly = 0;
      this.counts.lastReset.weekly = currentWeek;
      needsReset = true;
    }

    // 月次リセット
    if (this.counts.lastReset.monthly !== currentMonth) {
      this.counts.monthly = 0;
      this.counts.lastReset.monthly = currentMonth;
      needsReset = true;
    }

    if (needsReset) {
      await this.saveData();
    }
  }

  /**
   * 週の開始日を取得（月曜日を週の開始とする）
   */
  private getWeekStart(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    return monday.toISOString().split("T")[0];
  }

  /**
   * データを保存
   */
  private async saveData(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        USAGE_LIMITS_KEY,
        JSON.stringify({
          limits: this.limits,
          counts: this.counts,
        })
      );
    } catch (error) {
      console.error("利用制限データの保存に失敗しました:", error);
    }
  }
}

/**
 * 利用制限をチェックするフック
 */
export const useUsageLimits = () => {
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usage, setUsage] = useState<{
    counts: UsageCounts;
    limits: UsageLimits;
  } | null>(null);

  useEffect(() => {
    checkLimits();
  }, []);

  const checkLimits = async () => {
    try {
      setIsLoading(true);
      const manager = UsageLimitManager.getInstance();
      await manager.initialize();

      const limitReached = await manager.isLimitReached();
      setIsLimitReached(limitReached);

      const currentUsage = manager.getCurrentUsage();
      setUsage(currentUsage);
    } catch (error) {
      console.error("利用制限のチェックに失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const performAction = async (): Promise<{
    canPerform: boolean;
    reason?: string;
  }> => {
    const manager = UsageLimitManager.getInstance();
    const result = await manager.performAction();

    if (result.canPerform) {
      await checkLimits();
    }

    return result;
  };

  const resetLimits = async () => {
    const manager = UsageLimitManager.getInstance();
    await manager.resetCounts();
    await checkLimits();
  };

  return {
    isLimitReached,
    isLoading,
    usage,
    performAction,
    resetLimits,
    checkLimits,
  };
};
