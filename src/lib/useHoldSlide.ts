'use client';

import { useCallback, useRef, useState } from 'react';

interface UseHoldSlideOptions<T extends string> {
  onSelect: (key: T) => void;
  /** 'move' fires onSelect live while dragging over each item (e.g. filter pills).
   *  'release' fires once, only when the pointer is lifted (e.g. page navigation). */
  commitOn?: 'move' | 'release';
}

/**
 * iOS-style "press and slide" selection: hold down on one item, drag across
 * the row, and whichever item is under the finger gets highlighted/selected —
 * without lifting your finger in between (like the iOS control center / tab bar).
 */
export function useHoldSlide<T extends string>({ onSelect, commitOn = 'move' }: UseHoldSlideOptions<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(false);
  const draggedRef = useRef(false);
  const startKeyRef = useRef<T | null>(null);
  const [activeKey, setActiveKey] = useState<T | null>(null);

  const findKeyAt = useCallback((x: number, y: number): T | null => {
    const container = containerRef.current;
    if (!container) return null;
    const items = container.querySelectorAll<HTMLElement>('[data-slide-key]');
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return item.dataset.slideKey as T;
      }
    }
    return null;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pressedRef.current = true;
    draggedRef.current = false;
    const key = findKeyAt(e.clientX, e.clientY);
    startKeyRef.current = key;
    if (key) setActiveKey(key);
    // Deliberately no setPointerCapture here: capturing the pointer also
    // redirects the browser's synthesized click/mouseup to this container,
    // which breaks plain taps on <Link> anchors. The container's own bounds
    // are wide enough to track the drag across sibling items without it.
  }, [findKeyAt]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pressedRef.current) return;
    const key = findKeyAt(e.clientX, e.clientY);
    if (!key) return;
    if (key !== startKeyRef.current) draggedRef.current = true;
    setActiveKey((prev) => {
      if (key === prev) return prev;
      if (commitOn === 'move' && draggedRef.current) onSelect(key);
      return key;
    });
  }, [findKeyAt, commitOn, onSelect]);

  const finish = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pressedRef.current) return;
    pressedRef.current = false;
    const key = findKeyAt(e.clientX, e.clientY) ?? startKeyRef.current;
    if (commitOn === 'release' && draggedRef.current && key) {
      onSelect(key);
    }
    setActiveKey(null);
  }, [findKeyAt, commitOn, onSelect]);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    draggedRef.current = false;
  }, []);

  return {
    containerRef,
    /** Non-null only while actively pressed/dragging — use to preview the live selection. */
    activeKey,
    containerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
      onClickCapture,
      style: { touchAction: 'none' as const },
    },
  };
}
