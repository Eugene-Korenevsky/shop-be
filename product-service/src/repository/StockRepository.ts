import { Stock } from "src/entity/Product";
import { BasicRepository, stockBasicRepository } from "./BasicRepository";

class StockRepository {
  private readonly basicRepository: BasicRepository<Stock>;
  private readonly tableName = 'stocks';
  private readonly idColumnName = 'product_id';

  constructor(basicRepository: BasicRepository<Stock>) {
    this.basicRepository = basicRepository
  }

  public async getAllStocks(): Promise<Stock[]> {
    const stocks = await this.basicRepository.getAll(this.tableName);
    if (stocks) {
      return stocks.map((stock: Stock) => {
        return this.mapStock(stock);
      });
    }
    return [];
  }

  public async getStockId(id: string): Promise<Stock> {
    const stock = await this.basicRepository.getById(this.tableName, id, this.idColumnName);
    console.log(`get stock result ${JSON.stringify(stock)}`);
    if (stock) {
      return this.mapStock(stock);
    }
    return {
      product_id: id,
      count: 0
    } as Stock;
  }

  private mapStock = (stock: Stock): Stock => {
    return {
      product_id: stock.product_id['S'],
      count: stock.count['N']
    } as Stock;
  }

}

export const stockRepository = new StockRepository(stockBasicRepository);