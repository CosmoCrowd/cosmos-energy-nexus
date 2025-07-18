import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NetworkLevel {
  id: string;
  level_number: number;
  level_name: string;
  price_ton: number;
  daily_income: number;
  referral_bonus: number;
  max_spots: number;
  description?: string;
  created_at: string;
}

export function useNetworkLevels() {
  const [levels, setLevels] = useState<NetworkLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('network_levels')
        .select('*')
        .order('level_number', { ascending: true });

      if (error) throw error;
      setLevels(data || []);
    } catch (error) {
      console.error('Error fetching network levels:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    levels,
    loading,
    refetch: fetchLevels,
  };
}