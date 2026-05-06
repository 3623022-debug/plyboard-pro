const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { name, phone, email, message, calc } = body ?? {};

    if (!name || typeof name !== 'string' || name.length > 100) {
      return new Response(JSON.stringify({ error: 'Некорректное имя' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!phone || typeof phone !== 'string' || phone.length > 30) {
      return new Response(JSON.stringify({ error: 'Некорректный телефон' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (message && (typeof message !== 'string' || message.length > 2000)) {
      return new Response(JSON.stringify({ error: 'Сообщение слишком длинное' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
      return new Response(JSON.stringify({ error: 'Telegram не настроен' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const esc = (s: string) => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));

    let text = `🪵 <b>Новая заявка с сайта rusply.ru</b>\n\n`;
    text += `👤 <b>Имя:</b> ${esc(name)}\n`;
    text += `📞 <b>Телефон:</b> ${esc(phone)}\n`;
    if (email) text += `✉️ <b>Email:</b> ${esc(email)}\n`;
    if (message) text += `💬 <b>Сообщение:</b>\n${esc(message)}\n`;
    if (calc) text += `\n📐 <b>Расчёт:</b>\n${esc(calc)}\n`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error('Telegram error:', err);
      return new Response(JSON.stringify({ error: 'Ошибка отправки' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
