import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description?: string;
  reward_amount: number;
  task_type: 'telegram' | 'social' | 'referral' | 'daily';
  task_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  completed?: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTasks((data as Task[]) || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_task_completions')
        .select('task_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setCompletedTasks(data?.map(item => item.task_id) || []);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      // Mark task as completed
      const { error: completionError } = await supabase
        .from('user_task_completions')
        .insert({
          user_id: profile.id,
          task_id: taskId,
        });

      if (completionError) throw completionError;

      // Add to completed tasks
      setCompletedTasks(prev => [...prev, taskId]);

      // Find task reward
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        // Add earning record
        await supabase
          .from('earnings')
          .insert({
            user_id: profile.id,
            amount: task.reward_amount,
            earning_type: 'daily_income',
            description: `Завершение задания: ${task.title}`,
          });

        // Update profile total earned
        const { data: currentProfile } = await supabase
          .from('profiles')
          .select('total_earned')
          .eq('id', profile.id)
          .single();

        if (currentProfile) {
          await supabase
            .from('profiles')
            .update({
              total_earned: Number(currentProfile.total_earned) + Number(task.reward_amount),
            })
            .eq('id', profile.id);
        }

        toast({
          title: "Задание выполнено!",
          description: `Получено +${task.reward_amount} TON`,
        });
      }
    } catch (error) {
      console.error('Error completing task:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить задание",
        variant: "destructive",
      });
    }
  };

  const tasksWithCompletion = tasks.map(task => ({
    ...task,
    completed: completedTasks.includes(task.id),
  }));

  return {
    tasks: tasksWithCompletion,
    loading,
    completeTask,
    refetch: () => {
      fetchTasks();
      fetchCompletedTasks();
    },
  };
}