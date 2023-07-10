import { supabase } from '../../utils/supabase'

export const config = {
  runtime: 'edge',
}

export default async function fetchNoteEdge() {
  const { error, data } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error)
    return new Response(JSON.stringify(`${error.message} : ${error.details}`), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
