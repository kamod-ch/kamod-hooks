import { act, renderHook, waitFor } from '@testing-library/preact';
import { describe, expect, test, vi } from 'vitest';
import useAntdTable from '../index';

const tableResult = (list: unknown[] = [{ id: 1 }], total = 1) =>
  vi.fn().mockResolvedValue({ list, total });

describe('useAntdTable', () => {
  test('fetches table data on mount', async () => {
    const service = tableResult();

    const { result } = renderHook(() => useAntdTable(service));

    await waitFor(() => expect(service).toHaveBeenCalled());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tableProps.dataSource).toEqual([{ id: 1 }]);
    expect(result.current.tableProps.pagination.total).toBe(1);
  });

  test('search.submit runs service with form values', async () => {
    const service = tableResult([], 0);
    const form = {
      getFieldsValue: vi.fn(() => ({ keyword: 'preact' })),
      getFieldInstance: vi.fn(() => true),
      setFieldsValue: vi.fn(),
      resetFields: vi.fn(),
      validateFields: vi.fn((_fields: string[], callback: (errors: null, values: Record<string, string>) => void) => {
        callback(null, { keyword: 'preact' });
      }),
    };

    const { result } = renderHook(() =>
      useAntdTable(service, {
        form: form as any,
        manual: true,
      }),
    );

    await act(async () => {
      result.current.search.submit();
    });

    await waitFor(() => expect(service).toHaveBeenCalled());
    expect(form.getFieldsValue).toHaveBeenCalled();
  });
});
