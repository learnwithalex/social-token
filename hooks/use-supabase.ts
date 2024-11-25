"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

export function useSupabaseQuery<T extends TableName>(
  table: T,
  options?: {
    select?: string;
    filter?: { column: string; value: any };
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(table).select(options?.select || '*');

        if (options?.filter) {
          query = query.eq(options.filter.column, options.filter.value);
        }

        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? false,
          });
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (error) throw error;
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, options?.select, options?.filter?.column, options?.filter?.value, 
      options?.orderBy?.column, options?.orderBy?.ascending, options?.limit]);

  return { data, loading, error };
}

export function useSupabaseMutation<T extends TableName>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const insert = async (table: T, data: Tables[T]['Insert']) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (table: T, id: string, data: Tables[T]['Update']) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (table: T, id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    insert,
    update,
    remove,
    loading,
    error,
  };
}