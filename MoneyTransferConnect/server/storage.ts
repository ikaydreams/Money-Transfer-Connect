import { 
  users, type User, type InsertUser,
  transfers, type Transfer, type InsertTransfer,
  exchangeRates, type ExchangeRate, type InsertExchangeRate
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transfer operations
  getTransfer(id: number): Promise<Transfer | undefined>;
  getTransferByTransactionId(transactionId: string): Promise<Transfer | undefined>;
  getTransfersByUserId(userId: number): Promise<Transfer[]>;
  createTransfer(transfer: InsertTransfer): Promise<Transfer>;
  
  // Exchange rate operations
  getExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRate | undefined>;
  getAllExchangeRates(): Promise<ExchangeRate[]>;
  createExchangeRate(rate: InsertExchangeRate): Promise<ExchangeRate>;
  updateExchangeRate(id: number, rate: Partial<ExchangeRate>): Promise<ExchangeRate | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transfers: Map<number, Transfer>;
  private exchangeRates: Map<number, ExchangeRate>;
  private userIdCounter: number;
  private transferIdCounter: number;
  private exchangeRateIdCounter: number;

  constructor() {
    this.users = new Map();
    this.transfers = new Map();
    this.exchangeRates = new Map();
    this.userIdCounter = 1;
    this.transferIdCounter = 1;
    this.exchangeRateIdCounter = 1;
    
    // Initialize with default exchange rates
    this.initExchangeRates();
  }

  // Initialize exchange rates
  private initExchangeRates() {
    const defaultRates = [
      { fromCurrency: 'GH', toCurrency: 'US', rate: '0.08325' },
      { fromCurrency: 'GH', toCurrency: 'EU', rate: '0.07628' },
      { fromCurrency: 'US', toCurrency: 'GH', rate: '12.01205' },
      { fromCurrency: 'US', toCurrency: 'EU', rate: '0.91686' },
      { fromCurrency: 'EU', toCurrency: 'GH', rate: '13.10967' },
      { fromCurrency: 'EU', toCurrency: 'US', rate: '1.09068' }
    ];
    
    defaultRates.forEach(rate => {
      this.createExchangeRate({
        fromCurrency: rate.fromCurrency,
        toCurrency: rate.toCurrency,
        rate: rate.rate
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      phoneNumber: insertUser.phoneNumber || null 
    };
    this.users.set(id, user);
    return user;
  }

  // Transfer operations
  async getTransfer(id: number): Promise<Transfer | undefined> {
    return this.transfers.get(id);
  }

  async getTransferByTransactionId(transactionId: string): Promise<Transfer | undefined> {
    return Array.from(this.transfers.values()).find(
      (transfer) => transfer.transactionId === transactionId
    );
  }

  async getTransfersByUserId(userId: number): Promise<Transfer[]> {
    return Array.from(this.transfers.values()).filter(
      (transfer) => transfer.userId === userId
    );
  }

  async createTransfer(insertTransfer: InsertTransfer): Promise<Transfer> {
    const id = this.transferIdCounter++;
    const now = new Date();
    const transfer: Transfer = { 
      ...insertTransfer, 
      id, 
      createdAt: now,
      status: insertTransfer.status || 'completed',
      userId: insertTransfer.userId || null
    };
    this.transfers.set(id, transfer);
    return transfer;
  }

  // Exchange rate operations
  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRate | undefined> {
    return Array.from(this.exchangeRates.values()).find(
      (rate) => rate.fromCurrency === fromCurrency && rate.toCurrency === toCurrency
    );
  }

  async getAllExchangeRates(): Promise<ExchangeRate[]> {
    return Array.from(this.exchangeRates.values());
  }

  async createExchangeRate(insertRate: InsertExchangeRate): Promise<ExchangeRate> {
    const id = this.exchangeRateIdCounter++;
    const now = new Date();
    // Ensure the rate is stored as a string in the database
    const rate: ExchangeRate = { 
      ...insertRate, 
      id, 
      updatedAt: now
    };
    this.exchangeRates.set(id, rate);
    return rate;
  }

  async updateExchangeRate(id: number, rateUpdate: Partial<ExchangeRate>): Promise<ExchangeRate | undefined> {
    const existingRate = this.exchangeRates.get(id);
    if (!existingRate) {
      return undefined;
    }
    
    const now = new Date();
    const updatedRate = { ...existingRate, ...rateUpdate, updatedAt: now };
    this.exchangeRates.set(id, updatedRate);
    return updatedRate;
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
