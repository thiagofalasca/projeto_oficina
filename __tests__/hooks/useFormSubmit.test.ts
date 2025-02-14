// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

describe('useFormSubmit', () => {
  const fakeForm = {
    setError: vi.fn(),
  };

  it('deve setar messageState para sucesso quando a ação retorna sucesso', async () => {
    const action = vi.fn(async () => {
      return { success: true };
    });

    const { result } = renderHook(() => useFormSubmit(fakeForm as any, action));
    const formData = { field: 'valor' };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(action).toHaveBeenCalledWith(formData);
    expect(result.current.messageState).toEqual({ success: true });
    expect(fakeForm.setError).not.toHaveBeenCalled();
  });

  it('deve chamar setError quando validationErrors estiverem presentes', async () => {
    const validationErrors = { field: ['Mensagem de erro'] };
    const action = vi.fn(async () => {
      return { success: false, validationErrors };
    });

    const { result } = renderHook(() => useFormSubmit(fakeForm as any, action));
    const formData = { field: 'valor' };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(action).toHaveBeenCalledWith(formData);
    expect(result.current.messageState).toEqual({
      success: false,
      validationErrors,
    });
    expect(fakeForm.setError).toHaveBeenCalledWith('field', {
      message: 'Mensagem de erro',
    });
  });
});
