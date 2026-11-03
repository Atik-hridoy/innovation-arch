'use client';

import { useEffect, useState } from 'react';
import { ContentBlock, getContentBlocks } from './api';

export function useContentBlocks() {
  const [blocks, setBlocks] = useState<Record<string, ContentBlock>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const list = await getContentBlocks();
        if (isMounted && Array.isArray(list)) {
          const map: Record<string, ContentBlock> = {};
          list.forEach((block) => {
            if (block.is_published) {
              map[block.key] = block;
            }
          });
          setBlocks(map);
        }
      } catch (err) {
        // Graceful fallback to default values in components
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const getBlockValue = <T = any>(key: string, defaultValue: T): T => {
    if (blocks[key] && blocks[key].value !== undefined) {
      return blocks[key].value as T;
    }
    return defaultValue;
  };

  return { blocks, loading, getBlockValue };
}
