import { act, renderHook, waitFor } from '@testing-library/preact';
import { describe, expect, test, vi } from 'vitest';
import useFusionTable from '../index';

describe('useFusionTable', () => {
  test('exposes Fusion-style table and pagination props', async () => {
    const service = vi.fn().mockResolvedValue({
      list: [{ id: 42 }],
      total: 1,
    });

    const field = {
      getNames: () => ['keyword'],
      getValues: () => ({ keyword: '' }),
      setValues: vi.fn(),
      reset: vi.fn(),
      resetToDefault: vi.fn(),
      validate: (_fields: string[], cb: (err: null, values: Record<string, string>) => void) => {
        cb(null, { keyword: 'hooks' });
      },
    };

    const { result } = renderHook(() =>
      useFusionTable(service, {
        field,
        manual: true,
      }),
    );

    await act(async () => {
      result.current.search.submit();
    });

    await waitFor(() => expect(service).toHaveBeenCalled());
    await waitFor(() => expect(result.current.tableProps.dataSource).toEqual([{ id: 42 }]));

    expect(result.current.paginationProps.total).toBe(1);
    expect(typeof result.current.tableProps.onSort).toBe('function');
    expect(typeof result.current.paginationProps.onChange).toBe('function');
  });
});
