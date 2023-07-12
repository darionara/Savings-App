import { request } from '../core/request';

interface RequestBodyCreate {
  mode: 'INCOME' | 'EXPENSE';
  amountInCents: number;
  categoryId: string | null;
  title: string;
}

interface RequestBodyUpdate {
  id: number;
  createdAt: number;
  title: string;
  mode: 'INCOME' | 'EXPENSE';
  amountInCents: number;
  categoryId: string | null;
}

interface ResponseBody {
  id: string;
  categoryId: string | null;
  createdAt: number;
  title: string;
  mode: 'INCOME' | 'EXPENSE';
  amountInCents: number;
  category: {
    name: string;
    id: string;
    color: string;
    budgetId?: string;
    ledgerIds?: string | string[];
    createdAt?: number;
  }
}

interface ResponseBodyCreate {
  mode: 'INCOME' | 'EXPENSE';
  title: string;
  amountInCents: number;
  categoryId: string | null;
  createdAt: number;
  id: string;
}

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }: { requestBody: RequestBodyCreate}): Promise<ResponseBodyCreate> {
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
  //`/ledger?limit=${limit}&offset=${offset}`
  static findAll(limit: number, offset: number): Promise<ResponseBody[]> {
    return request({
      method: 'GET',
      path: `/ledger`,
      query: {limit, offset}
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }: { id: string }): Promise<ResponseBody> {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: { id: string; requestBody: RequestBodyUpdate }): Promise<ResponseBodyCreate> {
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

