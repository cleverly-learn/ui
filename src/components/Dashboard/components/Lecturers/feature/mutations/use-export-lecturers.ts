import { lecturersApiService } from 'api/lecturers/lecturers.api.service';
import { useMutation } from '@tanstack/react-query';

export const useExportLecturers = () =>
  useMutation(() => lecturersApiService.export(), {
    onSuccess: (data) => {
      const url = URL.createObjectURL(
        new Blob([data], { type: 'application/octet-stream' }),
      );

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Passwords.xlsx`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      URL.revokeObjectURL(url);
    },
  });
