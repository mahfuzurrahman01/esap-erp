'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { FieldError, Loader, Text } from 'rizzui';
import cn from '../../utils/class-names';
import { PiPencilSimple } from 'react-icons/pi';
import { LoadingSpinner } from '../../ui/file-upload/upload-zone';
import UploadIcon from '../../components/shape/upload';

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const formValue = getValues(name);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles?.length) return;

      setIsUploading(true);
      try {
        const file = selectedFiles[0];
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFiles([fileWithPreview]);

        // Here you would typically upload the file to your server
        // For now, we'll simulate a successful upload
        if (setValue) {
          setValue(name, {
            name: file.name,
            size: file.size,
            url: fileWithPreview.preview,
          });
        }
        toast.success(
          <Text as="b" className="font-semibold">
            Avatar updated
          </Text>
        );
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setIsUploading(false);
      }
    },
    [name, setValue]
  );

  return (
    <div className={cn('grid gap-5', className)}>
      <div
        className={cn(
          'relative grid h-40 w-40 place-content-center rounded-full border-[1.8px]'
        )}
      >
        {formValue ? (
          <>
            <figure className="absolute inset-0 rounded-full">
              <Image
                fill
                alt="user avatar"
                src={formValue?.url}
                className="rounded-full"
              />
            </figure>
            <div
              className={cn(
                'absolute inset-0 grid place-content-center rounded-full bg-black/70'
              )}
            >
              {isUploading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <PiPencilSimple className="h-5 w-5 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <div
            className={cn(
              'absolute inset-0 z-10 grid cursor-pointer place-content-center'
            )}
          >
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <UploadIcon className="mx-auto h-12 w-12" />
              {isUploading ? (
                <Loader variant="spinner" className="justify-center" />
              ) : (
                <Text className="font-medium">Drop or select file</Text>
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
