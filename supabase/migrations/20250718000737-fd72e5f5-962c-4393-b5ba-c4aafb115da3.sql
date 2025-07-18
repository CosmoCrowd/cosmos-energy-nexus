-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  telegram_id TEXT UNIQUE,
  telegram_username TEXT,
  referral_code TEXT UNIQUE NOT NULL DEFAULT concat('REF', substr(gen_random_uuid()::text, 1, 8)),
  referred_by UUID REFERENCES public.profiles(id),
  total_earned DECIMAL(20, 2) DEFAULT 0,
  network_level INTEGER DEFAULT 1,
  energy_points DECIMAL(20, 2) DEFAULT 0,
  active_referrals INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create network levels table
CREATE TABLE public.network_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level_number INTEGER NOT NULL UNIQUE,
  level_name TEXT NOT NULL,
  price_ton DECIMAL(10, 4) NOT NULL,
  daily_income DECIMAL(10, 4) NOT NULL,
  referral_bonus DECIMAL(5, 2) NOT NULL,
  max_spots INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user purchases table
CREATE TABLE public.user_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  level_id UUID NOT NULL REFERENCES public.network_levels(id),
  purchase_amount DECIMAL(10, 4) NOT NULL,
  transaction_hash TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create earnings table
CREATE TABLE public.earnings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(20, 8) NOT NULL,
  earning_type TEXT NOT NULL CHECK (earning_type IN ('daily_income', 'referral_bonus', 'level_bonus')),
  source_user_id UUID REFERENCES public.profiles(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  reward_amount DECIMAL(10, 4) NOT NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('telegram', 'social', 'referral', 'daily')),
  task_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user task completions table
CREATE TABLE public.user_task_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, task_id)
);

-- Insert initial network levels
INSERT INTO public.network_levels (level_number, level_name, price_ton, daily_income, referral_bonus, max_spots, description) VALUES
(1, 'Новичок', 0.1, 0.012, 0.05, 3, 'Начальный уровень в космической сети'),
(2, 'Исследователь', 0.25, 0.035, 0.08, 3, 'Продвинутый уровень для активных участников'),
(3, 'Пионер', 0.5, 0.075, 0.12, 3, 'Экспертный уровень с увеличенными наградами'),
(4, 'Космонавт', 1.0, 0.15, 0.18, 3, 'Профессиональный уровень космической сети'),
(5, 'Капитан', 2.0, 0.32, 0.25, 3, 'Лидерский уровень с максимальными бонусами'),
(6, 'Адмирал', 4.0, 0.68, 0.35, 3, 'Элитный уровень для топовых участников'),
(7, 'Легенда', 8.0, 1.4, 0.5, 3, 'Легендарный уровень космических пионеров');

-- Insert sample tasks
INSERT INTO public.tasks (title, description, reward_amount, task_type, task_url, sort_order) VALUES
('Подписаться на канал Telegram', 'Подпишитесь на наш официальный канал', 0.01, 'telegram', 'https://t.me/cosmosphere_official', 1),
('Пригласить 3 друзей', 'Пригласите 3 активных участников', 0.05, 'referral', null, 2),
('Ежедневный бонус', 'Заходите каждый день и получайте бонус', 0.005, 'daily', null, 3),
('Поделиться в Twitter', 'Поделитесь постом о CoSMO SPHERE', 0.02, 'social', 'https://twitter.com/intent/tweet?text=Присоединяйтесь%20к%20CoSMO%20SPHERE', 4);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_task_completions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for network levels (public read)
CREATE POLICY "Network levels are publicly readable" ON public.network_levels
  FOR SELECT USING (true);

-- Create RLS policies for user purchases
CREATE POLICY "Users can view their own purchases" ON public.user_purchases
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_purchases.user_id));

CREATE POLICY "Users can create their own purchases" ON public.user_purchases
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_purchases.user_id));

-- Create RLS policies for earnings
CREATE POLICY "Users can view their own earnings" ON public.earnings
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = earnings.user_id));

-- Create RLS policies for tasks (public read)
CREATE POLICY "Tasks are publicly readable" ON public.tasks
  FOR SELECT USING (is_active = true);

-- Create RLS policies for user task completions
CREATE POLICY "Users can view their own task completions" ON public.user_task_completions
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_task_completions.user_id));

CREATE POLICY "Users can create their own task completions" ON public.user_task_completions
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = user_task_completions.user_id));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name, telegram_id, telegram_username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'telegram_id',
    NEW.raw_user_meta_data->>'telegram_username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();