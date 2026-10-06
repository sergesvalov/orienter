import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

router.post('/', async (req, res) => {
  const { eventId, userId, category } = req.body;
  try {
    if (!eventId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert([{ event_id: eventId, user_id: userId, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
