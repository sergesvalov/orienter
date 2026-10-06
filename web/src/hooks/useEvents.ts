import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEvents, createEvent } from '../api/events';
import type { Database } from '../types/supabase';

type EventInsert = Database['public']['Tables']['events']['Insert'];

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newEvent: EventInsert) => createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
