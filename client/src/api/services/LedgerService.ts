import { request } from '../core/request';

export type Mode = 'INCOME' | 'EXPENSE';

interface CreateLedger {
  mode: Mode;
  amountInCents: number;
  categoryId: string | null;
  title: string;
}

interface UpdateLedger extends CreateLedger{
  id: number;
  createdAt: number;
}

export interface Ledger {
  id: string;
  categoryId: string | null;
  createdAt: number;
  title: string;
  mode: Mode;
  amountInCents: number;
  category: {
    name: string;
    id: string;
    color: string;
    budgetId?: string;
    ledgerIds?: string | string[];
    createdAt?: number;
  };
}

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }: { requestBody: CreateLedger }): Promise<Ledger> {
    return request({
      method: 'POST',
      path: `/ledger`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll(limit?: number, offset?: number, sort?: string): Promise<Ledger[]> {
    return request({
      method: 'GET',
      path: `/ledger`,
      query: { limit, offset, sort },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }: { id: string }): Promise<Ledger> {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: { id: string; requestBody: UpdateLedger }): Promise<void> {
    return request({
      method: 'PATCH',
      path: `/ledger/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }: { ids: string[] }): Promise<void> {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/ledger/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/ledger`,
          body: { ids },
        });
  }
}

