import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  user_id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  telegram_id?: string;
  telegram_username?: string;
  referral_code: string;
  referred_by?: string;
  total_earned: number;
  network_level: number;
  energy_points: number;
  active_referrals: number;
  total_referrals: number;
  last_active: string;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create profile if doesn't exist
        await createProfile(user.id);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить профиль",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          username: `user_${Date.now()}`,
          full_name: 'Космический Пионер',
        })
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      
      toast({
        title: "Успешно",
        description: "Профиль обновлен",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive",
      });
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
}