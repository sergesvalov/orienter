import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const router = Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Define strict validation schema using Zod
const registrationSchema = z.object({
  eventId: z.string().uuid("Invalid Event ID format (must be UUID)"),
  userId: z.string().uuid("Invalid User ID format (must be UUID)"),
  category: z.string().min(2, "Category must be at least 2 characters (e.g. M21E)")
});

router.post('/', async (req, res) => {
  try {
    // 1. Input Validation (Will throw ZodError if payload is malicious/invalid)
    const validatedData = registrationSchema.parse(req.body);

    // 2. Database Insert
    const { data, error } = await supabase
      .from('registrations')
      .insert([{ 
        event_id: validatedData.eventId, 
        user_id: validatedData.userId, 
        category: validatedData.category,
        status: 'pending' 
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

export default router;
