'use client';
import React, { useRef } from 'react';
import Down from '@/assets/icons/down.svg';
import { db } from '@/lib/db';
import { useBgStore } from '@/stores/useBgStore';
import Left from '@/assets/icons/left.svg';
import { Container } from '../shared/Container';
import { useBgSettingStore } from '@/stores/useBgSettingStore';

export function BackGroundSetting() {
  // ❗ 여기서 bgUrl, fileName 을 함께 구조분해 할당받아야 함
  const { bgUrl, fileName, setBgUrl, setFileName } = useBgStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, closeBgSetting } = useBgSettingStore();

  // 파일 업로드 처리
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    setFileName(baseName);

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      // IndexedDB 저장
      await db.images.put({
        id: 'bgImage',
        base64: result,
        fileName: baseName,
      });
      // Zustand 전역 상태 업데이트 → 즉시 프리뷰/파일명 반영
      setBgUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // 숨겨진 input 태그 트리거
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div className='text-primary-200/80 font-bold flex flex-col gap-2 w-full'>
        <div className='flex items-center gap-1'>
          <button
            type='button'
            onClick={closeBgSetting}
            className='hover:opacity-80 active:scale-95 transition'
          >
            <Left className='w-5 h-5 text-primary-300' />
          </button>
          <span>배경화면</span>
        </div>
        <div className='flex gap-2'>
          {/* ❗ 프리뷰 영역에서 Zustand의 bgUrl 사용 */}
          <div
            className='h-16 w-32 bg-primary-700 border-2 border-primary-400/80 
        outline border-primary-600/90 
        rounded-md 
        overflow-hidden flex items-center justify-center'
          >
            {bgUrl ? (
              <img
                src={bgUrl}
                alt='배경 미리보기'
                className='h-full w-full object-cover'
              />
            ) : (
              <span className='text-xs text-primary-300/80'>미리보기</span>
            )}
          </div>

          <div className='w-full text-sm flex flex-col gap-1'>
            {/* ❗ 파일명 표시에도 Zustand의 fileName 사용 */}
            <div className='p-1 border border-primary-200/20 rounded-md w-full whitespace-nowrap overflow-hidden text-ellipsis'>
              {fileName || '이미지 파일명'}
            </div>

            <div className='flex gap-2'>
              <button
                type='button'
                onClick={handleUploadClick}
                className='flex-1 flex-center gap-1 p-1 border border-primary-600 shadow-md 
              bg-primary-500 rounded-md active:bg-primary-400 transition-all duration-200 ease-in-out'
              >
                사진 추가
                <Down className='w-3 h-3' />
              </button>
            </div>
          </div>
        </div>

        {/* 숨겨진 파일 인풋 */}
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </div>
    </Container>
  );
}
