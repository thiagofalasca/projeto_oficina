// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDialog } from '@/hooks/useDialog';

describe('useDialog', () => {
  it('deve inicializar com open false', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.open).toBe(false);
  });

  it('deve atualizar o estado "open" quando handleOpenChange for chamado (sem form)', () => {
    const { result } = renderHook(() => useDialog());
    act(() => {
      result.current.handleOpenChange(true);
    });
    expect(result.current.open).toBe(true);
  });

  it('deve resetar o formulário ao fechar o diálogo', () => {
    const resetMock = vi.fn();
    const fakeForm = { reset: resetMock };
    const { result } = renderHook(() => useDialog(fakeForm as any));
    act(() => {
      result.current.handleOpenChange(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.handleOpenChange(false);
    });
    expect(result.current.open).toBe(false);
    expect(resetMock).toHaveBeenCalled();
  });
});
