import { Bundle, Client } from 'node-osc'

/* emit_osc()
 *  emits an osc value to specified ip:port
 *
 * value (array): osc bundle containing route and arguments
 * ip (string): ip to send bundle to
 * port (number): port to send bundle to
*/
export async function emit_osc(value: any, ip: string = '127.0.0.1', port: number = 9000) {
  const bundle = new Bundle(value)
  const client = new Client(ip, port)
  await client.send(bundle)
  await client.close()
  console.log(`${value[0]} -> ${value[1]}`)
}

export function empty_queue(queue: any, hide_ui: boolean = true, sfx: boolean = true, seconds: number = 8) {
  emit_osc(['/chatbox/input', queue.length > 1 ? `${queue[0]} ...` : queue[0], hide_ui, sfx])
  queue.shift()
  if (queue.length) {
    setTimeout(emit_osc, 400, ['/chatbox/typing', true])
    setTimeout(empty_queue, seconds * 1000, queue, hide_ui, sfx, seconds)
  }
}
