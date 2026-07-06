import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DataFailed,
  DataSuccess,
} from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import { ErrorModel, ErrorType } from '@/base/Core/NetworkStructure/Resources/errors/errorModel';
import { dialogManager } from '@/base/Presentation/Dialogs/dialog.manager';
import type EditEducationSubjectItemParams from '@/modules/EducationClassification/core/params/EducationSubjects/edit.education.subject.item.params';
import EducationSubjectItemController from '../education.subject.item.controller';

vi.mock('@/base/Presentation/Dialogs/dialog.manager', () => ({
  dialogManager: {
    hideLoading: vi.fn(),
    loading: vi.fn(),
    success: vi.fn(),
    toastError: vi.fn(),
    toastSuccess: vi.fn(),
    toastWarning: vi.fn(),
  },
}));

describe('EducationSubjectItemController', () => {
  let controller: EducationSubjectItemController;
  let mockRepository: {
    delete: ReturnType<typeof vi.fn>;
  };

  const params = {
    validate: vi.fn(() => ({ isValid: true })),
    validateOrThrow: vi.fn(),
  } as unknown as EditEducationSubjectItemParams;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = EducationSubjectItemController.getInstance();
    mockRepository = {
      delete: vi.fn(),
    };
    vi.spyOn(
      controller as unknown as { readonly repository: typeof mockRepository },
      'repository',
      'get',
    ).mockReturnValue(mockRepository);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the same singleton instance', () => {
    expect(EducationSubjectItemController.getInstance()).toBe(
      EducationSubjectItemController.getInstance(),
    );
  });

  it('shows delete error toast when the response has an error title', async () => {
    const failedState = new DataFailed<void>({
      error: new ErrorModel('Cannot delete subject', ErrorType.badRequest),
    });
    mockRepository.delete.mockResolvedValue(failedState);

    const result = await controller.delete(params);

    expect(mockRepository.delete).toHaveBeenCalledWith(
      params,
      expect.objectContaining({ useJson: true }),
    );
    expect(dialogManager.toastError).toHaveBeenCalledWith('Cannot delete subject');
    expect(result).toBe(failedState);
  });

  it('does not show delete error toast when the response has no error title', async () => {
    const successState = new DataSuccess<void>({ data: null });
    mockRepository.delete.mockResolvedValue(successState);

    const result = await controller.delete(params);

    expect(dialogManager.toastError).not.toHaveBeenCalled();
    expect(result).toBe(successState);
  });
});
