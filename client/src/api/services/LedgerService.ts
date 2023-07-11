import { request } from '../core/request';

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }: { requestBody: any}) {
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
  static findAll(limit: number, offset: number) {
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
  static findOne({ id }: { id: string }) {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: { id: string; requestBody: any }) {
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
  static remove({ ids }: { ids: string[] }) {
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

